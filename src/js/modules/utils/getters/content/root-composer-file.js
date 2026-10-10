/**
 * ROOT COMPOSER FILE CONTENT
 * @module utils/getters/content
 */

// Import helpers
import { getWPCoreDir } from "../../getters/index.js";

/**
 * Gets the root `composer.json` file content.
 */
export function getRootComposerFileContent() {
  const wpCoreDir = getWPCoreDir();

  return `{
  "name": "cassidydc/ddev-local-wp-setup",
  "description": "CassidyDC default local development WordPress server setup with DDEV.",
  "version": "1.0.0",
  "keywords": [
    "ddev",
    "docker",
    "local development",
    "wordpress",
    "wp"
  ],
  "homepage": "https://github.com/CassidyDC/ddev-local-wp-setup/blob/main/README.md",
  "license": "MIT",
  "authors": [
    {
      "name": "CassidyDC",
      "email": "info@cassidydc.com",
      "homepage": "https://cassidydc.com"
    }
  ],
  "require": {
    "php": ">=8.4"
  },
  "support": {
    "issues": "https://github.com/CassidyDC/ddev-local-wp-setup/issues"
  },
  "extra": {
    "wordpress-install-dir": "${wpCoreDir}"
  }
}`;
}
