import { expect, test } from "bun:test";
import ANIME from "../../src/providerRoot/ANIME";

const gogo = new ANIME().GOGOANIME;
test("returns a filled array of search results", async () => {
  console.log(`running test "getSearch()" expexting search results`);
  console.log("the following data has been inferred: ");
  const data = await gogo.getSearch("one piece");
  expect(await data.results).not.toEqual([]);
});
