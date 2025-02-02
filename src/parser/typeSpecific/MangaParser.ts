import { IExtension, ISearchResults, IMangaSearchResult } from "../../../lib";
import BaseParser from "../BaseParser";

// EXTENSION URL
export var BASE_URL: URL; // new URL("", "");

abstract class MangaParser extends BaseParser {
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
  abstract getRecentManga(page: number, ...args: any): Promise<any[]>;
  //get manga information
  abstract getMangaInfo(id: string, ...args: any): Promise<any[]>;
  //get genre
  abstract getMangaListByGenre(id: string, ...args: any): Promise<any[]>;
  // get chapter-wise pages
  abstract getPageByChapterID(
    name?: string,
    id?: number,
    ...args: any
  ): Promise<any[]>;
}

export default MangaParser;
