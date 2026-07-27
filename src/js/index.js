#!/usr/bin/env node

// Internal modules
import { displayHeader } from "./modules/utils/displays.js";
import { processArgs } from "./modules/utils/cli.js";

displayHeader();
processArgs();
