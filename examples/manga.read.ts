import { MANGA } from "../src/providerRoot/MANGA";

const kk = new MANGA().KAKALOT;
kk.getPageByChapterID("manga-aa951883", 1).then((data) => console.log(data));
