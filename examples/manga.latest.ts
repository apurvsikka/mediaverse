import { MANGA } from "../src/providerRoot/MANGA";

const kk = new MANGA().KAKALOT;

kk.getRecentManga().then((data) => {
  console.log(data);
});
