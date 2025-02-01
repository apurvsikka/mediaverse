import { expect, test } from "bun:test";
import { MANGA } from "../../src/providerRoot/MANGA";
import { sleep } from "bun";

const kk = new MANGA().KAKALOT;

test("returns a filled array of search results", async () => {
  console.log(`running test "getSearch()" expecting search results`);
  console.log("the following data has been inferred: ");
  const data = await kk.getSearch("one piece");
  expect(await data.results).not.toEqual([]);
  await kk.getSearch("one piece").then((data) => console.log(data));
});

test("returns a filled array of top manga", async () => {
  console.log(`running test "getTopManga()" expecting search results`);
  console.log("the following data has been inferred: ");
  const data = await kk.getTopManga();
  expect(data).not.toEqual([]);
  await kk.getTopManga().then((data) => console.log(data));
});

test("returns a filled array of recent manga releases", async () => {
  console.log(`running test "getTopManga()" expecting search results`);
  console.log("the following data has been inferred: ");
  const data = await kk.getRecentManga();
  expect(data).not.toEqual([]);
  await kk.getRecentManga().then((data) => console.log(data));
});

test("returns information on a given manga(by id)", async () => {
  console.log(`running test "getTopManga()" expecting search results`);
  console.log("the following data has been inferred: ");
  const data = await kk.getMangaInfo("manga-cn1005496");
  expect(data).not.toEqual([]);
  await kk.getMangaInfo("manga-cn1005496").then((data) => console.log(data));
});

test("returns manga found under same genre ", async () => {
  console.log(`running test "getSearch()" expecting search results`);
  console.log("the following data has been inferred: ");
  const data = await kk.getMangaListByGenre("shounen");
  expect(await data.results).not.toEqual([]);
  await kk.getMangaListByGenre("shounen").then((data) => console.log(data));
});

test("returns pages of a given chapter(by id)", async () => {
  console.log(`running test "getPage()" expecting search results`);
  console.log("the following data has been inferred: ");
  const data = await kk.getPageByChapterID("manga-cn1005496", 1);
  expect(data).not.toEqual([]);
  await kk
    .getPageByChapterID("manga-cn1005496", 1)
    .then((data) => console.log(data));
});
