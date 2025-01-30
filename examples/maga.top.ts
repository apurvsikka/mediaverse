import { MANGA } from "../src/providerRoot/MANGA";

const kk = new MANGA().KAKALOT;

kk.getTopManga().then((data) => {
  console.log(data);
});
