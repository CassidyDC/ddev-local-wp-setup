/**
 * HELP FLAG
 * @module flags/help
 */

// Internal Modules
import { cliHelpMenu } from "../components/index.js";

export const helpFlag = {
  help: {
    alias: "h",
    exec: cliHelpMenu,
  },
};
