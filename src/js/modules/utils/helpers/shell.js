/**
 * SHELL HELPERS
 * @module utils/helpers/shell
 */

// Import node modules
import { spawn } from "node:child_process";

// Import configs
import { commandsConfig, flagsConfig } from "../../configs/index.js";

// Import helpers
import { userCommands, userFlags } from "./index.js";

/**
 * Checks if the user included a command in their prompt
 *
 * @param {string} cmdName The full string name for the command being checked
 * @returns {boolean} Whether the command name was included in the user's prompt.
 */
export function checkForUserCommand(cmdName) {
  // User included long command
  if (userCommands.find((cmd) => cmd === cmdName)) return true;

  // User included short command
  const cmdAlias = commandsConfig[cmdName].alias;
  if (userCommands.find((cmd) => cmd === cmdAlias)) return true;

  // User did not include command
  return false;
}

/**
 * Checks if the user included a flag in their prompt
 *
 * @param {string} cmdName The full string name for the flag being checked
 * @returns {boolean} Whether the flag name was included in the user's prompt.
 */
export function checkForUserFlag(flagName) {
  // User included long flag
  if (userFlags.find((flag) => flag.replace("--", "") === flagName)) return true;

  // User included short flag
  const flagAlias = flagsConfig[flagName].alias;
  if (userFlags.find((flag) => flag.replace("-", "") === flagAlias)) return true;

  // User did not include flag
  return false;
}

/**
 * RUN COMMAND
 *
 * @param {string} command The shell command being executed.
 * @param {string[]} args The shell command argument being executed.
 * @returns {Promise<void>} Resolves when the command exits with code 0.
 */
export function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: false,
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}
