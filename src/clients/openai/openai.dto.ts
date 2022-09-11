export type ModerateTextApiResponse = {
  id: string;
  model: string;
  results: Results;
};
export type Results = {
  categories: Categories;
  category_scores: CategoryScores;
  flagged: boolean;
};
type Categories = {
  hate: boolean;
  'hate/threatening': boolean;
  'self-harm': boolean;
  sexual: boolean;
  'sexual/minors': boolean;
  violence: boolean;
  'violence/graphic': boolean;
};
type CategoryScores = {
  hate: number;
  'hate/threatening': number;
  'self-harm': number;
  sexual: number;
  'sexual/minors': number;
  violence: number;
  'violence/graphic': number;
};
