/**
 * FLAGS
 * @module utils/flags
 */

// Internal modules
import { cliDebugInfo, cliHelpMenu, cliVersion } from "../components/index.js";

export const flags = {
  debug: {
    alias: "d",
    exec: cliDebugInfo,
  },
  help: {
    alias: "h",
    exec: cliHelpMenu,
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
