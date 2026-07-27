#!/bin/bash

# SCRIPT USAGE
# 1. Add this script to the project DDEV server's `.dev-assets/ddev-db-backups/` directory.
# 2. Update the PROJECT_PATH constant below.
# 3. Make this script executable via the command: `chmod +x <path-to-project>/.dev-assets/ddev-db-backups/scripts/ddev-db-backup-script.sh`
# 4. Set up a macOS cron job for automatic backups:
		# 4a. Open crontab editor via command: `crontab -e`
		# 4b. Add cron to run at 11:00 PM daily with a log entry: `0 23 * * * /Users/Jacob/Projects/Software/Second-Party/Groups/Banyan/Sites/CanadaUtility.ca/Servers/~canadautility.ddev.site/.dev-assets/ddev-db-backups/scripts/ddev-db-backup-script.sh >> /Users/Jacob/Projects/Software/Second-Party/Groups/Banyan/Sites/CanadaUtility.ca/Servers/~canadautility.ddev.site/.dev-assets/ddev-db-backups/logs/ddev-db-backup.log`
		# 4c. Check scheduled cron jobs: crontab -l
		# 4d. Check launchd jobs: launchctl list | grep ddev

PROJECT_PATH="/Users/Jacob/Projects/Software/Second-Party/Groups/Banyan/Sites/CanadaUtility.ca/Servers/~canadautility.ddev.site"
BACKUP_PATH="${PROJECT_PATH}/.dev-assets/ddev-db-backups"

# === Settings ===
DATE=$(date +%Y-%m-%d-%H%M%S)
FILENAME_PREFIX="dev-db-backup-"
FILENAME="${FILENAME_PREFIX}${DATE}.sql.gz"
DEST="$BACKUP_PATH/$FILENAME"

mkdir -p "$BACKUP_PATH"

printf "[$(date)] Backing up DDEV DB from $PROJECT_PATH\n\n"

# Export database
(cd "$PROJECT_PATH" && PATH="/opt/homebrew/bin:/usr/local/bin:$PATH" /opt/homebrew/bin/ddev export-db --file="$DEST")

# Keep only the 2 most recent backups (delete older ones)
ls -1t "$BACKUP_PATH/$FILENAME_PREFIX"*.sql.gz | tail -n +3 | xargs -r rm -f
