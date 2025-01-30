import ANIME from "../src/providerRoot/ANIME";
const gogo = new ANIME().GOGOANIME;

// should return array of results:ISearchResults {see ../lib/types.ts for type reference}
gogo.getSearch("one piece").then((data: any) => {
  console.log(data);
});
