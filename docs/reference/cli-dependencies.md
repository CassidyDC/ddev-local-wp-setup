# Dependencies

The purpose for each dependency used in the DDEV Local WP Setup CLI:

## Ansi Colors

- [NPM Package](https://www.npmjs.com/package/ansi-colors)
- Used to colorize the CLI text, including prompts.
- Dependencies: 0

## Enquirer

- [NPM Package](https://www.npmjs.com/package/enquirer)
- Used to style the CLI question prompts.
- Dependencies: 2 [ansi-colors, strip-ansi]

## String Width

- [NPM Package](https://www.npmjs.com/package/string-width)
- Used to get the width of the widest string for creating boxes around multi-lines of text.
- Dependencies: 2 [get-east-asian-width, strip-ansi]

## Yocto Spinner

- [NPM Package](https://www.npmjs.com/package/yocto-spinner)
- Used to add a terminal loading spinner.
- Dependencies: 1 [yoctocolors]
