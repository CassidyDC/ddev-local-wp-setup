/**
 * PROCESS HELPERS
 * @module utils/helpers/process
 */

// Import components
import { displayErrorInfo, displayHelpInfo } from "../../components/index.js";

// Import configs
import { commandsConfig, flagsConfig } from "../../configs/index.js";

// Import helpers
import {
  hasCommandInstall,
  hasFlagDebug,
  hasFlagHelp,
  hasFlagVersion,
  hasNoArguments,
  hasMoreThanOneCommand,
  hasNonExistingCommands,
  hasNonExistingFlags,
  userIncludedNonExistingCommands,
  userIncludedNonExistingFlags,
} from "./index.js";

export async function processArgs() {
  if (hasNoArguments) return displayHelpInfo();
  if (hasMoreThanOneCommand || hasNonExistingCommands || hasNonExistingFlags)
    return displayErrorInfo(userIncludedNonExistingCommands, userIncludedNonExistingFlags);
  if (hasCommandInstall) return commandsConfig.install.exec();
  if (hasFlagHelp) return flagsConfig.help.exec();
  if (hasFlagDebug) return flagsConfig.debug.exec();
  if (hasFlagVersion) return flagsConfig.version.exec();
}
