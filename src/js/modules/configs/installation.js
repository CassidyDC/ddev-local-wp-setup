/**
 * INSTALLATION CONFIG
 * @module configs/installation
 */

import { settingsSchema } from "./settings-schema.js";

export const installationConfig = Object.fromEntries(Object.keys(settingsSchema).map((section) => [section, {}]));
