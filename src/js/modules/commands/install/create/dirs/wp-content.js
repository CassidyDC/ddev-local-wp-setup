/**
 * CREATE WP-CONTENT DIRECTORIES
 * @module commands/install/create/dirs/wp-content
 */

export async function createWPContentDirs(dirPath) {
  // - Create <root>/wp-content directory
  // - Create <root>/wp-content/plugins directory
  // - Create <root>/wp-content/themes directory
  // - Create any custom theme or plugin directories, such as <root/wp-content/themes/cassidydc-block-theme
  // - Add custom block theme starter files if requested
  console.log(dirPath);
}
