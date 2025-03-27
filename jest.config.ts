import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: ["/node_modules/(?!(neat-csv)/)"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const configAsync = createJestConfig(config);

// Wrap the config callback so we can post-modify transformIgnorePatterns
export default async () => {
  const jestConfig = await configAsync();
  jestConfig.transformIgnorePatterns = config.transformIgnorePatterns;
  return jestConfig;
};
