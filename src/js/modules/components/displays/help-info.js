/**
 * DISPLAY HELP INFO
 * @module components/displays/help-info
 */

// Import external dependencies
import stringWidth from "string-width";

// Import configs
import { commandsConfig, flagsConfig } from "../../configs/index.js";

// Import helpers
import { c, log, pkgJSON } from "../../utils/helpers/index.js";

/**
 * Display Help Info
 *
 * Prints the CLI help information.
 */
export function displayHelpInfo() {
  const createFormattedRowsFromConfig = (config, configType) => {
    let formattedRows = [];

    for (const [key, value] of Object.entries(config)) {
      const desc = value.description;
      let longName, shortName;

      if (configType === "flags") {
        longName = c.flag(`--${key}`);
        shortName = c.flag(`-${value.alias}`);
      } else {
        longName = c.info(key);
        shortName = c.info(value.alias);
      }

      formattedRows.push([`${shortName}, ${longName}`, desc]);
    }

    return formattedRows;
  };

  const commandRows = createFormattedRowsFromConfig(commandsConfig, "commands");
  const flagRows = createFormattedRowsFromConfig(flagsConfig, "flags");

  const exampleRows = [
    [`${c.property("npx ddev-wp")} ${c.info("install")}`, "Launches the installation wizard"],
    [
      `${c.property("npx ddev-wp")} ${c.flag("-v")}`,
      `Displays the ${c.em("ddev-wp")} version without the ${c.em("ddev-wp")} header`,
    ],
  ];

  const allRows = [...commandRows, ...flagRows, ...exampleRows];
  const columnWidth = Math.max(...allRows.map(([name]) => stringWidth(name)));
  const helpText = `${c.headingInfo(" Help Information ")}

${c.title("Purpose:")}
  ${pkgJSON.description}

${c.title("Usage:")}
  ${c.property("ddev-wp")} ${c.info("<command>")} ${c.flag("[flags]")}

${c.title("Commands:")}
${formatRows(commandRows)}

${c.title("Flags:")}
${formatRows(flagRows)}

${c.title("Examples:")}
${formatRows(exampleRows)}
`;

  function padRight(value, targetWidth) {
    const visibleWidth = stringWidth(value);
    const padding = Math.max(targetWidth - visibleWidth, 0);

    return value + " ".repeat(padding);
  }

  function formatRows(rows, indent = 2, gap = 4) {
    return rows
      .map(([name, description]) => {
        return `${" ".repeat(indent)}${padRight(name, columnWidth + gap)}${description}`;
      })
      .join("\n");
  }

  return log(helpText);
}
