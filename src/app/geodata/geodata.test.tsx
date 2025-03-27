import {
  cityDataIsLoaded,
  cityDataLoadIfNeeded,
  cityDataUnload,
  citySearch,
} from "./geodata";
import { CityDataRow } from "./geodata-types";

const seattleCityData = {
  $tsid: "7315a9e80eb84c05e02ec252e206899e",
  "admin1 code": "WA",
  "admin2 code": "033",
  "admin3 code": "7174408",
  "admin4 code": "",
  alternatenames:
    "SEA,Seatl,Seatlo,Seattle,Seattlum,Siatl,Siatul,Siehtl,Sietl,Sietla,Sietlas,Sijetl,Siyaatil,Séatl,ciyattil,shiatoru,si'aitala,siaeteul,sietʼli,siyatal,siyatala,syatl,xi ya tu,Σιάτλ,Сиатъл,Сиетл,Сиэтл,Сијетл,Сіэтл,Сієтл,Սիեթլ,סיאטל,سياتل,سیئٹل,سیاتل,سیاٹل,सिअ‍ॅटल,सीऐटल,সিয়াটল,சியாட்டில்,ಸಿಯಾಟಲ್,ซีแอตเทิล,სიეტლი,ስያትል,ស៊ីតថល,シアトル,西雅圖,시애틀",
  asciiname: "Seattle",
  cc2: "",
  "country code": "US",
  dem: "56",
  elevation: "56",
  "feature class": "P",
  "feature code": "PPLA2",
  geonameid: "5809844",
  latitude: "47.60621",
  longitude: "-122.33207",
  "modification date": "2025-02-23",
  name: "Seattle",
  population: "737015",
  timezone: "America/Los_Angeles",
} as CityDataRow;

describe("cityDataLoadIfNeeded", () => {
  test("loads cityData only when it's not already loaded", async () => {
    await cityDataUnload();
    expect(await cityDataIsLoaded()).toBeFalsy();
    expect(await cityDataLoadIfNeeded()).toBeTruthy();
    expect(await cityDataIsLoaded()).toBeTruthy();
    expect(await cityDataLoadIfNeeded()).toBeFalsy();
    expect(await cityDataIsLoaded()).toBeTruthy();
  });
});

describe("citySearch", () => {
  test("returns a list of matching cityDataRows", async () => {
    expect(await citySearch("seattle")).toStrictEqual([seattleCityData]);
  });
  test("returns an empty list when there's no match", async () => {
    expect(await citySearch("really long unmatch name")).toStrictEqual([]);
  });
  test("returns an empty list when query is empty", async () => {
    expect(await citySearch("")).toStrictEqual([]);
  });
});
