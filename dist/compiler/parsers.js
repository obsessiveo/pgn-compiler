"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagNameParser = exports.endofLineParser = exports.stringParser = exports.regexParser = exports.whitespaceParser = exports.characterParser = void 0;
const debug_1 = require("../debug");
const consts_1 = require("../types-consts/consts");
function characterParser(c) {
    const f = (input, position = 0) => {
        let retVal;
        if (input.startsWith(c)) {
            retVal = {
                success: true,
                value: c,
                rest: input.slice(c.length),
                position: position + c.length,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: `Expected ${c}`,
            };
        }
        (0, debug_1.debug)('characterParser', retVal);
        return retVal;
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
        let retVal;
        if (match) {
            retVal = {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
                position: position + match[0].length,
            };
        }
        else {
            // should never happen
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: 'Expected whitespace',
            };
        }
        (0, debug_1.debug)('whitespaceParser', retVal);
        return retVal;
    };
    return f;
}
exports.whitespaceParser = whitespaceParser;
/**
 * Matches a regular expression. If a substring of the input matches the regular expression,
 * the substring is used as the value of the parser.
 * Example: regexParser(/(a|b)+x/) only (a|b)+ will be used to move forward the cursor
 * @param regex - the regular expression to match
 * @returns
 */
function regexParser(regex) {
    const f = (input, position = 0) => {
        const match = regex.exec(input);
        let retVal;
        if (match) {
            const value = match.length > 1 ? match[1] : match[0];
            const length = value.length;
            retVal = {
                success: true,
                value: value,
                rest: input.slice(length),
                position: position + length,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: `Expected regex: ${regex}`,
            };
        }
        (0, debug_1.debug)('regexParser', retVal);
        return retVal;
    };
    return f;
}
exports.regexParser = regexParser;
function stringParser() {
    const f = (input, position = 0) => {
        const regex = /^"(.*)"/;
        const match = regex.exec(input);
        let retVal;
        if (match) {
            retVal = {
                success: true,
                value: match[1],
                rest: input.slice(match[0].length),
                position: position + match[0].length,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: 'Expected a string',
            };
        }
        (0, debug_1.debug)('stringParser', retVal);
        return retVal;
    };
    return f;
}
exports.stringParser = stringParser;
function endofLineParser() {
    const f = (input, position = 0) => {
        const regex = /^(\r\n|\n)/;
        const match = regex.exec(input);
        let retVal;
        if (match) {
            retVal = {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
                position: position + match[0].length,
            };
        }
        else {
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: 'Expected end of line',
            };
        }
        (0, debug_1.debug)('endofLineParser', retVal);
        return retVal;
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
        let retVal;
        if (match) {
            const tagName = match[0];
            const tagNameValid = consts_1.TagNames.some((tag) => tag.name === tagName);
            if (tagNameValid) {
                retVal = {
                    success: true,
                    value: match[0],
                    rest: input.slice(match[0].length),
                };
            }
            else {
                retVal = {
                    success: false,
                    rest: input,
                    position: position,
                    error: `Uknown tag name: ${tagName}`,
                };
            }
        }
        else {
            retVal = {
                success: false,
                rest: input,
                position: position,
                error: `Invalid tag name. Did not match regex: ${regex}`,
            };
        }
        (0, debug_1.debug)('tagNameParser', retVal);
        return retVal;
    };
    return f;
}
exports.tagNameParser = tagNameParser;
//# sourceMappingURL=parsers.js.map