/**
 * PROMPTS
 * @module utils/helpers/prompts
 */

import pkg from "enquirer";
import { installationConfig, settingsSchema } from "../../configs/index.js";
import { c, log } from "./index.js";

const { prompt } = pkg;

/**
 * Collect answers sequentially so defaults and conditions can use earlier answers.
 *
 * @returns {Promise<object>} The installation configuration with the user's responses.
 */
export async function cliPrompts() {
  const headings = {
    ddev: "DDEV Settings",
    wordpress: "WordPress Settings",
    plugin: "Plugin Settings",
    theme: "Theme Settings",
    devConfig: "Development Config Settings",
  };

  for (const section of Object.keys(settingsSchema)) {
    installationConfig[section] = {};
  }

  for (const [section, settings] of Object.entries(settingsSchema)) {
    log(`\n${c.headingInfo(` ${headings[section]} `)}\n`);

    for (const [name, setting] of Object.entries(settings)) {
      const { enabled = true, initial, ...options } = setting;
      const isEnabled = typeof enabled === "function" ? enabled(installationConfig) : enabled;
      if (!isEnabled) continue;

      const resolvedInitial = typeof initial === "function" ? initial(installationConfig) : initial;
      const answer = await prompt({ ...options, name, initial: resolvedInitial });
      installationConfig[section][name] = answer[name];
    }
  }

  return installationConfig;
}
