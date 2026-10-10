/**
 * DOCKER HELPERS
 * @module utils/helpers/docker
 */

// Import node modules
import { spawn } from "node:child_process";

/**
 * Checks whether the Docker daemon is available to the current Docker CLI context.
 * @returns {Promise<boolean>} Whether `docker info` exits successfully.
 */
export function isDockerRunning() {
  return new Promise((resolve) => {
    const child = spawn("docker", ["info"], {
      stdio: "ignore",
      shell: false,
    });

    child.on("error", () => resolve(false));
    child.on("close", (code) => resolve(code === 0));
  });
}
