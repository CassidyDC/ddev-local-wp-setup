/**
 * INSTALL COMMAND
 * @module commands/install
 */

// Internal Modules
import { collectSetupSettings } from "../configs/settings.js";
import { displayHeader } from "../utils/displays.js";
import { installSetup } from "../utils/install-setup.js";

displayHeader();
collectSetupSettings();
installSetup();
