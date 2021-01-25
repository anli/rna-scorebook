export type ScoreCategory = {
  id: string;
  name: string;
  blockById?: string;
  configs: {
    question: string;
    options: {name: string; value?: string}[];
    typeId: string;
  }[];
  isNumeric?: boolean;
  abbreviation: string;
};
