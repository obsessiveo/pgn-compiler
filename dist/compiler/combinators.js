"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCombinator = exports.zeroOrMore = exports.oneOrMore = exports.ignore = exports.lookahead = exports.oneOf = exports.optional = exports.sequence = void 0;
const debug_1 = require("../debug");
function sequence(parsers) {
    const f = (input, position = 0) => {
        let currentInput = input;
        let currentPosition = position;
        let retVal;
        const values = [];
        for (const parser of parsers) {
            const result = parser(currentInput, currentPosition);
            if (!result.success) {
                retVal = {
                    success: false,
                    rest: input,
                    position: currentPosition,
                    error: result.error,
                };
                (0, debug_1.debug)('sequence', retVal);
                return retVal;
            }
            if (result.value) {
                values.push(result.value);
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
        (0, debug_1.debug)('sequence', retVal);
        return retVal;
    };
    return f;
}
exports.sequence = sequence;
function optional(parser) {
    return (input, position = 0) => {
        const result = parser(input, position);
        let retVal;
        if (result.success) {
            retVal = {
                success: true,
                value: result.value,
                rest: result.rest,
                position: result.position,
            };
        }
        else {
            retVal = {
                success: true,
                value: null,
                rest: input,
                position: position,
            };
        }
        (0, debug_1.debug)('optional', retVal);
        return retVal;
    };
}
exports.optional = optional;
function oneOf(parsers) {
    const f = (input, position = 0) => {
        let retVal;
        for (const parser of parsers) {
            const result = parser(input, position);
            if (result.success) {
                retVal = {
                    success: true,
                    value: result.value,
                    rest: result.rest,
                    position: result.position,
                };
                (0, debug_1.debug)('oneOf', retVal);
                return retVal;
            }
        }
        retVal = {
            success: false,
            rest: input,
            position: position,
            error: 'Expected one of the parsers to succeed',
        };
        (0, debug_1.debug)('oneOf', retVal);
        return retVal;
    };
    return f;
}
exports.oneOf = oneOf;
function lookahead(parser) {
    return (input, position = 0) => {
        const result = parser(input, position);
        let retVal;
        if (result.success) {
            retVal = {
                success: true,
                value: result.value,
                rest: input,
                position: result.position,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: 'Lookahead failed',
            };
        }
        (0, debug_1.debug)('lookahead', retVal);
        return retVal;
    };
}
exports.lookahead = lookahead;
function ignore(parser) {
    return (input, position = 0) => {
        const result = parser(input, position);
        let retVal;
        if (result.success) {
            // Ignore the value and return null instead, but consume the input
            retVal = {
                success: true,
                value: null,
                rest: result.rest,
                position: result.position,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                error: result.error,
                position: position,
            };
        }
        (0, debug_1.debug)('ignore', retVal);
        return retVal;
    };
}
exports.ignore = ignore;
function oneOrMore(parser) {
    const f = (input, position = 0) => {
        let currentInput = input;
        let currentPosition = position;
        let currentError = '';
        const values = [];
        let retVal;
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
            retVal = {
                success: true,
                value: values,
                rest: currentInput,
                position: currentPosition,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: currentError,
            };
        }
        (0, debug_1.debug)('oneOrMore', retVal);
        return retVal;
    };
    return f;
}
exports.oneOrMore = oneOrMore;
function zeroOrMore(parser) {
    const f = (input, position = 0) => {
        let currentInput = input;
        let currentPosition = position;
        const values = [];
        let retVal;
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
        retVal = {
            success: true,
            value: values,
            rest: currentInput,
            position: currentPosition,
        };
        (0, debug_1.debug)('zeroOrMore', retVal);
        return retVal;
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
        let retVal;
        if (result.success) {
            retVal = {
                success: true,
                value: transform(result.value),
                rest: result.rest,
                position: result.position,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                error: result.error,
                position: position,
            };
        }
        (0, debug_1.debug)('mapCombinator', retVal);
        return retVal;
    };
}
exports.mapCombinator = mapCombinator;
//# sourceMappingURL=combinators.js.map