/**
 * COMMANDS CONFIG
 * @module configs/commands
 */

// Import install command installer
import { runInstaller } from "../commands/install/installer.js";

export const commandsConfig = {
  install: {
    alias: "i",
    description: "Runs the DDEV Local WP Setup installation wizard",
    exec: runInstaller,
  },
};
