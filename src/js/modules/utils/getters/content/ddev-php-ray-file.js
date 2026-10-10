/**
 * DDEV PHP RAY FILE CONTENT
 * @module utils/getters/content
 */

/**
 * Gets the DDEV `php-ray.ini` file content.
 */
export function getDdevPhpRayFileContent() {
  return `auto_prepend_file = '/usr/local/composer/vendor/spatie/global-ray/src/scripts/global-ray-loader.php'`;
}
