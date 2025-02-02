import { MANGA } from "../src/providerRoot/MANGA";

const kk = new MANGA().KAKALOT;
kk.getMangaListByGenre("shounen").then((data) => {
  console.log(data);
});
