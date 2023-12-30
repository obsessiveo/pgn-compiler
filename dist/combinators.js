"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeroOrMore = exports.oneOrMore = exports.ignore = exports.lookahead = exports.oneOf = exports.optional = exports.sequence = void 0;
function sequence(parsers) {
    const f = (input) => {
        let currentInput = input;
        const values = [];
        for (const parser of parsers) {
            const result = parser(currentInput);
            if (!result.success) {
                return { success: false, rest: input };
            }
            if (result.value) {
                values.push(result.value);
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
exports.sequence = sequence;
function optional(parser) {
    return (input) => {
        const result = parser(input);
        if (result.success) {
            return result;
        }
        else {
            return { success: true, value: null, rest: input };
        }
    };
}
exports.optional = optional;
function oneOf(parsers) {
    const f = (input) => {
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
exports.oneOf = oneOf;
function lookahead(parser) {
    return (input) => {
        const result = parser(input);
        if (result.success) {
            return { success: true, value: result.value, rest: input };
        }
        else {
            return { success: false, rest: input };
        }
    };
}
exports.lookahead = lookahead;
function ignore(parser) {
    return (input) => {
        const result = parser(input);
        if (result.success) {
            // Ignore the value and return null instead, but consume the input
            return { success: true, value: null, rest: result.rest };
        }
        else {
            return { success: false, rest: input };
        }
    };
}
exports.ignore = ignore;
function oneOrMore(parser) {
    const f = (input) => {
        let currentInput = input;
        const values = [];
        while (true) {
            const result = parser(currentInput);
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
            };
        }
        else {
            return { success: false, rest: input };
        }
    };
    return f;
}
exports.oneOrMore = oneOrMore;
function zeroOrMore(parser) {
    const f = (input) => {
        let currentInput = input;
        const values = [];
        while (true) {
            const result = parser(currentInput);
            if (!result.success) {
                break;
            }
            if (result.value) {
                values.push(result.value);
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
exports.zeroOrMore = zeroOrMore;
