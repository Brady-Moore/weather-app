"use server";

import { promises as fs } from "fs";
import neatCsv from "neat-csv";
import { Options } from "csv-parser";
import TrieSearch from "trie-search";
import { cityDataHeaders, CityDataRow } from "./geodata-types";

async function buildCitiesFromFileAsync() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/geodata/cities15000.txt",
    "utf8"
  );
  const options = {
    headers: cityDataHeaders,
    separator: "\t",
  } as Options;
  const data = await neatCsv<CityDataRow>(file, options);
  return data;
}

const cityData = await buildCitiesFromFileAsync();

function buildCitiesTrie(data: CityDataRow[]) {
  const trie: TrieSearch<CityDataRow> = new TrieSearch<CityDataRow>(
    "asciiname",
    { min: 2 }
  );
  trie.addAll(data);
  return trie;
}

const citiesTrie = buildCitiesTrie(cityData);

export async function citySearch(query: string) {
  return citiesTrie.search(query);
}
