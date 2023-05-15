export type Suggestion = string;

export interface GetSuggestionResponse {
  q: string;
  page: number;
  limit: number;
  result: Suggestion[];
  qty: number;
  total: number;
}
