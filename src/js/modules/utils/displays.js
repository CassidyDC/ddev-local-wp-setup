/**
 * DISPLAYS
 * @module utils/displays
 */

// Internal modules
import { cliDebugInfo, cliErrorInfo, cliHeader, cliHelpInfo, cliVersion } from "../components/index.js";
import { userIncludedNoClearFlag, userIncludedNoHeaderFlag, userIncludedVersionFlagOnly } from "./helpers.js";

/**
 * Prints the CLI header
 * Unless the user included the `no-header` flag or `version` flag, display the header
 */
export const displayHeader = () => {
  const clear = !userIncludedNoClearFlag;
  if (!userIncludedNoHeaderFlag && !userIncludedVersionFlagOnly) cliHeader(clear);
  else if (clear && !userIncludedVersionFlagOnly) console.clear();
};

/**
 * Prints the CLI debug information.
 */
export const displayDebugInfo = () => cliDebugInfo();

/**
 * Prints the CLI error information.
 */
export const displayErrorInfo = (nonExistingCmds, nonExistingFlags) => cliErrorInfo(nonExistingCmds, nonExistingFlags);

/**
 * Prints the CLI help information.
 */
export const displayHelpInfo = () => cliHelpInfo();

/**
 * Prints the CLI version without the header.
 */
export const displayVersion = () => cliVersion();
