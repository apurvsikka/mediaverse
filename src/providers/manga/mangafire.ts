import { IExtension, IMangaSearchResult } from "../../../lib";
import { BASE_URL } from "../../parser/typeSpecific/AnimeParser";
import MangaParser from "../../parser/typeSpecific/MangaParser";
import axios from "axios";
import * as cheerio from "cheerio";

export const MANGAFIRE_URL: typeof BASE_URL = new URL(
  "",
  "https://mangafire.to",
);

export class MANGAFIRE extends MangaParser {
  override about: IExtension = {
    id: "MANGA.MANGAFIRE",
    name: "magafire",
    type: "MANGA",
    BaseURL: MANGAFIRE_URL.origin,
    icon: "https://mangafire.to/assets/sites/mangafire/favicon.png?v3",
  };

  override async getSearch(
    query: string,
    page?: number,
    ...args: any
  ): IMangaSearchResult {
    const URL = `${this.about.BaseURL}/filter?keyword=${query}&page=${page || 1}`;
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const res$: IMangaSearchResult[] = [];
    $(".original > .unit").each((index, element) => {
      const title = $(element).find(".inner > .info > a").text().trim();
      const id = $(element)
        .find(".inner > .poster")
        .attr("href")
        ?.split("/manga/")[1];
      const type = $(element).find(".info > div > .type").text().trim();
      const image = $(element).find(".inner > .poster > div > img").attr("src");

      // Extract Latest Chapter
      const LatestChapter = {
        chapter: $(element)
          .find(".info > .content:nth-of-type(1) > li > a > span:nth-child(1)")
          .text()
          .trim()
          .split("Chap")[1]
          .split(" ")[1],
        lang: $(element)
          .find(".info > .content:nth-of-type(1) > li > a > span:nth-child(1)")
          .text()
          .trim()
          .split("Chap")[1]
          .split(" ")[2],
        link: `please do it yourself for the moment :), will be available in production soon, (hint: it is lang.toLowerCase()/chapter)`,
      };

      // Extract Latest Volume
      const LatestVolume = {
        volume:
          $(element)
            .find(
              ".info > .content:nth-of-type(2) > li > a > span:nth-child(1)",
            )
            .text()
            .split("Vol ")[1]
            ?.split(" ")[0] || "Volumes not available for given release",
        lang:
          $(element)
            .find(
              ".info > .content:nth-of-type(2) > li > a > span:nth-child(1)",
            )
            .text()
            .split("Vol ")[1]
            ?.split(" ")[1] || "volume not available",
        link: `please do it yourself for the moment :), will be available in production soon, (hint: it is lang.toLowerCase()/volume)`,
      };

      const RecentChapters: any[] = [];
      $(element)
        .find(".info .content:nth-of-type(1) > li > a > span:nth-child(1)")
        .each((index, element) => {
          const chapterData = $(element)
            .text()
            .split("Chap ")[1]
            ?.split(" ")[0];
          const lang = $(element).find("b").text();
          const link = `/${lang.toLowerCase() || " "}/chapter-${chapterData || " "}`;
          RecentChapters.push({
            chapter: chapterData,
            lang: lang,
            link: link,
          });
        });

      const RecentVolumes: any[] = [];
      $(element)
        .find(".info .content:nth-of-type(2) > li > a > span:nth-child(1)")
        .each((index, element) => {
          const volumeData =
            $(element).text().split("Vol ")[1]?.split(" ")[0] ||
            "Volumes not available for given release";
          const lang = $(element).find("b").text() || "Volume not found";
          const link = `/${lang.toLowerCase() || " "}/volume-${volumeData || " "}`;
          RecentVolumes.push({
            volume: volumeData,
            lang: lang,
            link: link,
          });
        });

      res$.push({
        title,
        id,
        image,
        LatestChapter,
        LatestVolume,
        RecentChapters: RecentChapters,
        RecentVolumes: RecentVolumes,
      });
    });

    // // Debugging: stringify the results to see the full data structure
    // console.log(res$, "", "");

    return res$;
  }
  // override async getRecentManga(page: number): Promise<any[]> {
  //   const URL = `${this.about.BaseURL}/newest?page=${page || 1}`;
  //   const { data } = await axios.get(URL);
  //   const $ = cheerio.load(data);
  //   const res$: any[] = [];

  //   return res$;
  // }
}

const d = new MANGAFIRE();
d.getSearch("one piece");
