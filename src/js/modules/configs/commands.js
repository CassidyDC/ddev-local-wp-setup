/**
 * COMMANDS CONFIG
 * @module configs/commands
 */

// Import commands
import { runInstall } from "../commands/index.js";

export const commandsConfig = {
  install: {
    alias: "i",
    exec: runInstall,
  },
};
