import { debug } from '../debug';
import { TagNames } from '../types-consts/consts';
import { Parser, ParserResult } from '../types-consts/types';

export function characterParser(c: string): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    let retVal: ParserResult<string>;
    if (input.startsWith(c)) {
      retVal = {
        success: true,
        value: c,
        rest: input.slice(c.length),
        position: position + c.length,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: `Expected ${c}`,
      };
    }
    debug('characterParser', retVal);
    return retVal;
  };
  return f;
}

/**
 * @description whitespaceParser matches zero or more whitespace characters
 * @description white space is defined as a space, a tab, or a newline
 * @returns zero or more whitespace characters
 */
export function whitespaceParser(): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    const whiteSpace = /^[ \n\t]*/;
    const match = whiteSpace.exec(input);
    let retVal: ParserResult<string>;
    if (match) {
      retVal = {
        success: true,
        value: match[0],
        rest: input.slice(match[0].length),
        position: position + match[0].length,
      };
    } else {
      // should never happen
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: 'Expected whitespace',
      };
    }
    debug('whitespaceParser', retVal);
    return retVal;
  };

  return f;
}

/**
 * Matches a regular expression. If a substring of the input matches the regular expression,
 * the substring is used as the value of the parser.
 * Example: regexParser(/(a|b)+x/) only (a|b)+ will be used to move forward the cursor
 * @param regex - the regular expression to match
 * @returns
 */
export function regexParser(regex: RegExp): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    const match = regex.exec(input);
    let retVal: ParserResult<string>;
    if (match) {
      const value = match.length > 1 ? match[1] : match[0];
      const length = value.length;
      retVal = {
        success: true,
        value: value,
        rest: input.slice(length),
        position: position + length,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: `Expected regex: ${regex}`,
      };
    }
    debug('regexParser', retVal);
    return retVal;
  };

  return f;
}

export function stringParser(): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    const regex = /^"(.*)"/;
    const match = regex.exec(input);
    let retVal: ParserResult<string>;
    if (match) {
      retVal = {
        success: true,
        value: match[1],
        rest: input.slice(match[0].length),
        position: position + match[0].length,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: 'Expected a string',
      };
    }
    debug('stringParser', retVal);
    return retVal;
  };

  return f;
}

export function endofLineParser(): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    const regex = /^(\r\n|\n)/;
    const match = regex.exec(input);
    let retVal: ParserResult<string>;
    if (match) {
      retVal = {
        success: true,
        value: match[0],
        rest: input.slice(match[0].length),
        position: position + match[0].length,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: 'Expected end of line',
      };
    }
    debug('endofLineParser', retVal);
    return retVal;
  };

  return f;
}

export function tagNameParser(): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    // tag names are composed exclusively of letters, digits, and the underscore character
    // starts with a capital letter
    const regex = /^[A-Z][a-zA-Z0-9_]+/;
    const match = regex.exec(input);
    let retVal: ParserResult<string>;
    if (match) {
      const tagName = match[0];
      const tagNameValid = TagNames.some((tag) => tag.name === tagName);
      if (tagNameValid) {
        retVal = {
          success: true,
          value: match[0],
          rest: input.slice(match[0].length),
        };
      } else {
        retVal = {
          success: false,
          rest: input,
          position: position,
          error: `Uknown tag name: ${tagName}`,
        };
      }
    } else {
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: `Invalid tag name. Did not match regex: ${regex}`,
      };
    }
    debug('tagNameParser', retVal);
    return retVal;
  };

  return f;
}
