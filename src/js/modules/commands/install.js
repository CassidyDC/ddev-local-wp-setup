/**
 * INSTALL COMMAND
 * @module commands/install
 */

import { c } from "../utils/styles.js";
import { log } from "../utils/helpers.js";

export function runInstallationWizard() {
  log(c.headingInfo(" Starting Installation Wizard... "));
  collectSetupSettings();
  installSetup();
}

async function collectSetupSettings() {}

async function installSetup() {}
