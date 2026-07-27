/**
 * DISPLAYS
 * @module utils/displays
 */

// Internal modules
import { cliDebugInfo, cliHeader, cliHelpMenu, cliVersion } from "../components/index.js";
import { hasNoClearFlag, hasNoHeaderFlag } from "./helpers.js";

/**
 * Prints the CLI header
 */
export const displayHeader = () => {
  const clear = !hasNoClearFlag;
  if (!hasNoHeaderFlag) cliHeader(clear);
  else if (clear) console.clear();
};

/**
 * Prints the CLI debug information.
 */
export const displayDebugInfo = () => cliDebugInfo();

/**
 * Prints the CLI help information.
 */
export const displayHelp = () => cliHelpMenu();

/**
 * Prints the CLI version without the header.
 */
export const displayVersion = () => cliVersion();
