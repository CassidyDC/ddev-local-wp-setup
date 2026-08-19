/**
 * DISPLAY VERSION
 * @module utils/displays/version
 */

// Import components
import { cliVersion } from "../../components/index.js";

/**
 * Display Version
 *
 * Prints the CLI version without the header.
 */
export const displayVersion = () => cliVersion();
