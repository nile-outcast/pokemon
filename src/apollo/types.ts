export type GetPokemonsVars = {
  limit: number;
  offset: number;
  name: string;
  experience: Range;
  attack: Range;
  types: string[];
};

type Range = {
  from: number;
  to: number;
};
