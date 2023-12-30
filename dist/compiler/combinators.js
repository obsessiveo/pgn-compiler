"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCombinator = exports.zeroOrMore = exports.oneOrMore = exports.ignore = exports.lookahead = exports.oneOf = exports.optional = exports.sequence = void 0;
function sequence(parsers) {
    const f = (input, position = 0) => {
        let currentInput = input;
        let currentPosition = position;
        const values = [];
        for (const parser of parsers) {
            const result = parser(currentInput, currentPosition);
            if (!result.success) {
                return {
                    success: false,
                    rest: input,
                    position: currentPosition,
                    error: result.error,
                };
            }
            if (result.value) {
                values.push(result.value);
            }
            currentInput = result.rest;
            currentPosition = result.position || currentPosition;
        }
        return {
            success: true,
            value: values,
            rest: currentInput,
            position: currentPosition,
        };
    };
    return f;
}
exports.sequence = sequence;
function optional(parser) {
    return (input, position = 0) => {
        const result = parser(input, position);
        if (result.success) {
            return result;
        }
        else {
            return {
                success: true,
                value: null,
                rest: input,
                position: position,
            };
        }
    };
}
exports.optional = optional;
function oneOf(parsers) {
    const f = (input, position = 0) => {
        for (const parser of parsers) {
            const result = parser(input, position);
            if (result.success) {
                return result;
            }
        }
        return {
            success: false,
            rest: input,
            position: position,
            error: 'Expected one of the parsers to succeed',
        };
    };
    return f;
}
exports.oneOf = oneOf;
function lookahead(parser) {
    return (input, position = 0) => {
        const result = parser(input, position);
        if (result.success) {
            return {
                success: true,
                value: result.value,
                rest: input,
                position: result.position,
            };
        }
        else {
            return {
                success: false,
                rest: input,
                position: position,
                error: 'Lookahead failed',
            };
        }
    };
}
exports.lookahead = lookahead;
function ignore(parser) {
    return (input, position = 0) => {
        const result = parser(input, position);
        if (result.success) {
            // Ignore the value and return null instead, but consume the input
            return {
                success: true,
                value: null,
                rest: result.rest,
                position: result.position,
            };
        }
        else {
            return {
                success: false,
                rest: input,
                error: result.error,
                position: position,
            };
        }
    };
}
exports.ignore = ignore;
function oneOrMore(parser) {
    const f = (input, position = 0) => {
        let currentInput = input;
        let currentPosition = position;
        let currentError = '';
        const values = [];
        while (true) {
            const result = parser(currentInput, currentPosition);
            currentPosition = result.position || currentPosition;
            currentError = result.error || currentError;
            if (!result.success) {
                break;
            }
            if (result.value) {
                values.push(result.value);
            }
            currentInput = result.rest;
        }
        if (values.length > 0) {
            return {
                success: true,
                value: values,
                rest: currentInput,
                position: currentPosition,
            };
        }
        else {
            return {
                success: false,
                rest: input,
                position: position,
                error: currentError,
            };
        }
    };
    return f;
}
exports.oneOrMore = oneOrMore;
function zeroOrMore(parser) {
    const f = (input, position = 0) => {
        let currentInput = input;
        let currentPosition = position;
        const values = [];
        while (true) {
            const result = parser(currentInput, currentPosition);
            if (!result.success) {
                break;
            }
            if (result.value) {
                values.push(result.value);
            }
            currentPosition = result.position || currentPosition;
            currentInput = result.rest;
        }
        return {
            success: true,
            value: values,
            rest: currentInput,
            position: currentPosition,
        };
    };
    return f;
}
exports.zeroOrMore = zeroOrMore;
/**
 * @description Applies the transform function to the value of the original parser
 * @param parser - The parser to be mapped
 * @param transform - The transform function
 * @returns A new parser that applies the transform function to the value of the original parser
 */
function mapCombinator(parser, transform) {
    return (input, position = 0) => {
        const result = parser(input, position);
        if (result.success) {
            return {
                success: true,
                value: transform(result.value),
                rest: result.rest,
                position: result.position,
            };
        }
        else {
            return {
                success: false,
                rest: input,
                error: result.error,
                position: position,
            };
        }
    };
}
exports.mapCombinator = mapCombinator;
