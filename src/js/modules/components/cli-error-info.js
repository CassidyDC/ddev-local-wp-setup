/**
 * CLI ERROR INFO
 * @module components/cli-error-info
 */

// Internal Modules
import { allowedCommands } from "../utils/commands.js";
import { allowedLongFlags, allowedShortFlags } from "../utils/flags.js";
import { c } from "../utils/styles.js";
import { log, userCommands } from "../utils/helpers.js";

export function cliErrorInfo(nonExistingCommands, nonExistingFlags) {
  const errors = [];
  const allowedCmds = allowedCommands.flat().join(", ");
  const nonExistingCmds = nonExistingCommands.join(", ");
  const userCmds = userCommands.join(", ");

  // const allowedFlgs = allowedFlags.flat().join(", ");
  const nonExistingFlgs = nonExistingFlags.join(", ");

  const allAllowedFlags = () => {
    const shortFlags = [];
    const longFlags = [];

    allowedLongFlags.forEach((flag) => {
      longFlags.push(flag);
    });

    allowedShortFlags.forEach((flag) => {
      shortFlags.push(flag);
    });

    return [shortFlags, longFlags];
  };

  const allowedLongFlgs = allAllowedFlags()[1].flat().join(", ");
  const allowedShortFlgs = allAllowedFlags()[0].flat().join(", ");

  const errorsInfoText = () => {
    log(`${c.headingError(" Error Information ")}\n`);

    for (let i = 0; i < errors.length; i++) {
      const errorNumText = `Error ${i + 1}:`;
      const errorWarnText = c.danger.title(`${errorNumText} ${errors[i][0]}`);
      const errorCauseText = `  ${c.warn(errors[i][1])}`;
      const errorSolutionText = `  ${c.info(errors[i][2])}\n`;
      log(errorWarnText);
      log(errorCauseText);
      log(errorSolutionText);
    }
  };

  if (userCommands.length > 1) {
    errors.push([
      `Only one command can be used at a time.`,
      `You used ${userCommands.length} commands: ${userCmds}.`,
      `Use just one command and try again.`,
    ]);
  }

  if (nonExistingCmds.length === 1) {
    errors.push([
      `Only the following commands can be used: ${allowedCmds}.`,
      `You used the following non-existing command: ${nonExistingCmds}.`,
      `Remove that command from your prompt and try again.`,
    ]);
  } else if (nonExistingCmds.length > 1) {
    errors.push([
      `Only the following commands can be used: ${allowedCmds}.`,
      `You used the following non-existing commands: ${nonExistingCmds}.`,
      `Remove those commands from your prompt and try again.`,
    ]);
  }

  if (nonExistingFlgs.length === 1) {
    errors.push([
      `Only the following flags can be used:\nShort Flags: ${allowedShortFlgs}\nLong Flags: ${allowedLongFlgs}`,
      `You used the following non-existing flag: ${nonExistingFlgs}.`,
      `Remove that flag from your prompt and try again.`,
    ]);
  } else if (nonExistingFlgs.length > 1) {
    errors.push([
      `Only the following flags can be used:\n  Short Flags: ${allowedShortFlgs}\n  Long Flags: ${allowedLongFlgs}`,
      `You used the following non-existing flags: ${nonExistingFlgs}.`,
      `Remove those flags from your prompt and try again.`,
    ]);
  }

  return errorsInfoText();
}
