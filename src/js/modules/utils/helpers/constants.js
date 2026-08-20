/**
 * CONSTANT HELPERS
 * @module utils/helpers/constants
 */

// Import node modules
import { readFile } from "fs/promises";

// Import configs
import { commandsConfig, flagsConfig } from "../../configs/index.js";

// Import getters
import { getAllowedArguments, getNonExistingArguments, getUserArguments } from "../getters/index.js";

// Import helpers
import { checkForUserCommand, checkForUserFlag } from "./index.js";

// Command constants
export const allowedCommands = getAllowedArguments(commandsConfig)[0];
export const allowedLongCommands = getAllowedArguments(commandsConfig)[1];
export const allowedShortCommands = getAllowedArguments(commandsConfig)[2];

// Flag constants
export const allowedFlags = getAllowedArguments(flagsConfig, "flags")[0];
export const allowedLongFlags = getAllowedArguments(flagsConfig, "flags")[1];
export const allowedShortFlags = getAllowedArguments(flagsConfig, "flags")[2];

// Helper constants
export const log = console.log;
export const pkgJSON = JSON.parse(await readFile(new URL("../../../../../package.json", import.meta.url), "utf-8"));

// User input constants
export const userCommands = getUserArguments()[0];
export const userFlags = getUserArguments()[1];
export const userIncludedNonExistingCommands = getNonExistingArguments(allowedCommands, userCommands);
export const userIncludedNonExistingFlags = getNonExistingArguments(allowedFlags, userFlags);

// User prompt has constants
export const hasCommandInstall = checkForUserCommand("install");
export const hasFlagDebug = checkForUserFlag("debug");
export const hasFlagHelp = checkForUserFlag("help");
export const hasFlagNoClear = !!userFlags.find((flag) => flag === "no-clear" || flag === "nc");
export const hasFlagNoHeader = !!userFlags.find((flag) => flag === "no-header" || flag === "nh");
export const hasFlagVersion = checkForUserFlag("version");
export const hasMultiCommands = userCommands.length > 1;
export const hasNoArguments = userCommands.length === 0 && userFlags.length === 0;
export const hasNoCommand = userCommands.length === 0;
export const hasNoFlag = userFlags.length === 0;
export const hasNonExistingCommands = userIncludedNonExistingCommands.length > 0;
export const hasNonExistingFlags = userIncludedNonExistingFlags.length > 0;
export const hasVersionFlagOnly =
  hasNoCommand && userFlags.length === 1 && userFlags.find((flag) => flag === "version" || flag === "v");
