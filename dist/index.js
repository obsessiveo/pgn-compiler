"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const combinators_1 = require("./combinators");
const parsers_1 = require("./parsers");
// tag pairs
const openTag = (0, parsers_1.characterParser)('[');
const tagName = (0, parsers_1.regexParser)(/^[a-zA-Z]+/);
const tagValue = (0, parsers_1.stringParser)();
const closeTag = (0, parsers_1.characterParser)(']');
const tag = (0, combinators_1.sequence)([
    (0, combinators_1.ignore)(openTag),
    tagName,
    (0, combinators_1.optional)((0, parsers_1.whitespaceParser)()),
    tagValue,
    (0, combinators_1.ignore)(closeTag),
    (0, parsers_1.endofLineParser)(),
]);
const pgn = `[Event "F/S Return Match"]
[Site "Belgrade, Serbia JUG"]
[Date "1992.11.04"]
[Round "29"]
[White "Fischer, Robert J."]
[Black "Spassky, Boris V."]
[Result "1/2-1/2"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 {This opening is called the Ruy Lopez.} 3... a6
4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7
11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5
Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6
23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5
hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5
35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6
Nf2 42. g4 Bd3 43. Re6 1/2-1/2
`;
function removeEmptyRows(inputString) {
    // Split the string into an array of lines
    const lines = inputString.split('\n');
    // Filter out empty lines
    const filteredLines = lines.filter((line) => line.trim() !== '');
    // Join the array back into a string
    return filteredLines.join('\n') + '\n';
}
function removeEndOfRows(inputString) {
    // Split the string into an array of lines
    const lines = inputString.split('\n');
    // Join the array back into a string
    return lines.join(' ') + '\n';
}
const newPgn = removeEmptyRows(pgn);
const oneOrMoreTags = (0, combinators_1.oneOrMore)(tag)(newPgn);
console.log(oneOrMoreTags);
// process tags
// process moves
// const moves = removeEndOfRows(oneOrMoreTags.rest);
// console.log(moves);