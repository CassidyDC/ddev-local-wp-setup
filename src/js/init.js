#!/usr/bin/env node

/**
 * INITIALIZE SCRIPT
 */

// Import components
import { displayHeader } from "./modules/components/index.js";

// Import helpers
import { processArgs } from "./modules/utils/helpers/index.js";

displayHeader();
processArgs();
