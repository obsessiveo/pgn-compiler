export type ParserResult<T> = {
  success: boolean;
  value?: T;
  rest: string;
  error?: string;
  position?: number;
};

export type Parser<T> = (input: string, position?: number) => ParserResult<T>;

export type Tag = {
  name: string;
};

export type TagPairs = {
  // mandatory tags

  // Event: name of the tournament or match event
  event: string;
  // Site: location of the event
  site: string;
  // Date: starting date of the game, in YYYY.MM.DD format
  date: string;
  // Round: playing round ordinal of the game
  round: string;
  // White: player of the white pieces, in Lastname, Firstname format
  white: string;
  // Black: player of the black pieces, same format as White
  black: string;
  // Result: result of the game. Four possible values: 1-0 (White won), 0-1 (Black won), 1/2-1/2 (draw), and * (other, e.g., the game is ongoing).
  result: string;
  // optional tags

  // WhiteTitle: academic title of the white player, GM, FM, IM, etc
  // - is used for untitled players
  whiteTitle?: string;
  // BlackTitle: same as WhiteTitle, but for the black player
  blackTitle?: string;
  // WhiteElo: Elo rating of the white player at the start of the game
  whiteElo?: string;
  // BlackElo: same as WhiteElo, but for the black player
  blackElo?: string;
  // WhiteUSCF: USCF rating of the white player at the start of the game (United States Chess Federation)
  whiteUSCF?: string;
  // blackUSCF: same as WhiteUSCF, but for the black player
  blackUSCF?: string;
  // WhiteNA: the e-mail or network addresses of the players.  A value of "-" is used for a player without an electronic address.
  whiteNA?: string;
  // BlackNA: same as WhiteNA, but for the black player
  blackNA?: string;
  // WhiteType: The value "human" should be used for a person while the value "program" should be used for algorithmic (computer) players.
  whiteType?: string;
  // BlackType: same as WhiteType, but for the black player
  blackType?: string;
  // TODO: add more descriptions
  eventDate?: string;
  eventSponsor?: string;
  section?: string;
  stage?: string;
  board?: string;
  opening?: string;
  variation?: string;
  subVariation?: string;
  eco?: string;
  nic?: string;
  time?: string;
  UTCtime?: string;
  UTCdate?: string;
  timeControl?: string;
  setup?: string;
  fen?: string;
  termination?: string;
  annotator?: string;
  mode?: string;
  plyCount?: string;
};
