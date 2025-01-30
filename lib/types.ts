type ID = string | number;
type SimpleTitle = string | null;
type SimpleImage = string | null;

enum SubOrDub {
  sub = "SUB",
  dub = "DUB",
}

interface IComplexTitle {
  romaji: string | null;
  english: string | null;
  native: string | null;
  userPrefered?: string | null;
}

interface IComplexImage {
  small: string | null;
  medium: string | null;
  large: string | null;
  color?: string | null;
}

interface IExtension {
  id:
    | null
    | `ANIME.${string}`
    | `MANGA.${string}`
    | `NOVEL.${string}`
    | `TV.${string}`
    | `DRAMA.${string}`
    | `MOVIE.${string}`
    | `META.${string}`;
  name: string;
  type: "ANIME" | "MANGA" | "NOVEL" | "TV" | "DRAMA" | "MOVIE" | "META";
  icon: string;
  BaseURL: string;
  ajaxURL?: string | null;
}

interface ISearchResults {
  id: ID;
  ALID: ID | "Not found";
  title: IComplexTitle | SimpleTitle;
  subOrDub: "SUB" | "DUB";
  image: SimpleImage;
  coverImage?: IComplexImage | null;
  bannerImage?: IComplexImage | null;
  description: string | null;
  otherNames?: string[] | string | "Not found";
  genres: string | "Not found";
  status: string;
  episodes: number | 0;
  eplist: string[] | "Not found" | null;
  connections?: string[] | "Not found";
  [arg: string]: any;
}

interface IMangaSearchResult {
  id: any;
  title: any;
  image: any;
  link: any;
  latestChapter: any;
}

export { IExtension, ISearchResults, IMangaSearchResult };
