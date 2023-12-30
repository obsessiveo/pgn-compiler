"use strict";
// parsing and compiling pgn files
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagPairParser = void 0;
const combinators_1 = require("./combinators");
const parsers_1 = require("./parsers");
// there are no white space characters between the left bracket and the tag name
const openTag = (0, parsers_1.characterParser)('[');
/**
 * The same tag name should not appear more than once in a tag pair section.
 * A further restriction on tag names is that they are composed exclusively of
 * letters, digits, and the underscore character.
 * Starts with a capital letter.
 */
const tagName = (0, parsers_1.tagNameParser)();
// tag values are enclosed in double quotes
// no translation of the tag value is made here
const tagValue = (0, parsers_1.stringParser)();
// right bracket
// there are no white space characters between the tag value and the right bracket
const closeTag = (0, parsers_1.characterParser)(']');
const tagParser = (0, combinators_1.sequence)([
    (0, combinators_1.ignore)(openTag),
    tagName,
    (0, combinators_1.ignore)((0, parsers_1.whitespaceParser)()),
    tagValue,
    (0, combinators_1.ignore)(closeTag),
    // removing any white space between the tag pairs
    (0, combinators_1.ignore)((0, combinators_1.optional)((0, parsers_1.whitespaceParser)())),
]);
// this should compile a list of tag pairs
// to be then converted to the type TagPairs
exports.tagPairParser = (0, combinators_1.oneOrMore)(tagParser);
