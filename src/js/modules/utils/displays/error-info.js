/**
 * DISPLAY ERROR INFO
 * @module utils/displays/error-info
 */

// Import components
import { cliErrorInfo } from "../../components/index.js";

/**
 * Display Error Info
 *
 * Prints the CLI error information.
 */
export const displayErrorInfo = (nonExistingCmds, nonExistingFlags) => cliErrorInfo(nonExistingCmds, nonExistingFlags);
