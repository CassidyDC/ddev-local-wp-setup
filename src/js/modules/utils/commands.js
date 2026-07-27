/**
 * COMMANDS
 * @module utils/commands
 */

// Internal Modules
import { runInstallationWizard } from "../commands/install.js";

export const commands = {
  install: {
    alias: "i",
    exec: runInstallationWizard,
  },
};
