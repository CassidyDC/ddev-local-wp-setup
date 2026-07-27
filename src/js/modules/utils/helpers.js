/**
 * HELPERS
 * @module utils/helpers
 */

// Node modules
import { argv } from "node:process";
import { readFile } from "fs/promises";

export const log = console.log;
export const pkgJSON = JSON.parse(await readFile(new URL("../../../../package.json", import.meta.url), "utf-8"));

export const userCommands = sortArgv().commands;
export const userFlags = sortArgv().flags;

export const hasNoClearFlag = !!userFlags.find((flag) => flag === "no-clear" || flag === "nc");
export const hasNoHeaderFlag = !!userFlags.find((flag) => flag === "no-header" || flag === "nh");

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
