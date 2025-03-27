"use server";

import { promises as fs } from "fs";
import neatCsv from "neat-csv";
import { Options } from "csv-parser";
import TrieSearch from "trie-search";
import { cityDataHeaders, CityDataRow } from "./geodata-types";

export const citiesFilePathDefault = "/src/app/geodata/cities15000.txt";

async function buildCitiesFromFileAsync(filepath: string) {
  const file = await fs.readFile(process.cwd() + filepath, "utf8");
  const options = {
    headers: cityDataHeaders,
    separator: "\t",
  } as Options;
  const data = await neatCsv<CityDataRow>(file, options);
  return data;
}

function buildCitiesTrie(data: CityDataRow[]) {
  const trie: TrieSearch<CityDataRow> = new TrieSearch<CityDataRow>(
    ["name", "asciiname"],
    { min: 2 }
  );
  trie.addAll(data);
  return trie;
}

let cityData: CityDataRow[] | undefined;
let citiesTrie: TrieSearch<CityDataRow> | undefined;

export async function cityDataIsLoaded() {
  return !!cityData && !!citiesTrie;
}

export async function cityDataLoadIfNeeded(
  filepath: string = citiesFilePathDefault
) {
  if (!(await cityDataIsLoaded())) {
    cityData = await buildCitiesFromFileAsync(filepath);
    citiesTrie = buildCitiesTrie(cityData);
    return true;
  }
  return false;
}

export async function cityDataUnload() {
  cityData = undefined;
  citiesTrie = undefined;
}

export async function citySearch(query: string) {
  await cityDataLoadIfNeeded();
  return citiesTrie?.search(query) || [];
}
