/**
 * ARGUMENT GETTERS
 * @module utils/getters/arguments
 */

// Import node modules
import { argv } from "node:process";

/**
 * Get allowed command or flag arguments.
 *
 * @param {Record<string, { alias: string }>} args Object where each key is the long argument name and each value contains an alias.
 * @param {"flags" | null} [type=null] When set to "flags", prefixes long names with "--" and aliases with "-".
 * @returns {[string[][], string[], string[]]} A tuple containing all argument pairs, long arguments, and short arguments.
 */
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

/**
 * Get user-provided arguments that are not in the allowed arguments list.
 *
 * @param {string[] | string[][]} allowedArgs Allowed argument names. Can be a flat array or nested pairs like [["-h", "--help"]].
 *
 * @param {string[]} userArgs Arguments provided by the user.
 *
 * @returns {string[]} User arguments that do not exist in the allowed arguments list.
 */
export function getNonExistingArguments(allowedArgs, userArgs) {
  return userArgs.filter((arg) => !allowedArgs.flat().includes(arg));
}

/**
 * Get User Arguments
 *
 * Sorts the node:process argv results from the CLI init
 *
 * @returns {object} The commands and flags used in CLI
 */
export function getUserArguments() {
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
