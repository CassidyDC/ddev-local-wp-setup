/**
 * COMMANDS CONFIG
 * @module configs/commands
 */

// Import commands
import { runInstaller } from "../commands/install/index.js";

export const commandsConfig = {
  install: {
    alias: "i",
    description: "Runs the DDEV Local WP Setup installation wizard",
    exec: runInstaller,
  },
};
