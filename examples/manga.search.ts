import { MANGA } from "../src/providerRoot/MANGA";

const kk = new MANGA().KAKALOT;

kk.getSearch("one piece").then((data) => {
  console.log(data);
});
