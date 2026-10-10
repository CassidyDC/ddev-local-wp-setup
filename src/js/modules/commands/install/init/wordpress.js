/**
 * INIT WP SETUP
 * @module commands/install/init/wordpress
 */

// Import configs
import { installationConfig } from "../../../configs/index.js";
import { spawn } from "node:child_process";
import { c, generateSlugFromName, log, runCommand } from "../../../utils/helpers/index.js";

/**
 * Runs the shell commands to install the local DDEV WordPress development server setup.
 */
export async function initWordPress() {
  console.log("Running initWordPress()");

  const { adminUsername, adminEmail, adminPassword, siteTitle, cleanState, postnamePermalinks, homepage } =
    installationConfig.wordpress;
  const { ai1wm } = installationConfig.plugin;
  const { defaultTheme } = installationConfig.theme;
  const projectSlug = generateSlugFromName(installationConfig.ddev.projectName);

  log(c.headingInfo(" Installing WordPress "));
  await runCommand("ddev", [
    "wp",
    "core",
    "install",
    `--url=https://${projectSlug}.ddev.site`,
    `--title=${siteTitle}`,
    `--admin_user=${adminUsername}`,
    `--admin_password=${adminPassword}`,
    `--admin_email=${adminEmail}`,
  ]);

  if (cleanState) {
    log(c.detail("Cleaning the default WordPress content..."));
    await runCommand("ddev", [
      "wp",
      "eval",
      'update_user_meta(1, "metaboxhidden_dashboard", array("dashboard_right_now", "dashboard_activity", "dashboard_site_health", "dashboard_quick_press", "dashboard_primary"));',
    ]);
    await runCommand("ddev", ["wp", "user", "meta", "update", "1", "show_welcome_panel", "0"]);

    for (const [id, label] of [
      [1, "Hello, World post"],
      [2, "Sample Page"],
      [3, "Privacy Policy draft"],
    ]) {
      try {
        await runCommand("ddev", ["wp", "post", "delete", String(id), "--force"]);
        log(c.detail(`Deleted the default ${label}.`));
      } catch {
        log(c.detail(`Default ${label} was not present; skipping deletion.`));
      }
    }
  }

  if (postnamePermalinks) {
    try {
      const { stdout } = await captureCommand("ddev", ["wp", "option", "get", "permalink_structure"]);
      if (stdout.trim() !== "/%postname%") {
        await runCommand("ddev", ["wp", "rewrite", "structure", "/%postname%"]);
      }
    } catch {
      await runCommand("ddev", ["wp", "rewrite", "structure", "/%postname%"]);
    }
  }

  if (homepage) {
    const { stdout } = await captureCommand("ddev", ["wp", "option", "get", "show_on_front"]);
    if (stdout.trim() !== "page") {
      const { stdout: homepageId } = await captureCommand("ddev", [
        "wp",
        "post",
        "create",
        "--post_type=page",
        "--post_title=Homepage",
        "--post_author=1",
        "--post_status=publish",
        "--post_content=<!-- wp:paragraph --><p>This is the homepage.</p><!-- /wp:paragraph -->",
        "--porcelain",
      ]);
      await runCommand("ddev", ["wp", "option", "update", "show_on_front", "page"]);
      await runCommand("ddev", ["wp", "option", "update", "page_on_front", homepageId.trim()]);
    }
  }

  if (!defaultTheme) {
    const { stdout } = await captureCommand("ddev", ["wp", "theme", "list", "--status=inactive", "--field=name"]);
    const bundledDefaultTheme = stdout
      .split(/\r?\n/)
      .map((name) => name.trim())
      .find((name) => /^twentytwenty(?:[0-9]{2})$/.test(name));
    if (bundledDefaultTheme) {
      await runCommand("ddev", ["wp", "theme", "delete", bundledDefaultTheme]);
    }
  }

  if (ai1wm) {
    try {
      await runCommand("ddev", ["wp", "plugin", "is-installed", "all-in-one-wp-migration"]);
      log(c.detail("All-in-One WP Migration is already installed; skipping installation."));
    } catch {
      await runCommand("ddev", ["wp", "plugin", "install", "all-in-one-wp-migration", "--activate"]);
    }
  }
}

function captureCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["inherit", "pipe", "inherit"], shell: false });
    let stdout = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => {
      stdout += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve({ stdout }) : reject(new Error(`${command} exited with code ${code}`)),
    );
  });
}
