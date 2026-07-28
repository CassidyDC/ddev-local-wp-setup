/**
 * CLI
 * @module utils/cli
 */

// Internal modules.
import { commands, userIncludedNonExistingCommands } from "./commands.js";
import { displayErrorInfo, displayHelpInfo } from "./displays.js";
import { flags, userIncludedNonExistingFlags } from "./flags.js";
import { userCommands, userFlags } from "./helpers.js";

export async function processArgs() {
  const hasNoArguments = userCommands.length === 0 && userFlags.length === 0;
  const hasDebugFlag = checkUserFlags("debug");
  const hasHelpFlag = checkUserFlags("help");
  const hasVersionFlag = checkUserFlags("version");
  const hasInstallCommand = checkUserCommands("install");
  const hasMoreThanOneCommand = userCommands.length > 1;

  const hasNonExistingCommands = userIncludedNonExistingCommands.length > 0;
  const hasNonExistingFlags = userIncludedNonExistingFlags.length > 0;

  function checkUserCommands(cmdName) {
    // User included long command
    if (userCommands.find((cmd) => cmd === cmdName)) return true;

    // User included short command
    const cmdAlias = commands[cmdName].alias;
    if (userCommands.find((cmd) => cmd === cmdAlias)) return true;

    // User did not include command
    return false;
  }

  function checkUserFlags(flagName) {
    // User included long flag
    if (userFlags.find((flag) => flag.replace("--", "") === flagName)) return true;

    // User included short flag
    const flagAlias = flags[flagName].alias;
    if (userFlags.find((flag) => flag.replace("-", "") === flagAlias)) return true;

    // User did not include flag
    return false;
  }

  if (hasNoArguments) return displayHelpInfo();
  if (hasMoreThanOneCommand || hasNonExistingCommands || hasNonExistingFlags)
    return displayErrorInfo(userIncludedNonExistingCommands, userIncludedNonExistingFlags);
  if (hasInstallCommand) return commands.install.exec();
  if (hasHelpFlag) return flags.help.exec();
  if (hasDebugFlag) return flags.debug.exec();
  if (hasVersionFlag) return flags.version.exec();
}
