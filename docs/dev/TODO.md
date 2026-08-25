# Todos

[] Complete displayAlert() component

[] Add the following config to the ddev .config file for the Mutagen performance:

````yaml
    - wp-content/ai1wm-backups
    - wp-content/node_modules
    - wp-content/themes/<theme-name>/node_modules
    - wp-content/updrafts
    - wp-content/uploads
    - wp-content/vendor
    ```
````

[] Add option to set dns check to false: `use_dns_when_possible: false` in config (for better offline connectivity without DNS issues)

[] CONTINUE: connect the promptConfigResults to /configs/installation.js, add a final review for the user that so they an see all settings at once and edit any of them, then confirm to run the installer.
[] Once the configure is finalized, add a ddev-local-wp-setup.config file to wp-content that can be used to create the same setup on other machines.
[] Add a parser that can take a prefilled config file and run the installer.
