/**
 * VALIDATE HELPERS
 * @module utils/helpers/validate
 */

/**
 * Validates a WP Admin username
 * @param {string} value The username being validated.
 */
export function validateWPUsername(value) {
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
 * Validates a WP Admin user password
 * @param {string} value The password being validated.
 */
export function validateWPPassword(value) {
  if (!value) {
    return "Password is required.";
  }

  if (value.length < 5) {
    return "Password should be at least 5 characters.";
  }

  return true;
}

/**
 * Validates a WP Admin user email address
 * @param {string} value The email being validated.
 */
export function validateWPEmail(value) {
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
