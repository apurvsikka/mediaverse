import axios from "axios";
import * as cheerio from "cheerio";
import AnimeParser, { BASE_URL } from "../../parser/typeSpecific/AnimeParser";
import { IExtension, ISearchResults } from "../../../lib";

export const GOGO_URL: typeof BASE_URL = new URL("", "https://anitaku.so"); // do not add trailing "/"

export class GOGO extends AnimeParser {
  override readonly about: IExtension = {
    id: "ANIME.GOGO",
    name: "gogoanime",
    type: "ANIME",
    BaseURL: GOGO_URL.origin,
    icon: "https://cdn.gogocdn.net/files/gogo/img/favicon.ico",
  };
  // search function
  override async getSearch(
    query: string,
    page: number = 1,
    ...args: any
  ): Promise<ISearchResults> {
    const response = await fetch(
      `${GOGO_URL}/search.html?keyword=${query}&page=${page}`,
    );
    let html = await response.text();
    let $ = cheerio.load(html);
    const results: any = [];

    $("ul.items li").each(function (i, elem) {
      const $$: any = $(elem).html();
      $ = cheerio.load($$);
      let anime = {
        title: $("p.name a").text() || null,
        img: $("div.img a img").attr("src") || null,
        link: $("div.img a").attr("href") || null,
        id: $("div.img a").attr("href")?.split("/category/")[1] || null,
        releaseDate: $("p.released").text().trim().split(":")[1] || null,
      };

      results.push(anime);
    });

    return results;
  }
}

export default GOGO;
