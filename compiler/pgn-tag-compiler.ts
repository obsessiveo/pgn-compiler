// parsing and compiling pgn files

import { ignore, oneOrMore, optional, sequence } from './combinators';
import { characterParser, stringParser, tagNameParser, whitespaceParser } from './parsers';

// there are no white space characters between the left bracket and the tag name
const openTag = characterParser('[');

/**
 * The same tag name should not appear more than once in a tag pair section.
 * A further restriction on tag names is that they are composed exclusively of
 * letters, digits, and the underscore character.
 * Starts with a capital letter.
 */
const tagName = tagNameParser();

// tag values are enclosed in double quotes
// no translation of the tag value is made here
const tagValue = stringParser();

// right bracket
// there are no white space characters between the tag value and the right bracket
const closeTag = characterParser(']');

const tagParser = sequence([
  ignore(openTag),
  tagName,
  ignore(whitespaceParser()),
  tagValue,
  ignore(closeTag),
  // removing any white space between the tag pairs
  ignore(optional(whitespaceParser())),
]);

// this should compile a list of tag pairs
// to be then converted to the type TagPairs
export const tagPairParser = oneOrMore(tagParser);
