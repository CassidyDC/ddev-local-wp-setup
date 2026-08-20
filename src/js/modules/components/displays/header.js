/**
 * DISPLAY HEADER
 * @module components/displays/header
 */

// Import external modules
import stringWidth from "string-width";

// Import utils
import { c, log, pkgJSON, hasFlagNoClear, hasFlagNoHeader, hasVersionFlagOnly } from "../../utils/helpers/index.js";

/**
 * Display CLI Header
 *
 * Prints the header, unless the user included the `no-header` or `version` flags.
 */
export function displayHeader() {
  const clear = !hasFlagNoClear;
  if (!hasFlagNoHeader && !hasVersionFlagOnly) cliHeader(clear);
  else if (clear && !hasVersionFlagOnly) console.clear();
}

function cliHeader(clear = true) {
  if (clear) console.clear();

  const box = (lines) => {
    const width = Math.max(...lines.map(stringWidth));

    log(`┌${"─".repeat(width + 2)}┐`);

    for (const line of lines) {
      const padding = width - stringWidth(line);
      log(`│ ${line}${" ".repeat(padding)} │`);
    }

    log(`└${"─".repeat(width + 2)}┘`);
  };

  return box([
    `${c.title(pkgJSON.displayName)} ${c.muted(`v${pkgJSON.version}`)}`,
    c.muted(`By ${pkgJSON.author.name} (${c.em(pkgJSON.author.url)})`),
  ]);
}
