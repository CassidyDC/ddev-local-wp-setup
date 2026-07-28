/**
 * COMMANDS
 * @module utils/commands
 */

// Internal Modules
import { runInstallationWizard } from "../commands/install.js";
import { getAllowedArguments, getNonExistingArguments, userCommands } from "./helpers.js";

export const commands = {
  install: {
    alias: "i",
    exec: runInstallationWizard,
  },
};

export const allowedCommands = getAllowedArguments(commands)[0];
export const allowedLongCommands = getAllowedArguments(commands)[1];
export const allowedShortCommands = getAllowedArguments(commands)[2];
export const userIncludedNonExistingCommands = getNonExistingArguments(allowedCommands, userCommands);
