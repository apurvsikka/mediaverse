import { IExtension, ISearchResults, IMangaSearchResult } from "../../../lib";
import BaseParser from "../BaseParser";

// EXTENSION URL
export var BASE_URL: URL; // new URL("", "");

abstract class AnimeParser extends BaseParser {
  // extension info
  protected abstract about: IExtension;
  // search function
  abstract getSearch(
    query: string,
    page?: number,
    ...args: any
  ): IMangaSearchResult;
  // top listings
  abstract getTopManga(page: number, ...args: any): any;
  //recent additions
  abstract getRecentManga(page: number, ...args: any): any;
}

export default AnimeParser;
