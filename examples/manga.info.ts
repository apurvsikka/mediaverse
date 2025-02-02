import { MANGA } from "../src/providerRoot/MANGA";

const kk = new MANGA().KAKALOT;

kk.getMangaInfo("manga-cn1005496").then((data) => {
  console.log(data);
});
