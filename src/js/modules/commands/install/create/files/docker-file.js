/**
 * CREATE DOCKERFILE FILE
 * @module commands/install/create/files/docker-file
 */

// Import node modules
import path from "node:path";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates <root>/.ddev/web-build/Dockerfile.
 */
export async function createDockerfileFile() {
  const filename = ".ddev/web-build/Dockerfile";
  if (existsSync(path.join(rootDirPath, filename))) {
    log(c.dim(`The ${c.em(`${filename}`)} file already exists. Skipping creation.`));
    return;
  }

  log(c.detail("Creating `.ddev/web-build/Dockerfile` file..."));

  const dockerfileFile = path.join(`${rootDirPath}/.ddev/web-build`, "Dockerfile");
  const dockerfileFileContent = `# Set the Composer home directory
ENV COMPOSER_HOME=/usr/local/composer/

# Install Global Ray package
RUN composer global require spatie/global-ray`;

  await writeFile(dockerfileFile, dockerfileFileContent);
}
