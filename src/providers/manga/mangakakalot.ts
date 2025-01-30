import axios from "axios";
import * as cheerio from "cheerio";
import MangaParser, { BASE_URL } from "../../parser/typeSpecific/MangaParser";
import { IExtension, IMangaSearchResult } from "../../../lib";

export const KAKALOT_URL: typeof BASE_URL = new URL(
  "",
  "https://mangakakalot.com",
); // do **not** add trailing "/"
export const CHAPTER_URL: typeof BASE_URL = new URL(
  "",
  "https://chapmanganato.com",
);
export class KAKALOT extends MangaParser {
  override readonly about: IExtension = {
    id: "MANGA.KAKALOT",
    name: "mangakakalot",
    type: "MANGA",
    BaseURL: KAKALOT_URL.origin,
    icon: "https://cdn.gogocdn.net/files/gogo/img/favicon.ico",
  };
  // search function
  override async getSearch(
    query: string,
    page: number = 1,
    ...args: any
  ): Promise<IMangaSearchResult> {
    const url = `${KAKALOT_URL}search/story/${encodeURIComponent(query)}`;
    // console.log(`${url}`);

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const res$: IMangaSearchResult[] = [];

    $(".story_item").each((index, element) => {
      const title = $(element)
        .find(".story_item_right .story_name")
        .text()
        .trim();
      const link = $(element)
        .find(".story_item_right .story_name a")
        .attr("href");
      const image = $(element).find("a > img").attr("src");
      const latestChapter = $(element)
        .find(".story_item_right .story_chapter")
        .text()
        .trim()
        .replace("\n", "")
        .split("                                    \n")[0];

      let id = null;
      if (link) {
        id = link.split("/").pop(); // Extracting manga ID
      }

      const results: IMangaSearchResult = {
        id,
        title,
        image,
        link,
        latestChapter,
      };
      res$.push(results);
    });
    return res$;
  }
}

export default KAKALOT;

const kk = new KAKALOT();
kk.getSearch("naruto").then((data) => {
  console.log(data);
});
