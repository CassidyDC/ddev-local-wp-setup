/**
 * CLI
 * @module utils/cli
 */

// Internal modules.
import { commands } from "./commands.js";
import { displayHelp } from "./displays.js";
import { flags } from "./flags.js";
import { userCommands, userFlags } from "./helpers.js";

export async function processArgs() {
  const hasNoArguments = userCommands.length === 0 && userFlags.length === 0;
  const hasDebugFlag = checkUserFlags("debug");
  const hasHelpFlag = checkUserFlags("help");
  const hasInstallCommand = checkUserCommands("install");

  function checkUserCommands(command) {
    if (userCommands.find((commandName) => commandName === command)) return true;

    const commandAlias = commands[command].alias;
    if (userCommands.find((commandName) => commandName === commandAlias)) return true;

    return false;
  }

  function checkUserFlags(flag) {
    if (userFlags.find((flagName) => flagName === flag)) return true;

    const flagAlias = flags[flag].alias;
    if (userFlags.find((flagName) => flagName === flagAlias)) return true;

    return false;
  }

  if (hasNoArguments) return displayHelp();
  if (hasInstallCommand) return commands.install.exec();
  if (hasHelpFlag) return flags.help.exec();
  if (hasDebugFlag) return flags.debug.exec();
}
