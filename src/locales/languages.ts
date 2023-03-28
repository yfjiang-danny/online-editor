import { lstatSync, readdirSync } from "fs";
import { join } from "path";

const defaultLanguage = "en";

// based on the directories get the language codes
const languages = readdirSync(join(__dirname, "locales")).filter((fileName) => {
  const joinedPath = join(join(__dirname, "locales"), fileName);
  const isDirectory = lstatSync(joinedPath).isDirectory();
  return isDirectory;
});
// defaultLanguage as first
languages.splice(languages.indexOf(defaultLanguage), 1);
languages.unshift(defaultLanguage);

export { languages, defaultLanguage };
