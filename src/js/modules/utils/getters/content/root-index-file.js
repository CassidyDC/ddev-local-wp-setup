/**
 * ROOT INDEX FILE CONTENT
 * @module utils/getters/content
 */

// Import helpers
import { getWPCoreDir } from "../../getters/index.js";

/**
 * Gets the root `index.php` file content.
 */
export function getRootIndexFileContent() {
  const wpCoreDir = getWPCoreDir();

  return `<?php

require_once __DIR__ . '/${wpCoreDir}/index.php';`;
}
