"use strict";
// PGN moves compiler
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveParser = exports.castlingParser = exports.pieceMoveParser = exports.pieceParser = exports.kqbnrParser = void 0;
const combinators_1 = require("./combinators");
const parsers_1 = require("./parsers");
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
const pawnParser = (0, combinators_1.mapCombinator)((0, combinators_1.lookahead)((0, parsers_1.regexParser)(/^[a-h]/)), () => 'P');
exports.kqbnrParser = (0, parsers_1.regexParser)(/^[KQBNR]/);
// this will give us one of letters KQBNRP
exports.pieceParser = (0, combinators_1.oneOf)([exports.kqbnrParser, pawnParser]);
// move parsers
const disambiguationParser = (0, parsers_1.regexParser)(/^([a-h]|[1-8])x?[a-h][1-8]/);
const captureParser = (0, parsers_1.regexParser)(/^x/);
const destinationParser = (0, parsers_1.regexParser)(/^[a-h][1-8]/);
const promotionParser = (0, parsers_1.regexParser)(/^=[QBNR]/);
const checkParser = (0, parsers_1.regexParser)(/^[+#]/);
exports.pieceMoveParser = (0, combinators_1.sequence)([
    exports.pieceParser,
    (0, combinators_1.optional)(disambiguationParser),
    (0, combinators_1.optional)(captureParser),
    destinationParser,
    (0, combinators_1.optional)(promotionParser),
    (0, combinators_1.optional)(checkParser),
]);
// castling moves
exports.castlingParser = (0, combinators_1.sequence)([(0, parsers_1.regexParser)(/^0-0-0|0-0/), (0, combinators_1.optional)(checkParser)]);
exports.moveParser = (0, combinators_1.oneOf)([exports.pieceMoveParser, exports.castlingParser]);
//# sourceMappingURL=pgn-moves.compiler.js.map