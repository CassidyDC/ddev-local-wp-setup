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
  const { adminUsername, adminEmail, adminPassword, siteTitle, siteTagline, cleanState, postnamePermalinks, homepage } =
    installationConfig.wordpress;
  const { ai1wm } = installationConfig.plugin;
  const { defaultTheme } = installationConfig.theme;
  const projectSlug = generateSlugFromName(installationConfig.ddev.projectName);

  log(`\n${c.headingInfo(" Installing WordPress ")}\n`);
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
  const tagline = siteTagline ?? "";
  const { stdout: currentTagline } = await captureCommand("ddev", ["wp", "option", "get", "blogdescription"]);
  if (currentTagline.replace(/\r?\n$/, "") !== tagline) {
    await captureCommand("ddev", ["wp", "option", "update", "blogdescription", tagline]);
    log(c.success(tagline ? `Added the site tagline: ${tagline}` : "Cleared the site tagline."));
  } else {
    log(
      c.dim(
        tagline
          ? "The site tagline is already set. Skipping update."
          : "The site tagline is already empty. Skipping update.",
      ),
    );
  }

  if (cleanState) {
    log(c.detail("Cleaning up the default WordPress content..."));
    await runCommand("ddev", [
      "wp",
      "eval",
      'update_user_meta(1, "metaboxhidden_dashboard", array("dashboard_right_now", "dashboard_activity", "dashboard_site_health", "dashboard_quick_press", "dashboard_primary"));',
    ]);
    const { stdout: welcomePanel } = await captureCommand("ddev", [
      "wp",
      "user",
      "meta",
      "get",
      "1",
      "show_welcome_panel",
    ]);
    if (welcomePanel.trim() !== "0") {
      await runCommand("ddev", ["wp", "user", "meta", "update", "1", "show_welcome_panel", "0"]);
    } else {
      log(c.dim("The welcome panel is already hidden. Skipping update."));
    }

    for (const [id, label] of [
      [1, "Hello, World post"],
      [2, "Sample Page"],
      [3, "Privacy Policy draft"],
    ]) {
      if (await commandSucceeds("ddev", ["wp", "post", "exists", String(id)])) {
        await runCommand("ddev", ["wp", "post", "delete", String(id), "--force"]);
        log(c.detail(`Deleted the default ${label}.`));
      } else {
        log(c.dim(`The default ${label} was not present. Skipping deletion.`));
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

  if (defaultTheme) {
    const { stdout: defaultThemeSlugOutput } = await captureCommand("ddev", [
      "wp",
      "eval",
      'echo array_key_last((new ReflectionClass("WP_Theme"))->getStaticPropertyValue("default_themes"));',
    ]);
    const defaultThemeSlug = defaultThemeSlugOutput.trim();
    if (!/^[a-z0-9-]+$/.test(defaultThemeSlug)) {
      throw new Error(`Could not determine the latest official default theme (received "${defaultThemeSlug}").`);
    }

    const themeIsInstalled = await commandSucceeds("ddev", ["wp", "theme", "is-installed", defaultThemeSlug]);
    if (!themeIsInstalled) {
      await runCommand("ddev", ["wp", "theme", "install", defaultThemeSlug, "--activate"]);
    } else if (await commandSucceeds("ddev", ["wp", "theme", "is-active", defaultThemeSlug])) {
      log(c.dim(`The ${defaultThemeSlug} theme is already active. Skipping installation.`));
    } else {
      await runCommand("ddev", ["wp", "theme", "activate", defaultThemeSlug]);
    }
  }

  if (ai1wm) {
    const { stdout } = await captureCommand("ddev", ["wp", "plugin", "list", "--format=json"]);
    const plugins = JSON.parse(stdout);
    const ai1wmPlugin = plugins.find((plugin) => plugin.name === "all-in-one-wp-migration");
    if (ai1wmPlugin?.status === "active") {
      log(c.dim("The All-in-One WP Migration plugin is already active. Skipping installation."));
    } else if (ai1wmPlugin) {
      await runCommand("ddev", ["wp", "plugin", "activate", "all-in-one-wp-migration"]);
    } else {
      await runCommand("ddev", ["wp", "plugin", "install", "all-in-one-wp-migration", "--activate"]);
    }
  }

  log(`\n${c.info("Opening browser to the WP Admin dashboard...")}\n`);
  await runCommand("ddev", ["launch", "wp-admin/"]);
}

function commandSucceeds(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: "ignore", shell: false });
    child.on("error", () => resolve(false));
    child.on("close", (code) => resolve(code === 0));
  });
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
