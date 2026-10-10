/**
 * ROOT RAY FILE CONTENT
 * @module utils/getters/content
 */

// Import helpers
import { rootDirPath } from "../../helpers/index.js";

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
