/**
 * HELP MENU
 * @module components/cli-help-menu
 */

// External dependencies
import stringWidth from "string-width";

// Internal Modules
import { c } from "../utils/styles.js";
import { log, pkgJSON } from "../utils/helpers.js";

export function cliHelpMenu() {
  const commands = [
    [`${c.info("i")}, ${c.info("install")}`, "Runs the DDEV Local WP Setup installer"],
  ];

  const flags = [
    [`${c.flag("-d")}, ${c.flag("--debug")}`, "Runs the debugger"],
    [`${c.flag("-h")}, ${c.flag("--help")}`, "Displays the help menu"],
    [`${c.flag("-v")}, ${c.flag("--version")}`, "Displays the version"],
    [`${c.flag("-nc")}, ${c.flag("--no-clear")}`, "Stops the clearing of the console when running the command"],
    [`${c.flag("-nh")}, ${c.flag("--no-header")}`, "Stops the display of the ddev-wp header when running the command"],
  ];

  const examples = [
    [`${c.property("npx ddev-wp")} ${c.info("install")}`, "Launches the installation wizard"],
    [`${c.property("npx ddev-wp")} ${c.flag("-v -nh")}`, "Displays the ddev-wp version without the ddev-wp header"],
  ];

  const allRows = [...commands, ...flags, ...examples];
  const columnWidth = Math.max(...allRows.map(([name]) => stringWidth(name)));

  const helpText = `${c.heading(" Help ")}

${c.title("Purpose:")}
  ${pkgJSON.description}

${c.title("Usage:")}
  ${c.property("ddev-wp")} ${c.info("<command>")} ${c.flag("[options]")}

${c.title("Commands:")}
${formatRows(commands)}

${c.title("Options:")}
${formatRows(flags)}

${c.title("Examples:")}
${formatRows(examples)}
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
