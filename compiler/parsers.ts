import { TagNames } from '../types-consts/consts';
import { Parser, ParserResult } from '../types-consts/types';

export function characterParser(c: string): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    return input.startsWith(c)
      ? {
          success: true,
          value: c,
          rest: input.slice(c.length),
          position: position + c.length,
        }
      : {
          success: false,
          rest: input,
          position: position,
          error: `Expected ${c}`,
        };
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
    if (match) {
      return {
        success: true,
        value: match[0],
        rest: input.slice(match[0].length),
        position: position + match[0].length,
      };
    } else {
      // should never happen
      return {
        success: false,
        rest: input,
        position: position,
        error: 'Expected whitespace',
      };
    }
  };

  return f;
}

export function regexParser(regex: RegExp): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    const match = regex.exec(input);
    if (match) {
      return {
        success: true,
        value: match[0],
        rest: input.slice(match[0].length),
        position: position + match[0].length,
      };
    } else {
      return {
        success: false,
        rest: input,
        position: position,
        error: `Expected regex: ${regex}`,
      };
    }
  };

  return f;
}

export function stringParser(): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    const regex = /^"(.*)"/;
    const match = regex.exec(input);
    if (match) {
      return {
        success: true,
        value: match[1],
        rest: input.slice(match[0].length),
        position: position + match[0].length,
      };
    } else {
      return {
        success: false,
        rest: input,
        position: position,
        error: 'Expected a string',
      };
    }
  };

  return f;
}

export function endofLineParser(): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    const regex = /^(\r\n|\n)/;
    const match = regex.exec(input);
    if (match) {
      return {
        success: true,
        value: match[0],
        rest: input.slice(match[0].length),
        position: position + match[0].length,
      };
    } else {
      return {
        success: false,
        rest: input,
        position: position,
        error: 'Expected end of line',
      };
    }
  };

  return f;
}

export function tagNameParser(): Parser<string> {
  const f = (input: string, position = 0): ParserResult<string> => {
    // tag names are composed exclusively of letters, digits, and the underscore character
    // starts with a capital letter
    const regex = /^[A-Z][a-zA-Z0-9_]+/;
    const match = regex.exec(input);
    if (match) {
      const tagName = match[0];
      const tagNameValid = TagNames.some((tag) => tag.name === tagName);
      if (tagNameValid) {
        return {
          success: true,
          value: match[0],
          rest: input.slice(match[0].length),
        };
      } else {
        return {
          success: false,
          rest: input,
          position: position,
          error: `Uknown tag name: ${tagName}`,
        };
      }
    } else {
      return {
        success: false,
        rest: input,
        position: position,
        error: `Invalid tag name. Did not match regex: ${regex}`,
      };
    }
  };

  return f;
}
