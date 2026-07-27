/**
 * DISPLAYS
 * @module utils/displays
 */

import { cliHeader } from "../components/index.js";
import { hasNoClearFlag, hasNoHeaderFlag } from "./helpers.js";
import { helpFlag, versionFlag } from "../flags/index.js";
/**
 * Prints the CLI header
 */
export const displayHeader = () => {
  const clear = !hasNoClearFlag;
  // Display the header, unless the --no-header flag was used.
  if (!hasNoHeaderFlag) cliHeader(clear);
};

/**
 * Prints the CLI help information.
 */
export const displayHelp = () => helpFlag.help.exec();

/**
 * Prints the CLI version without the header.
 */
export const displayVersion = () => versionFlag.version.exec();
