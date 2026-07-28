/**
 * FLAGS
 * @module utils/flags
 */

// Internal modules
import { cliDebugInfo, cliHelpInfo, cliVersion } from "../components/index.js";
import { getAllowedArguments, getNonExistingArguments, userFlags } from "./helpers.js";

export const flags = {
  debug: {
    alias: "d",
    exec: cliDebugInfo,
  },
  help: {
    alias: "h",
    exec: cliHelpInfo,
  },
  "no-clear": {
    alias: "nc",
    exec: null,
  },
  "no-header": {
    alias: "nh",
    exec: null,
  },
  version: {
    alias: "v",
    exec: cliVersion,
  },
};

export const allowedFlags = getAllowedArguments(flags, "flags")[0];
export const allowedLongFlags = getAllowedArguments(flags, "flags")[1];
export const allowedShortFlags = getAllowedArguments(flags, "flags")[2];
export const userIncludedNonExistingFlags = getNonExistingArguments(allowedFlags, userFlags);
