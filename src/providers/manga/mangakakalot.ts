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

const genreToId = {
  all: "all",
  action: 2,
  adult: 3,
  adventure: 4,
  comedy: 5,
  cooking: 6,
  doujinshi: 7,
  drama: 8,
  ecchi: 9,
  erotica: 10,
  fantasy: 11,
  "gender bender": 12,
  harem: 13,
  historical: 14,
  horror: 15,
  isekai: 16,
  josei: 17,
  manhua: 18,
  manhwa: 19,
  "martial arts": 20,
  mature: 21,
  mecha: 22,
  medical: 23,
  mystery: 24,
  "one shot": 25,
  pornographic: 26,
  psychological: 27,
  romance: 28,
  "school life": 29,
  "sci fi": 30,
  seinen: 31,
  shoujo: 32,
  "shoujo ai": 33,
  shounen: 34,
  "shounen ai": 35,
  "slice of life": 36,
  smut: 37,
  sports: 38,
  supernatural: 39,
  tragedy: 40,
  webtoons: 41,
  yaoi: 42,
  yuri: 43,
};

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

  override async getTopManga(page: any = 1, ...args: any) {
    const url = `${KAKALOT_URL}manga_list?type=topview&category=all&state=all&page=${page}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results: any[] = [];

    $(".list-truyen-item-wrap").each((index, element) => {
      // const rank = index + 1
      const title = $(element).find("h3 > a").text().trim();
      const image = $(element).find(".list-story-item img").attr("src");
      const id = $(element)
        .find("h3 a")
        .attr("href")
        ?.replace("https://chapmanganato.to/", "");
      const latestChapter = $(element)
        .find(".list-story-item-wrap-chapter")
        .text()
        .trim();
      const description = $(element)
        .find("p")
        .text()
        .trim()
        ?.replace("        More.", "...");

      results.push({
        // rank,
        title,
        image,
        id,
        latestChapter,
        description,
      });
    });
    const currentPage = parseInt(page, 10);
    const pageLimit = 999;
    var hasNextPage = false;
    if (currentPage < 999) {
      const hasNextPage = true;
      return {
        currentPage,
        hasNextPage,
        results,
      };
    } else if (currentPage == 999) {
      return {
        currentPage,
        hasNextPage,
        results,
      };
    } else {
      return {
        error: "item not found",
      };
    }
    // return results;
  }
  override async getRecentManga(page: any = 1, ...args: any): Promise<any> {
    const url = `${KAKALOT_URL}manga_list?type=latest&category=all&state=all&page=${page}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results: any[] = [];

    $(".list-truyen-item-wrap").each((index, element) => {
      const title = $(element).find("h3 > a").text().trim();
      const image = $(element).find(".list-story-item > img").attr("src");
      const link = $(element).find("h3 > a").attr("href");
      const latestChapter = $(element)
        .find(".list-story-item-wrap-chapter")
        .text()
        .trim();
      const id = link?.split("/").pop(); // Extracting manga ID
      const description = $(element).find("p").text().trim();

      results.push({
        id,
        title,
        image,
        latestChapter,
        description,
      });
    });
    const currentPage = parseInt(page, 10);
    const pageLimit = 999;
    var hasNextPage = false;
    if (currentPage < 999) {
      const hasNextPage = true;
      return {
        currentPage,
        hasNextPage,
        pageLimit,
        results,
      };
    } else if (currentPage == 999) {
      // const hasNextPage = false
      return {
        currentPage,
        hasNextPage,
        pageLimit,
        results,
      };
    } else {
      return {
        error: "page not found",
      };
    }
  }
  override async getMangaInfo(id: string, ...args: any): Promise<any[]> {
    const url = `${CHAPTER_URL}${id}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const gen_temp = $("tr:nth-child(4) td:nth-child(2)")
      .map((i, el) => $(el).text().trim())
      .get();
    const gen_ref = gen_temp[0];
    const mangaInfo: any = {
      id,
      title: $(".story-info-right > h1").text().trim(),
      image: $(".story-info-left .info-image img").attr("src"),
      altTitle: $("tr:nth-child(1) td:nth-child(2) > h2").text().trim(),
      author: $("tr:nth-child(2) td:nth-child(2)").text().trim(),
      description: $(".panel-story-info-description").text().trim(),
      status: $("tr:nth-child(3) td:nth-child(2)").text().trim(),
      genres: gen_ref.split(" - "),
      updatedOn: $("p > span.stre-value").text().trim(),
    };
    // Extracting chapters
    mangaInfo.chapters = [];
    $(".row-content-chapter li").each((index, element) => {
      const chapterName = $(element).find(".chapter-name").text().trim();
      const chapterLink = $(element).find(".chapter-name").attr("href");

      // Extract only the chapter number from the URL
      const chapterNumberMatch = chapterLink?.match(/chapter-(\d+)/);
      const chapterNumber = chapterNumberMatch ? chapterNumberMatch[1] : null;

      mangaInfo.chapters.push({
        chapterName,
        chapterNumber,
      });
    });
    return mangaInfo;
  }

  override async getMangaListByGenre(
    id: string,
    page: any = 1,
    ...args: any
  ): Promise<any> {
    function genreExt(genre: any): any {
      return genreToId[genre.toLowerCase()] || id;
    }
    const newId = genreExt(id);
    const url = `${KAKALOT_URL}manga_list?type=topview&category=${newId}&state=all&page=${page}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const results: any = [];

    $(".list-truyen-item-wrap").each((i, el) => {
      results.push({
        id:
          $(el)
            .find(".list-story-item")
            .attr("href")
            ?.replace("https://chapmanganato.to/", "") || "-",
        title: $(el).find("h3 > a").text().trim(),
        img: $(el).find(".list-story-item > img").attr("src"),
        latestChapter:
          $(el).find(".list-story-item-wrap-chapter").text().trim() || "-",
        description: $(el).find("p").text().trim(),
      });
    });
    return { genre: id, results };
  }
  override async getPageByChapterID(
    mangaID: string,
    chapter: number,
    ...args: any
  ): Promise<any[]> {
    const URL = `${CHAPTER_URL}${mangaID}/chapter-${chapter}`;
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const mangaPages: any[] = [];

    $(".container-chapter-reader img").each((index, element) => {
      const pageUrl = $(element).attr("src");
      mangaPages.push(pageUrl);
    });

    return { URL: URL, manga: mangaID, chapter: chapter, pages: mangaPages };
  }
}
