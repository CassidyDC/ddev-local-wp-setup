# API

## Commands

- `install`: Runs the installation wizard that walks the user through the install options with a final confirmation of the options at the end before the installation runs.

## Flags

- `--debug`, `-d`: Shows the CLI details for debugging issues (used for CLI development).
- `--help`, `-h`: Show the help menu with the CLI commands, flags, and options.
- `--version`, `-v`: Shows the CLI version without the CLI header.
- `--no-header`, `-nh`: Runs the command without a CLI header.
- `--no-clear`, `-nc`: Runs the command without clearing the console.

## Installation Wizard

Note: make sure you are running this wizard from the directory you want to install your local DDEV server in. (You are currently in `xxx`). If that is not where you want to be, type "exit" then press enter, and restart the wizard from the correct directory.

This wizard will walk you through the following settings:

1. DDEV Server Settings
2. WordPress Core Settings
3. WordPress Admin Settings
4. Project Settings
5. Development Config Settings

You will have a chance to review and finalize the settings before the installation runs.

Press ENTER to continue...

### DDEV Server Settings

1. Set your DDEV project name: (leave blank to use the current directory for the name, minus any leading non-alphanumeric characters and trailing ".ddev.site")

2. Use localhost to resolve your project's domain? (Y/n) (If no is selected, your project's domain will be resolved via DNS. If localhost is used, the project domain will be added to your OS "hosts" file, which requires permission to edit.)

3. Add DDEV server connection files for Spatie Ray app? (Y/n) (Enter "no" if you don't use the Spatie Ray app.)

### WordPress Core Settings

1. Install WordPress Core at the server root or in its own directory (such as `/wordpress`)? (Root/Directory)
   - Set your WP Core directory: (defaults to `/wordpress`):

2. Remove all default pages, posts, comments, plugins, and widgets from the WordPress install for a blank starting state? (Y/n)

3. Include the default WordPress theme? (Y/n) (Recommended as a fallback theme.)

4. Set WP permalinks to use `%%postname%%`? (Y/n) (If no, permalinks will use the default date format)

5. Enable WordPress debugging? (Y/n)

6. Hide debugging display? (Y/n)

7. Log debugging output to a file? (Y/n)

8. Where do you want to store the log file? (Enter a path relative from your project's root, or leave blank to use `/wp-content/logs/wp-errors.log`). (Y/n)

9. Enable script debugging too? (Y/n)

### WordPress Admin Settings

1. Set your WP Admin username: (defaults to `admin`)

2. Set your WP Admin password: (defaults to `password`)

3. Set your WP Admin email address: (defaults to `info@xxx.ddev.site`)

4. Set your WP site title: (leave blank to use the DDEV project name)

5. Set your WP site tagname: (leave blank if a tagname is not desired)

### Project Settings

1. Are you developing a WordPress Theme, Plugin, or both? [(T)heme, (P)lugin, (B)oth]
   - Create a new custom theme/plugin directory? (Y/n)
     - Set your custom theme/plugin slug (use only lowercase letter, digits, and dashes, such as `cassidydc-block-theme`)?
     - Use the CassidyDC Starter Block Theme files for your new theme? (Y/n)
     - Use the CassidyDC Dev WP Theme/Plugin Toolset for your new theme/plugin? (Y/n)

2. Add a non-blog homepage? (Y/n) (If no, the front page will be the default blog.)

3. Install the All-in-One WP Migration plugin? (Y/n)

4. Set your WP_ENVIRONMENT_TYPE: (0 = leave unset, 1 = local, 2 = development, 3 = staging, 4 = production) (Defaults to `local`.) (See: [WordPress Environment Types](https://make.wordpress.org/core/2020/08/27/wordpress-environment-types/))

5. Set your WP_DEVELOPMENT_MODE: (0 = leave unset, 1 = theme, 2 = plugin, 3 = core, 4 = all) (Defaults to what you selected as your project settings) (See: [Configuring Development Mode in 6.3](https://make.wordpress.org/core/2023/07/14/configuring-development-mode-in-6-3/))

### Development Config Settings

1. Initialize a local git repo and .gitignore file for `/wp-content`? (Y/n)
2. Add the CassidyDC Dev WP Toolset to `/wp-content`? (Y/n)
3. Add the CassidyDC VSCode workspace settings file? (Y/n)
4. Add the CassidyDC VSCode recommended extensions file? (Y/n)
