/**
 * HEADER
 * @module components/cli-header
 */

// External dependencies
import stringWidth from "string-width";

// Internal modules
import { c } from "../utils/styles.js";
import { log, pkgJSON } from "../utils/helpers.js";

export function cliHeader(clear = true) {
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

  box([
    `${c.title(pkgJSON.displayName)} ${c.muted(`v${pkgJSON.version}`)}`,
    c.muted(`By ${pkgJSON.author.name} (${c.em(pkgJSON.author.url)})`),
  ]);
}
