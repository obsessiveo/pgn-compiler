"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagNameParser = exports.endofLineParser = exports.stringParser = exports.regexParser = exports.whitespaceParser = exports.characterParser = void 0;
const consts_1 = require("../types-consts/consts");
function characterParser(c) {
    const f = (input, position = 0) => {
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
exports.characterParser = characterParser;
/**
 * @description whitespaceParser matches zero or more whitespace characters
 * @description white space is defined as a space, a tab, or a newline
 * @returns zero or more whitespace characters
 */
function whitespaceParser() {
    const f = (input, position = 0) => {
        const whiteSpace = /^[ \n\t]*/;
        const match = whiteSpace.exec(input);
        if (match) {
            return {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
                position: position + match[0].length,
            };
        }
        else {
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
exports.whitespaceParser = whitespaceParser;
function regexParser(regex) {
    const f = (input, position = 0) => {
        const match = regex.exec(input);
        if (match) {
            return {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
                position: position + match[0].length,
            };
        }
        else {
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
exports.regexParser = regexParser;
function stringParser() {
    const f = (input, position = 0) => {
        const regex = /^"(.*)"/;
        const match = regex.exec(input);
        if (match) {
            return {
                success: true,
                value: match[1],
                rest: input.slice(match[0].length),
                position: position + match[0].length,
            };
        }
        else {
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
exports.stringParser = stringParser;
function endofLineParser() {
    const f = (input, position = 0) => {
        const regex = /^(\r\n|\n)/;
        const match = regex.exec(input);
        if (match) {
            return {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
                position: position + match[0].length,
            };
        }
        else {
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
exports.endofLineParser = endofLineParser;
function tagNameParser() {
    const f = (input, position = 0) => {
        // tag names are composed exclusively of letters, digits, and the underscore character
        // starts with a capital letter
        const regex = /^[A-Z][a-zA-Z0-9_]+/;
        const match = regex.exec(input);
        if (match) {
            const tagName = match[0];
            const tagNameValid = consts_1.TagNames.some((tag) => tag.name === tagName);
            if (tagNameValid) {
                return {
                    success: true,
                    value: match[0],
                    rest: input.slice(match[0].length),
                };
            }
            else {
                return {
                    success: false,
                    rest: input,
                    position: position,
                    error: `Uknown tag name: ${tagName}`,
                };
            }
        }
        else {
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
exports.tagNameParser = tagNameParser;
