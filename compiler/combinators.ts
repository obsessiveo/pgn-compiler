import { debug } from '../debug';
import { Parser, ParserResult } from '../types-consts/types';

export function sequence<T>(parsers: Parser<T>[]): Parser<T[]> {
  const f = (input: string, position = 0): ParserResult<T[]> => {
    let currentInput = input;
    let currentPosition = position;
    let retVal: ParserResult<T[]>;
    const values: T[] = [];
    for (const parser of parsers) {
      const result = parser(currentInput, currentPosition);
      if (!result.success) {
        retVal = {
          success: false,
          rest: input,
          position: currentPosition,
          error: result.error,
        };
        debug('sequence', retVal);
        return retVal;
      }
      if (result.value) {
        values.push(result.value as T);
      }

      currentInput = result.rest;
      currentPosition = result.position || currentPosition;
    }

    retVal = {
      success: true,
      value: values,
      rest: currentInput,
      position: currentPosition,
    };
    debug('sequence', retVal);
    return retVal;
  };

  return f;
}

export function optional<T>(parser: Parser<T>): Parser<T | null> {
  return (input: string, position = 0): ParserResult<T | null> => {
    const result = parser(input, position);
    let retVal: ParserResult<T | null>;
    if (result.success) {
      retVal = {
        success: true,
        value: result.value,
        rest: result.rest,
        position: result.position,
      };
    } else {
      retVal = {
        success: true,
        value: null,
        rest: input,
        position: position,
      };
    }
    debug('optional', retVal);
    return retVal;
  };
}

export function oneOf<T>(parsers: Parser<T>[]): Parser<T> {
  const f = (input: string, position = 0): ParserResult<T> => {
    let retVal: ParserResult<T>;
    for (const parser of parsers) {
      const result = parser(input, position);
      if (result.success) {
        retVal = {
          success: true,
          value: result.value,
          rest: result.rest,
          position: result.position,
        };
        debug('oneOf', retVal);
        return retVal;
      }
    }

    retVal = {
      success: false,
      rest: input,
      position: position,
      error: 'Expected one of the parsers to succeed',
    };
    debug('oneOf', retVal);
    return retVal;
  };

  return f;
}

export function lookahead<T>(parser: Parser<T>): Parser<T> {
  return (input: string, position = 0): ParserResult<T> => {
    const result = parser(input, position);
    let retVal: ParserResult<T>;
    if (result.success) {
      retVal = {
        success: true,
        value: result.value,
        rest: input,
        position: result.position,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: 'Lookahead failed',
      };
    }
    debug('lookahead', retVal);
    return retVal;
  };
}

export function ignore<T>(parser: Parser<T>): Parser<null> {
  return (input: string, position = 0): ParserResult<null> => {
    const result = parser(input, position);
    let retVal: ParserResult<null>;
    if (result.success) {
      // Ignore the value and return null instead, but consume the input
      retVal = {
        success: true,
        value: null,
        rest: result.rest,
        position: result.position,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        error: result.error,
        position: position,
      };
    }
    debug('ignore', retVal);
    return retVal;
  };
}

export function oneOrMore<T>(parser: Parser<T>): Parser<T[]> {
  const f = (input: string, position = 0): ParserResult<T[]> => {
    let currentInput = input;
    let currentPosition = position;
    let currentError = '';
    const values: T[] = [];
    let retVal: ParserResult<T[]>;
    while (true) {
      const result = parser(currentInput, currentPosition);
      currentPosition = result.position || currentPosition;
      currentError = result.error || currentError;
      if (!result.success) {
        break;
      }
      if (result.value) {
        values.push(result.value as T);
      }
      currentInput = result.rest;
    }

    if (values.length > 0) {
      retVal = {
        success: true,
        value: values,
        rest: currentInput,
        position: currentPosition,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        position: position,
        error: currentError,
      };
    }
    debug('oneOrMore', retVal);
    return retVal;
  };

  return f;
}

export function zeroOrMore<T>(parser: Parser<T>): Parser<T[]> {
  const f = (input: string, position = 0): ParserResult<T[]> => {
    let currentInput = input;
    let currentPosition = position;
    const values: T[] = [];
    let retVal: ParserResult<T[]>;
    while (true) {
      const result = parser(currentInput, currentPosition);
      if (!result.success) {
        break;
      }

      if (result.value) {
        values.push(result.value as T);
      }
      currentPosition = result.position || currentPosition;
      currentInput = result.rest;
    }

    retVal = {
      success: true,
      value: values,
      rest: currentInput,
      position: currentPosition,
    };
    debug('zeroOrMore', retVal);
    return retVal;
  };

  return f;
}

/**
 * @description Applies the transform function to the value of the original parser
 * @param parser - The parser to be mapped
 * @param transform - The transform function
 * @returns A new parser that applies the transform function to the value of the original parser
 */
export function mapCombinator<T, U>(parser: Parser<T>, transform: (value: T) => U): Parser<U> {
  return (input: string, position = 0): ParserResult<U> => {
    const result = parser(input, position);
    let retVal: ParserResult<U>;
    if (result.success) {
      retVal = {
        success: true,
        value: transform(result.value as T),
        rest: result.rest,
        position: result.position,
      };
    } else {
      retVal = {
        success: false,
        rest: input,
        error: result.error,
        position: position,
      };
    }
    debug('mapCombinator', retVal);
    return retVal;
  };
}
