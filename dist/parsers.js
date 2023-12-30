"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endofLineParser = exports.stringParser = exports.regexParser = exports.whitespaceParser = exports.characterParser = void 0;
function characterParser(c) {
    const f = (input) => {
        return input.startsWith(c)
            ? { success: true, value: c, rest: input.slice(c.length) }
            : { success: false, rest: input };
    };
    return f;
}
exports.characterParser = characterParser;
function whitespaceParser() {
    const f = (input) => {
        const whiteSpace = /^\s+/;
        const match = whiteSpace.exec(input);
        if (match) {
            return {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
            };
        }
        else {
            return { success: false, rest: input };
        }
    };
    return f;
}
exports.whitespaceParser = whitespaceParser;
function regexParser(regex) {
    const f = (input) => {
        const match = regex.exec(input);
        if (match) {
            return {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
            };
        }
        else {
            return { success: false, rest: input };
        }
    };
    return f;
}
exports.regexParser = regexParser;
function stringParser() {
    const f = (input) => {
        const regex = /^"(.*)"/;
        const match = regex.exec(input);
        if (match) {
            return {
                success: true,
                value: match[1],
                rest: input.slice(match[0].length),
            };
        }
        else {
            return { success: false, rest: input };
        }
    };
    return f;
}
exports.stringParser = stringParser;
function endofLineParser() {
    const f = (input) => {
        const regex = /^(\r\n|\n)/;
        const match = regex.exec(input);
        if (match) {
            return {
                success: true,
                value: match[0],
                rest: input.slice(match[0].length),
            };
        }
        else {
            return { success: false, rest: input };
        }
    };
    return f;
}
exports.endofLineParser = endofLineParser;
