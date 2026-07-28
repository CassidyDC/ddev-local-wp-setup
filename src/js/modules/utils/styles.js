import c from "ansi-colors";

c.theme({
  danger: c.red,
  dark: c.dim.gray,
  disabled: c.gray,
  em: c.italic,
  flag: c.yellow,
  headingInfo: c.bgBlue.bold,
  headingDebug: c.bgYellow.bold,
  headingError: c.bgRed.bold,
  info: c.cyan,
  muted: c.dim,
  primary: c.blue,
  property: c.green,
  strong: c.bold,
  success: c.green,
  title: c.bold,
  underline: c.underline,
  warn: c.yellowBright,
});

export { c };
