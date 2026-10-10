/**
 * INIT DDEV
 * @module commands/install/init-ddev
 */

// Import node modules
import { readFile, writeFile } from "node:fs/promises";

// Import configs
import { installationConfig } from "../../../configs/index.js";

// Import helpers
import { c, generateSlugFromName, log, rootDirPath, runCommand } from "../../../utils/helpers/index.js";

/**
 * Initializes the local DDEV server.
 */
export async function initDDEV() {
  log(`\n${c.headingInfo(" Setting up the DDEV Server ")}\n`);

  const projectName = installationConfig.ddev.projectName;
  const projectSlug = generateSlugFromName(projectName);

  // Set up DDEV config.
  await runCommand("ddev", [
    "config",
    "--project-type=wordpress",
    `--project-name=${projectSlug}`,
  ]);

  await createDDEVHooks();
  await updateDDEVDNS();
  await addDDEVUploadDirs();
  await runCommand("ddev", ["start"]);
}

/**
 * Adds upload directories to the DDEV configuration file.
 */
async function addDDEVUploadDirs() {
  const directories = [
    "wp-content/ai1wm-backups",
    "wp-content/node_modules",
    "wp-content/updrafts",
    "wp-content/uploads",
    "wp-content/vendor",
  ];
  const customThemeSlug = installationConfig.theme.customSlug;
  const customPluginSlug = installationConfig.plugin.customSlug;

  if (customThemeSlug) directories.push(`wp-content/themes/${customThemeSlug}/node_modules`);
  if (customPluginSlug) directories.push(`wp-content/plugins/${customPluginSlug}/node_modules`);

  const ddevConfigFilePath = `${rootDirPath}/.ddev/config.yaml`;
  const content = await readFile(ddevConfigFilePath, "utf8");
  const newline = content.includes("\r\n") ? "\r\n" : "\n";
  const lines = content.split(/\r?\n/);
  const uploadDirsIndex = lines.findIndex((line) => /^upload_dirs:\s*(?:#.*)?$/.test(line));

  if (uploadDirsIndex === -1) {
    while (lines.at(-1) === "") lines.pop();
    lines.push("upload_dirs:", ...directories.map((directory) => `    - ${directory}`));
  } else {
    let uploadDirsEnd = uploadDirsIndex + 1;
    while (uploadDirsEnd < lines.length && !/^[^\s#]/.test(lines[uploadDirsEnd])) uploadDirsEnd++;

    const existingDirectories = new Set(
      lines
        .slice(uploadDirsIndex + 1, uploadDirsEnd)
        .map((line) => line.match(/^\s*-\s*(.*?)\s*(?:#.*)?$/)?.[1])
        .filter(Boolean),
    );
    const additions = directories
      .filter((directory) => !existingDirectories.has(directory))
      .map((directory) => `    - ${directory}`);
    lines.splice(uploadDirsEnd, 0, ...additions);
  }

  await writeFile(ddevConfigFilePath, lines.join(newline).replace(/(?:\r?\n)*$/, newline), "utf8");
}

/**
 * Adds post-start hooks to the DDEV configuration file for setting WordPress constants.
 */
async function createDDEVHooks() {
  const ddevConfigFilename = ".ddev/config.yaml";
  const ddevConfigFilePath = `${rootDirPath}/${ddevConfigFilename}`;
  const execHook = "- exec:";
  const sleepHook = `${execHook} sleep 2`;

  const hooks = {
    WP_CONTENT_DIR: "__DIR__ . '/wp-content'",
    WP_CONTENT_URL: "getenv( 'DDEV_PRIMARY_URL' ) . '/wp-content'",
    WP_DEBUG: installationConfig.wordpress?.debug,
    WP_DEBUG_DISPLAY: !installationConfig.wordpress?.debugDisplayHidden,
    WP_DEBUG_LOG: `__DIR__ . '${installationConfig.wordpress?.debugLogPath}'`,
    WP_DEVELOPMENT_MODE: installationConfig.wordpress?.wpDevMode,
    WP_ENVIRONMENT_TYPE: installationConfig.wordpress?.wpEnvType,
    SCRIPT_DEBUG: installationConfig.wordpress?.debugScript,
  };

  log(c.detail(`\nAdding ${c.em(ddevConfigFilename)} post-start hooks...\n`));

  const content = await readFile(ddevConfigFilePath, "utf8");
  const newline = content.includes("\r\n") ? "\r\n" : "\n";
  const lines = content.split(/\r?\n/);
  const hookCommands = Object.entries(hooks)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      const normalizedValue =
        key === "WP_DEVELOPMENT_MODE" || key === "WP_ENVIRONMENT_TYPE"
          ? `'${String(value).toLowerCase()}'`
          : typeof value === "boolean"
            ? String(value).toLowerCase()
            : String(value);
      return `wp config set ${key} ${JSON.stringify(normalizedValue)} --raw`;
    });

  let hooksIndex = lines.findIndex((line) => /^hooks:(?:\s*(?:#.*)?)?$/.test(line));
  if (hooksIndex === -1 && lines.some((line) => /^hooks:/.test(line))) {
    throw new Error(`Expected a block-style hooks section in ${ddevConfigFilePath}.`);
  }
  if (hooksIndex === -1) {
    while (lines.at(-1) === "") lines.pop();
    hooksIndex = lines.push("hooks:") - 1;
  }

  let hooksEnd = hooksIndex + 1;
  while (hooksEnd < lines.length && !/^[^\s#]/.test(lines[hooksEnd])) hooksEnd++;
  const hooksLines = lines.slice(hooksIndex + 1, hooksEnd);
  const hooksIndent = "    ";
  let postStartIndex = hooksLines.findIndex((line) => /^\s*post-start:\s*(?:#.*)?$/.test(line));

  if (postStartIndex === -1) {
    const additions = [`${hooksIndent}post-start:`];
    additions.push(`${hooksIndent}    ${sleepHook}`);
    for (const command of hookCommands) {
      additions.push(`${hooksIndent}    ${execHook} ${command}`);
    }
    lines.splice(hooksEnd, 0, ...additions);
  } else {
    const postStartIndent = hooksLines[postStartIndex].match(/^\s*/)[0];
    const commandIndent = `${postStartIndent}    `;
    let sectionStart = hooksIndex + 1 + postStartIndex;
    let sectionEnd = sectionStart + 1;
    while (sectionEnd < hooksEnd && /^\s+-/.test(lines[sectionEnd])) sectionEnd++;

    const generated = new Set(hookCommands);
    const existing = lines.slice(sectionStart + 1, sectionEnd);
    const retained = existing.filter((line) => {
      const match = line.match(/^\s*- exec:\s*(?:["'](.*)["']|(.*))\s*$/);
      if (!match) return true;
      let command = match[1] ?? match[2];
      try {
        command = JSON.parse(command);
      } catch {
        // Ignore malformed command output while checking for existing hooks.
      }
      if (command === "sleep 2") return false;
      return ![...generated].some((generatedCommand) => {
        const key = generatedCommand.match(/^wp config set ([^ ]+)/)?.[1];
        return key && command.startsWith(`wp config set ${key} `);
      });
    });
    const replacementLines = [
      `${commandIndent}${sleepHook}`,
      ...retained,
      ...hookCommands.map((command) => `${commandIndent}${execHook} ${command}`),
    ];
    lines.splice(sectionStart + 1, sectionEnd - sectionStart - 1, ...replacementLines);
  }

  await writeFile(ddevConfigFilePath, lines.join(newline).replace(/(?:\r?\n)*$/, newline), "utf8");
}

async function updateDDEVDNS() {
  if (!installationConfig.ddev.localhost) return;

  const ddevConfigFilePath = `${rootDirPath}/.ddev/config.yaml`;
  const content = await readFile(ddevConfigFilePath, "utf8");
  const newline = content.includes("\r\n") ? "\r\n" : "\n";
  const lines = content.split(/\r?\n/);
  const dnsSettingIndex = lines.findIndex((line) => /^use_dns_when_possible\s*:/.test(line));

  if (dnsSettingIndex === -1) {
    while (lines.at(-1) === "") lines.pop();
    lines.push("use_dns_when_possible: false");
  } else {
    lines[dnsSettingIndex] = lines[dnsSettingIndex].replace(
      /^(\s*use_dns_when_possible\s*:\s*).*(\s*(?:#.*)?)$/,
      "$1false$2",
    );
  }

  await writeFile(ddevConfigFilePath, lines.join(newline).replace(/(?:\r?\n)*$/, newline), "utf8");
}
