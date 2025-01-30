import { expect, test } from "bun:test";
import { MANGA } from "../../src/providerRoot/MANGA";
import { sleep } from "bun";

const kk = new MANGA().KAKALOT;
test("returns a filled array of search results", async () => {
  console.log(`running test "getSearch()" expexting search results`);
  console.log("the following data has been inferred: ");
  const data = await kk.getSearch("one piece");
  expect(await data.results).not.toEqual([]);
});
