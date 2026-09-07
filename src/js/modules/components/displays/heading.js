/**
 * DISPLAY HEADING
 * @module components/displays/heading
 */

// Import external modules
import stringWidth from "string-width";

// Import helpers
import { c, log } from "../../utils/helpers/index.js";

/**
 * Display Heading
 *
 * Prints a boxed heading.
 */
export function displayHeading(headingText) {
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
    headingText,
  ]);
}
