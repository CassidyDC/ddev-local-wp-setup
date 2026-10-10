/**
 * DDEV DOCKER FILE CONTENT
 * @module utils/getters/content
 */

/**
 * Gets the DDEV `Dockerfile` file content.
 */
export function getDdevDockerfileFileContent() {
  return `# Set the Composer home directory
ENV COMPOSER_HOME=/usr/local/composer/

# Install Global Ray package
RUN composer global require spatie/global-ray`;
}
