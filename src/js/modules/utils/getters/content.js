/**
 * FILES CONTENT
 * @module utils/getters/content
 */

// Import configs
import { installationConfig } from "../../configs/index.js";

// Import helpers
import { rootDirPath } from "../helpers/index.js";

/**
 * Gets the DDEV `Dockerfile` file content.
 */
export function getDdevDockerfileFileContent() {
  return `# Set the Composer home directory
ENV COMPOSER_HOME=/usr/local/composer/

# Install Global Ray package
RUN composer global require spatie/global-ray`;
}

/**
 * Gets the DDEV `php-ray.ini` file content.
 */
export function getDdevPhpRayFileContent() {
  return `auto_prepend_file = '/usr/local/composer/vendor/spatie/global-ray/src/scripts/global-ray-loader.php'`;
}

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

/**
 * Gets the root `index.php` file content.
 */
export function getRootIndexFileContent() {
  const wpCoreDir = getWPCoreDir();

  return `<?php

require_once __DIR__ . '/${wpCoreDir}/index.php';`;
}

/**
 * Gets the root `ray.php` file content.
 */
export function getRootRayFileContent() {
  return `<?php
  /**
   * Global Ray package settings for communicating between Docker server and Ray desktop app
   *
   * @package Global Ray
   */

  return [

    /*
     * This settings controls whether data should be sent to Ray.
     */
    'enable'      => true,

    /*
     * The host used to communicate with the Ray app.
     */
    'host'        => 'host.docker.internal',

    /*
     * The port number used to communicate with the Ray app.
     */
    'port'        => 23517,

    /*
     * Absolute base path for your sites or projects in Homestead, Vagrant, Docker, or another remote development server.
     */
    'remote_path' => 'var/www/html',

    /*
     * Absolute base path for your sites or projects on your local computer where your IDE or code editor is running on.
     */
    'local_path'  => '${rootDirPath}',
  ];
  `;
}

/**
 * Gets the root `wp-cli.php` file content.
 */
export function getRootWPCliFileContent() {
  const wpCoreDir = getWPCoreDir();

  return `path: ${wpCoreDir}`;
}

function getWPCoreDir() {
  return installationConfig?.wordpress?.coreDir.replace(/^\/+/, "");
}
