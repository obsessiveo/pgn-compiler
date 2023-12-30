import { Parser, ParserResult } from '../types-consts/types';

export function sequence<T>(parsers: Parser<T>[]): Parser<T[]> {
  const f = (input: string): ParserResult<T[]> => {
    let currentInput = input;
    const values: T[] = [];
    for (const parser of parsers) {
      const result = parser(currentInput);
      if (!result.success) {
        return { success: false, rest: input };
      }
      if (result.value) {
        values.push(result.value as T);
      }

      currentInput = result.rest;
    }

    return {
      success: true,
      value: values,
      rest: currentInput,
    };
  };

  return f;
}

export function optional<T>(parser: Parser<T>): Parser<T | null> {
  return (input: string): ParserResult<T | null> => {
    const result = parser(input);
    if (result.success) {
      return result;
    } else {
      return { success: true, value: null, rest: input };
    }
  };
}

export function oneOf<T>(parsers: Parser<T>[]): Parser<T> {
  const f = (input: string): ParserResult<T> => {
    for (const parser of parsers) {
      const result = parser(input);
      if (result.success) {
        return result;
      }
    }

    return { success: false, rest: input };
  };

  return f;
}

export function lookahead<T>(parser: Parser<T>): Parser<T> {
  return (input: string): ParserResult<T> => {
    const result = parser(input);
    if (result.success) {
      return { success: true, value: result.value, rest: input };
    } else {
      return { success: false, rest: input };
    }
  };
}

export function ignore<T>(parser: Parser<T>): Parser<null> {
  return (input: string): ParserResult<null> => {
    const result = parser(input);
    if (result.success) {
      // Ignore the value and return null instead, but consume the input
      return { success: true, value: null, rest: result.rest };
    } else {
      return { success: false, rest: input };
    }
  };
}

export function oneOrMore<T>(parser: Parser<T>): Parser<T[]> {
  const f = (input: string): ParserResult<T[]> => {
    let currentInput = input;
    const values: T[] = [];
    while (true) {
      const result = parser(currentInput);
      if (!result.success) {
        break;
      }
      if (result.value) {
        values.push(result.value as T);
      }
      currentInput = result.rest;
    }

    if (values.length > 0) {
      return {
        success: true,
        value: values,
        rest: currentInput,
      };
    } else {
      return { success: false, rest: input };
    }
  };

  return f;
}

export function zeroOrMore<T>(parser: Parser<T>): Parser<T[]> {
  const f = (input: string): ParserResult<T[]> => {
    let currentInput = input;
    const values: T[] = [];
    while (true) {
      const result = parser(currentInput);
      if (!result.success) {
        break;
      }

      if (result.value) {
        values.push(result.value as T);
      }

      currentInput = result.rest;
    }

    return {
      success: true,
      value: values,
      rest: currentInput,
    };
  };

  return f;
}
