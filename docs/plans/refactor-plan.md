# Refactor the CLI around clear ownership and explicit state

## Summary

I would keep JavaScript and native ESM, simplify the directory structure, and separate terminal interaction from installation logic.

The biggest improvement would be removing hidden dependencies: today, shared helpers pull together argument parsing, command handlers, prompts, and mutable installation settings. Moving files alone would preserve that coupling.

The refactor would also fix confirmed defects: ignored header flags, successful exit codes for invalid commands, unvalidated saved settings, and missing debug-path handling.

## Proposed structure

```text
bin/
  ddev-wp.js                  # Executable wrapper and final error handling

src/
  cli/
    run.js                    # Parse, validate, and dispatch
    arguments.js
    definition.js             # Command/flag descriptions and aliases
    wizard.js
    ui/                       # Header, help, errors, styles, headings

  config/
    settings.js               # Field definitions, defaults, dependencies
    validation.js
    normalize.js
    store.js                  # Load, save, and back up configuration
    names.js                  # Name, slug, and namespace transformations

  install/
    run.js                    # Explicit installation sequence
    preflight.js
    filesystem.js
    composer.js
    ddev.js
    wordpress.js
    templates/                # Pure functions rendering generated files

  system/
    process.js                # Shared subprocess implementation
    paths.js                  # Project-relative path resolution

tests/
  cli/
  config/
  install/
  fixtures/

docs/
  cli.md
  architecture.md
  archive/                    # Shell implementation and old design notes
```

Remove the redundant `js/modules` nesting and broad `helpers`, `getters`, and `components/displays` categories. Use direct imports internally rather than barrel exports that obscure dependency cycles.

## Implementation changes

### CLI and execution boundaries

- Introduce an import-safe `runCli(argv, dependencies)` function. Only the executable wrapper reads process arguments, sets the exit code, and handles uncaught failures.
- Parse `process.argv.slice(2)` and normalize aliases once. Preserve all existing command and flag spellings, including `-nc` and `-nh`.
- Validate arguments first; then resolve informational actions in this order: help, version, debug, installation. No arguments displays help.
- Fix header suppression and return nonzero status for invalid arguments or installation failures. Treat explicit wizard exit and Ctrl+C as cancellation.
- Keep command descriptions separate from executable handlers so displaying help does not load the installer.

### Settings and wizard

- Replace the mutable `installationConfig` singleton with a settings object returned by the wizard and passed explicitly to installation functions.
- Keep defaults, validators, and field dependencies independent of terminal styling and Enquirer.
- Validate reused values as well as new answers. Reprompt for invalid known fields; reject malformed JSON or invalid section shapes clearly.
- Retain the configuration filename, section names, numbered backups, and password omission. Preserve unknown and deferred keys when saving, but exclude them from execution.
- Hide inactive Git, toolset, and VS Code prompts. Keep working options, and correct descriptions that promise files the installer does not create.
- Normalize optional settings before execution: disabled logging produces no log directory and sets `WP_DEBUG_LOG` to false.
- Resolve project paths centrally, reject traversal outside the project, and escape values for their output format.

### Installation and external commands

- Keep a straightforward sequence: collect settings → confirm → preflight → save settings → prepare files and Composer → configure/start DDEV → configure WordPress.
- Pass `{ rootDir, settings, runCommand, reporter }` into installation stages. Preserve sequential execution where later steps depend on earlier ones.
- Consolidate streamed, captured, and silent subprocess execution into one implementation with explicit `cwd`, exit status, and signal handling. Distinguish expected unsuccessful probes from missing executables and infrastructure failures.
- Check DDEV, Composer, and Docker before changing project files.
- Separate Composer execution from filesystem generation. Merge required Composer settings without dropping unrelated fields.
- Replace line-based YAML editing with the `yaml` document API, which supports editing comments and blank lines. Modify only installer-managed settings and hooks, retaining unrelated configuration. [YAML documentation](https://eemeli.org/yaml/)
- Make template functions accept their inputs directly; generate JSON through serialization rather than string interpolation.

### Safe reruns

- Detect installed WordPress before running core installation. Run destructive default-content cleanup only when this invocation installs WordPress.
- Preserve existing user files. If an existing bootstrap file conflicts with the selected core location, stop with an actionable explanation before modifying the installation.
- Prevent duplicate hooks, upload directories, and homepages. Preserve an existing front page and active theme; install the default theme as a fallback without replacing an existing active theme.
- Apply repeatable supported settings without resetting administrator credentials. Do not add automatic rollback of external operations.

## Validation and delivery

- Add tests with Node’s built-in test runner covering argument aliases and precedence, header suppression, exit codes, cancellation, and import safety.
- Test saved-settings validation, conditional fields, password exclusion, backup numbering, disabled debugging, and path containment.
- Use temporary directories and a fake command runner to verify fresh installs, partial installs, reruns, preserved files, and failure propagation without requiring Docker.
- Test YAML fixtures with custom hooks, comments, inline collections, CRLF, and repeated execution.
- Run lint, formatting checks, and tests in CI on Node 22.13+ and Node 24. Correct ESLint’s browser globals to Node globals.
- Update package entry points and published-file declarations; verify the packed CLI launches outside the checkout.
- Rewrite the README for the Node CLI and archive historical instructions. Remove the unused spinner dependency.
- Implement in reviewable stages—tests, module restructuring, reliability fixes, documentation/packaging—with a Git commit after each completed stage.

## Assumptions

- Preserve the package name, `ddev-wp` executable, existing aliases, and saved configuration format.
- Retain JavaScript with JSDoc at key boundaries; introduce no build step or framework.
- Defer unfinished features and hide their prompts, as selected.
- Support safe reruns without adding resume checkpoints, a new public library API, or automatic rollback.
