/**
 * CREATE RAY.PHP FILE
 * @module commands/install/create/files/ray
 */

// Import node modules
import path from "node:path";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates a `<root>/ray.php` file.
 */
export async function createRayFile() {
  const filename = "ray.php";
  if (existsSync(path.join(rootDirPath, filename))) {
    log(c.dim(`The ${c.em(`${filename}`)} file already exists. Skipping creation.`));
    return;
  }

  log(c.detail("Creating `ray.php` file..."));

  const rayFile = path.join(`${rootDirPath}`, "ray.php");
  const rayFileContent = `<?php
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

  await writeFile(rayFile, rayFileContent);
}
