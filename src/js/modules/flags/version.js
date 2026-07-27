/**
 * VERSION FLAG
 * @module flags/version
 */

// Internal modules
import { cliVersion } from "../components/index.js";

export const versionFlag = {
  version: {
    alias: "v",
    exec: cliVersion,
  },
};
