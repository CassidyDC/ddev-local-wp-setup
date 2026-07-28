/**
 * HELPERS
 * @module utils/helpers
 */

// Node modules
import { argv } from "node:process";
import { readFile } from "fs/promises";

export const log = console.log;
export const pkgJSON = JSON.parse(await readFile(new URL("../../../../package.json", import.meta.url), "utf-8"));

export const userCommands = sortArgv()[0];
export const userFlags = sortArgv()[1];

export const userIncludedNoClearFlag = !!userFlags.find((flag) => flag === "no-clear" || flag === "nc");
export const userIncludedNoHeaderFlag = !!userFlags.find((flag) => flag === "no-header" || flag === "nh");

export const isCommandless = userCommands.length === 0;
export const isFlagless = userFlags.length === 0;

export const userIncludedVersionFlagOnly =
  isCommandless && userFlags.length === 1 && userFlags.find((flag) => flag === "version" || flag === "v");

export function getAllowedArguments(args, type = null) {
  const allArgs = [];
  const longArgs = [];
  const shortArgs = [];

  for (const [key, value] of Object.entries(args)) {
    let longName = key;
    let shortName = value.alias;

    if (type == "flags") {
      longName = `--${longName}`;
      shortName = `-${shortName}`;
    }

    allArgs.push([shortName, longName]);
    longArgs.push(longName);
    shortArgs.push(shortName);
  }

  return [allArgs, longArgs, shortArgs];
}

export function getNonExistingArguments(allowedArgs, userArgs) {
  const nonExistingArgs = [];
  nonExistingArgs.push(...userArgs.filter((arg) => !allowedArgs.flat().includes(arg)));
  return nonExistingArgs;
}

/**
 * Sort Argv
 * Sorts the node:process argv results from the CLI init
 *
 * @returns {object} The commands and flags used in CLI
 */
function sortArgv() {
  const commands = [];
  const flags = [];

  argv.forEach((arg) => {
    // Jump to next loop if arg is a path (starts with a forward slash)
    if (arg.startsWith("/")) return;

    // Get flags (starts with a dash)
    if (arg.startsWith("-")) flags.push(arg);

    // Get Commands (starts with a letter)
    if (/^[A-Za-z]/.test(arg)) commands.push(arg);
  });

  return [commands, flags];
}
