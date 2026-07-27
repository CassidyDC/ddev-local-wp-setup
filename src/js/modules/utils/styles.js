import c from "ansi-colors";

c.theme({
  danger: c.red,
  dark: c.dim.gray,
  disabled: c.gray,
  em: c.italic,
  error: c.bgRed,
  flag: c.yellow,
  heading: c.bgBlue,
  info: c.cyan,
  muted: c.dim,
  primary: c.blue,
  property: c.green,
  strong: c.bold,
  success: c.green,
  title: c.bold,
  underline: c.underline,
  warning: c.yellowBright,
});

export { c };
