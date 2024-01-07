// PGN moves compiler

import { lookahead, mapCombinator, oneOf, optional, sequence } from './combinators';
import { regexParser } from './parsers';

// \b([KQBNR]?[a-h]?[1-8]?x?[a-h][1-8](=[QBNR])?|O-O-O|O-O)[+#]?\b
// \b: Word boundary to ensure we're matching complete moves.
// [KQBNR]?: Optional piece indicator (King, Queen, Bishop, Knight, Rook).
// [a-h]?[1-8]?: Optional file and rank for disambiguation.
// x?: Optional capture indicator.
// [a-h][1-8]: Destination square (file and rank).
// (=[QBNR])?: Optional pawn promotion indicator.
// |O-O-O|O-O: Castling moves (kingside or queenside).
// [+#]?: Optional check ('+') or checkmate ('#') indicator.
// \b: Word boundary.

const pawnParser = mapCombinator(lookahead(regexParser(/^[a-h]/)), () => 'P');
export const kqbnrParser = regexParser(/^[KQBNR]/);

// this will give us one of letters KQBNRP
export const pieceParser = oneOf([kqbnrParser, pawnParser]);

// move parsers
const disambiguationParser = regexParser(/^([a-h]|[1-8])x?[a-h][1-8]/);
const captureParser = regexParser(/^x/);
const destinationParser = regexParser(/^[a-h][1-8]/);
const promotionParser = regexParser(/^=[QBNR]/);
const checkParser = regexParser(/^[+#]/);

export const pieceMoveParser = sequence([
  pieceParser,
  optional(disambiguationParser),
  optional(captureParser),
  destinationParser,
  optional(promotionParser),
  optional(checkParser),
]);

// castling moves
export const castlingParser = sequence([regexParser(/^0-0-0|0-0/), optional(checkParser)]);

export const moveParser = oneOf([pieceMoveParser, castlingParser]);
