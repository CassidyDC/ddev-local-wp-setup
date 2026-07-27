/**
 * HELPERS
 * @module utils/helpers
 */

// Node modules
import { argv } from "node:process";
import { readFile } from "fs/promises";

// Internal modules
import { commands } from "./commands.js";
import { flags } from "./flags.js";

export const log = console.log;
export const pkgJSON = JSON.parse(await readFile(new URL("../../../../package.json", import.meta.url), "utf-8"));

export const userCommands = sortArgv().commands;
export const userFlags = sortArgv().flags;

export const hasNoClearFlag = !!userFlags.find((flag) => flag === "no-clear" || flag === "nc");
export const hasNoHeaderFlag = !!userFlags.find((flag) => flag === "no-header" || flag === "nh");

export const allowedCommands = [];
export const allowedLongCommands = [];
export const allowedShortCommands = [];

export const allowedFlags = [];
export const allowedLongFlags = [];
export const allowedShortFlags = [];

(function getAllowedCommands() {
  for (const [key, value] of Object.entries(commands)) {
    allowedCommands.push([value.alias, key]);
    allowedLongCommands.push(key);
    allowedShortCommands.push(value.alias);
  }
})();

(function getAllowedFlags() {
  for (const [key, value] of Object.entries(flags)) {
    allowedFlags.push([value.alias, key]);
    allowedLongFlags.push(key);
    allowedShortFlags.push(value.alias);
  }
})();

/**
 * Sort Argv
 * Sorts the node:process argv results from the CLI init
 *
 * @returns {object} The commands and flags used in CLI
 */
export function sortArgv() {
  const commands = [];
  const flags = [];

  argv.forEach((arg) => {
    // Jump to next loop if arg is a path
    if (arg.startsWith("/")) return;

    // Get flags
    if (arg.startsWith("--")) flags.push(arg.replace("--", ""));
    else if (arg.startsWith("-")) flags.push(arg.replace("-", ""));

    // Get Commands (starts with a letter)
    if (/^[A-Za-z]/.test(arg)) commands.push(arg);
  });

  return { commands, flags };
}
