export const enum Cat {
  'Commercial',
  'GameJam',
  'Other',
  'GameJamEvent',
}
export const enum GameType {
  'Commercial',
  'GameJam',
  'Other',
  'GameJamEvent',
}
export interface ProjectData {
  id: string;
  title: string;
  team: Array<{name: string; url: string}>;
  inDevelopment: boolean;
  category: Cat;
  boxArt: string;
  genres: Set<GameType>;
  date: string;
  description: string;
  stores: Array<{name: string; url: string}>;
  screenshots: Array<string>;
}
