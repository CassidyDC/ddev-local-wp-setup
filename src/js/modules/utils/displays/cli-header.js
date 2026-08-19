/**
 * DISPLAY CLI HEADER
 * @module utils/displays/cli-header
 */

// Import components
import { cliHeader } from "../../components/index.js";

// Import utils
import { userIncludedNoHeaderFlag, userIncludedNoClearFlag, userIncludedVersionFlagOnly } from "../helpers.js";

/**
 * Display CLI Header
 *
 * Prints the header, unless the user included the `no-header` or `version` flags.
 */
export const displayHeader = () => {
  const clear = !userIncludedNoClearFlag;
  if (!userIncludedNoHeaderFlag && !userIncludedVersionFlagOnly) cliHeader(clear);
  else if (clear && !userIncludedVersionFlagOnly) console.clear();
};
