# PROGRAM STEPS

<!-- CLEAN UP AND REMOVE -->

1. Download `cli-ddev-local-wp-setup` node module and `cli-toolset-dev-wp` node module dependency with `npm i -D cli-ddev-local-wp-setup`
2. Run prompts to set project details (see [prompts](#prompts)).
3. Run `ddev config --project-type=wordpress --project-name=$PROJECT_NAME_SLUG`
   - Creates `.ddev` directory, `wp-config-ddev.php`, and `wp-config.php`.
4. Create file: `.ddev/php/php-ray.ini`.
5. Create file: `.ddev/web-build/Dockerfile` for installing Composer and spatie/global-ray package on local ddev server.
6. Create file: `ray.php`.
7. Add WP debugging and development configurations post-start hook to `.ddev/config.yaml` file.
8. Create `logs` directory.
9. Initialize Git.
10. Add development configuration files:
    - `.vscode/settings.json`
    - `.vscode/extensions.json`
    - `/patches/`
    - `.gitignore`
    - `composer.json`
    - `phpcs.xml`
    - `phpstan.neon`
    - `package.json`
    - `.editorconfig`
    - `.markdownlint-cli2.jsonc`
    - `.markdownlint.jsonc`
    - `.prettierignore`
    - `eslint.config.mjs`
    - `prettier.config.mjs`
    - `stylelint.config.mjs`
    - `webpack.config.mjs`
    - `README.md`
    - `CHANGELOG.md`
    - `LICENSE`
11. Run `ddev start`.
    - Creates `wp-content/uploads` directory.
12. Download WordPress
13. Install WordPress without themes or plugins.
14. Install default WordPress theme.
15. Install and activate CassidyDC starter block theme.
16. Install All-In-One Migration plugin.
17. Install Query Monitor plugin.
18. Set WP permalinks to use '%%postname%%'.
19. Hide default WordPress dashboard widgets.
20. Hide default WordPress welcome panel.
21. Delete Hello World post.
22. Delete Sample Page.
23. Delete Privacy Policy draft page.
24. Create a 'Homepage' page and set it to be the sites front page.
25. Opening default browser to the WP Admin dashboard.

## PROMPTS

1. Start your project:
   1. Enter a project name: (leave blank to use the current directory name, minus any leading non-alphanumeric characters and trailing ".ddev.site"). -- or ddev TLD
2. Create your WP Admin user:
   1. Enter a username:
   2. Enter a password:
   3. Enter an email address:
3. Configure your setup:
   - Do you want to customize other project settings? (y/n) (If "n", your project will be created with the default ddev-wp configurations.)
     1. Choose your themes:
        1. Install the default WordPress Theme? (y/n) (Recommended as a fallback theme.)
        2. Install the CassidyDC WP Starter Block Theme? (y/n)
     2. Choose your plugins:
        1. Remove the default WordPress plugins? (y/n) (Recommended for a cleaner install.)
        2. Install the All-in-One WP Migration plugin? (y/n)
        3. Install the Query Monitor plugin? (y/n)
     3. Choose your debugging settings:
        1. Add WordPress debugging? (y/n) (If "y", you will be prompted with follow up questions.)
           1. Hide the debugging output from the frontend? (y/n)
           2. Log debugging output to a file? (y/n)
              - Where do you want to store the log file? (Enter a path relative from your project's root, or leave blank to use `logs/wp-errors.log`).
           3. Enable script debugging? (y/n)
     4. Choose your development settings:
        1. Set your WP_ENVIRONMENT_TYPE: (0 = leave unset, 1 = local, 2 = development, 3 = staging, 4 = production) (If you're not sure, choose 1 for 'local'. See: [WordPress Environment Types](https://make.wordpress.org/core/2020/08/27/wordpress-environment-types/)
        2. Set your WP_DEVELOPMENT_MODE: (0 = leave unset, 1 = theme, 2 = plugin, 3 = core, 4 = all) (See: [Configuring Development Mode](https://make.wordpress.org/core/2023/07/14/configuring-development-mode-in-6-3/))
     5. Choose your initial WordPress setup:
        1. Hide the default WP Admin dashboard widgets for your user? (y/n)
        2. Remove default posts, pages, and comments? (y/n)
        3. Customize your site title? (y/n) (Leave blank to use the project name, minus any hyphens or underscores.)
     6. Choose your dev tools:
        1. Add dev tools? (y/n) (If "y", you will be prompted with follow up questions.)
           1. Add `@wordpress/scripts` package? (y/n) (Recommended for building source files.)
           2. Add Spatie Ray local server connection files? (y/n) (See:[Spatie Ray](https://myray.app))
           3. Add VSCode workspace settings file? (y/n)
           4. Add VSCode recommended extensions file? (y/n)
           5. Add .gitignore file? (y/n)
           6. Initialize a local Git repo? (y/n)
           7. Add PHPStan files? (y/n)
           8. Add Stylelint files? (y/n)
           9. Add ESLint files? (y/n)
           10. Add Prettier files? (y/n)
