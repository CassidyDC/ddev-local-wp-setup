/**
 * STYLE HELPERS
 * @module utils/helpers/styles
 */

// Import external modules
import c from "ansi-colors";

/**
 * Colorizes output
 */
c.theme({
  danger: c.red,
  dark: c.dim.gray,
  detail: c.blue,
  disabled: c.gray,
  em: c.italic,
  flag: c.yellow,
  headingDebug: c.bgYellow.bold,
  headingError: c.bgRed.bold,
  headingInfo: c.bgBlue.bold,
  info: c.cyan,
  muted: c.dim,
  property: c.green,
  strong: c.bold,
  success: c.green,
  title: c.bold,
  underline: c.underline,
  warn: c.yellowBright,
});

export { c };
