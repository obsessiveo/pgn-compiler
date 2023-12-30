// parsing and compiling pgn files

import { ignore, sequence } from './combinators';
import {
  characterParser,
  regexParser,
  stringParser,
  tagNameParser,
  whitespaceParser,
} from './parsers';
import { TagNames } from '../types-consts/consts';

function checkTagName(tagName: string): boolean {
  return TagNames.some((tag) => tag.name === tagName);
}

// there are no white space characters between the left bracket and the tag name
const openTag = characterParser('[');

/**
 * The same tag name should not appear more than once in a tag pair section.
 * A further restriction on tag names is that they are composed exclusively of
 * letters, digits, and the underscore character.
 * Starts with a capital letter.
 */
const tagName = tagNameParser();

// tag value
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
]);
