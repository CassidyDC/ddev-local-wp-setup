/**
 * VALIDATE HELPERS
 * @module utils/helpers/validate
 */

export function validateDirSlug(value) {
  const slug = value.trim();

  if (!slug) {
    return "Directory slug is required.";
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return "Directory slug can only contain lowercase letters, digits, and dashes.";
  }

  return true;
}

/**
 * Validates the log file path
 * @param {string} value The path being validated.
 */
export function validateLogPath(value) {
  const logPath = value.trim();

  if (!logPath.startsWith("/")) return 'Path must start with a "/"';
  if (!logPath.endsWith(".log")) return 'Path must end with the ".log" filename extension';

  return true;
}

export function validateNamespace(value) {
  const namespace = value.trim();

  if (!/^[A-Z]/.test(namespace)) return "Namespace must start with a capitalized letter character.";

  if (!/^[A-Z][A-Za-z0-9_\\]*$/.test(namespace)) {
    return "Namespace may only contain letters, digits, underscores, and backward slashes.";
  }

  return true;
}

/**
 * Validates a WP Admin user email address
 * @param {string} value The email being validated.
 */
export function validateWPAdminEmail(value) {
  const email = value.trim();

  if (!email) {
    return "Email is required.";
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!valid) {
    return "Enter a valid email address.";
  }

  return true;
}

/**
 * Validates a WP Admin user password
 * @param {string} value The password being validated.
 */
export function validateWPAdminPassword(value) {
  if (!value) {
    return "Password is required.";
  }

  if (value.length < 5) {
    return "Password should be at least 5 characters.";
  }

  return true;
}

/**
 * Validates a WP Admin username
 * @param {string} value The username being validated.
 */
export function validateWPAdminUsername(value) {
  const username = value.trim();

  if (!username) {
    return "Username is required.";
  }

  if (username.length > 60) {
    return "Username must be 60 characters or fewer.";
  }

  if (!/^[a-z0-9 _.\-@]+$/i.test(username)) {
    return "Username can only contain letters, numbers, spaces, _, ., -, and @.";
  }

  return true;
}

/**
 * Validates the WP Core directory
 * @param {string} value The directory being validated.
 */
export function validateWPCoreDir(value) {
  const coreDir = value.trim();

  if (!coreDir.startsWith("/")) {
    return 'Path must start with a "/"';
  }

  if (coreDir === "/" || !/\/[a-z0-9]/i.test(coreDir)) {
    return "You must enter a directory to use. WP Core cannot be installed to the root directory using Composer.";
  }

  return true;
}
