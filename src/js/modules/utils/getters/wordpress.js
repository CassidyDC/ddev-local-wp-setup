/**
 * INSTALLATION HELPERS
 * @module utils/helpers/installation
 */

// Import configs
import { installationConfig } from "../../configs/index.js";

export function getWPCoreDir() {
  return installationConfig?.wordpress?.coreDir?.replace(/^\/+/, "");
}
