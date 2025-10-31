export const enum Cat {
  'Commercial',
  'GameJam',
  'Other',
  'GameJamEvents',
}
export const enum GameType {
  'Commercial',
  'GameJam',
  'Other',
  'GameJamEvents',
}

export type NameAndUrl = {
  name: string;
  url: string;
};

export interface ProjectData {
  id: string;
  title: string;
  team: Array<NameAndUrl>;
  publishers: Array<NameAndUrl>;
  inDevelopment: boolean;
  category: Cat;
  boxArt: string;
  genres: Set<GameType>;
  ytvideoid?: string;
  date: string;
  shortDescription: string;
  description: string;
  stores: Array<{name: string; url: string}>;
  screenshots: Array<string>;
}

export interface ProjectDataCasted extends ProjectData {
  dateCasted: Date;
}
