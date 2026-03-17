# AuthPress CLI User Guide

This guide provides detailed instructions for using AuthPress WP-CLI commands to manage logs and login redirects.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Logs Commands](#logs-commands)
- [Login Redirects Commands](#login-redirects-commands)
- [Common Workflows](#common-workflows)
- [Tips and Best Practices](#tips-and-best-practices)

## Prerequisites

Before using AuthPress CLI commands, ensure you have:

1. **WP-CLI installed** - Verify installation:
   ```bash
   wp --version
   ```

2. **AuthPress plugin activated** - The plugin must be active for CLI commands to work

3. **Database tables created** - Tables are automatically created on plugin activation

4. **Appropriate permissions** - You'll need file system and database permissions

## Logs Commands

### seed_logs

Seed the logs table with sample data for testing and development.

#### Usage

```bash
wp authpress seed_logs [--count=<number>]
```

#### Parameters

- `--count=<number>` - Number of log entries to create (default: 10)

#### Examples

**Create 10 log entries (default)**
```bash
wp authpress seed_logs
```

**Create 50 log entries**
```bash
wp authpress seed_logs --count=50
```

**Create 100 log entries**
```bash
wp authpress seed_logs --count=100
```

#### Output

The command displays:
- Progress bar during insertion
- Count of successfully inserted entries
- Count of failed entries (if any)
- Sample of inserted logs

### clear_logs

Clear all logs from the database table.

#### Usage

```bash
wp authpress clear_logs [--yes]
```

#### Parameters

- `--yes` - Skip confirmation prompt

#### Examples

**Clear logs with confirmation**
```bash
wp authpress clear_logs
```
This will prompt:
```
Are you sure you want to delete 50 log entries? [y/n]
```

**Clear logs without confirmation**
```bash
wp authpress clear_logs --yes
```

#### Notes

- This operation is **irreversible**
- All data will be deleted permanently
- Consider backing up your database before running

### show_logs

Display recent logs from the database.

#### Usage

```bash
wp authpress show_logs [--limit=<number>] [--format=<format>]
```

#### Parameters

- `--limit=<number>` - Number of logs to display (default: 10)
- `--format=<format>` - Output format: table, csv, json, yaml (default: table)

#### Examples

**Show 10 recent logs**
```bash
wp authpress show_logs
```

**Show 20 recent logs**
```bash
wp authpress show_logs --limit=20
```

**Show 50 recent logs**
```bash
wp authpress show_logs --limit=50
```

**Output in JSON format**
```bash
wp authpress show_logs --format=json
```

**Output in CSV format**
```bash
wp authpress show_logs --format=csv
```

**Output in YAML format**
```bash
wp authpress show_logs --format=yaml
```

**Combine limit and format**
```bash
wp authpress show_logs --limit=25 --format=json
```

#### Exporting Data

**Export logs to JSON file**
```bash
wp authpress show_logs --limit=100 --format=json > logs.json
```

**Export logs to CSV file**
```bash
wp authpress show_logs --limit=500 --format=csv > logs.csv
```

## Login Redirects Commands

### seed_login_redirects

Seed login redirects table with sample data for testing.

#### Usage

```bash
wp authpress seed_login_redirects [--count=<number>]
```

#### Parameters

- `--count=<number>` - Number of redirect entries to create (default: 10)

#### Examples

**Create 10 login redirect entries (default)**
```bash
wp authpress seed_login_redirects
```

**Create 50 login redirect entries**
```bash
wp authpress seed_login_redirects --count=50
```

**Create 100 login redirect entries**
```bash
wp authpress seed_login_redirects --count=100
```

#### Output

The command displays:
- Progress bar during insertion
- Count of successfully inserted redirects
- Count of failed redirects (if any)
- Sample of inserted redirects with ID, user_id, type, value, redirect_to, status, and created_at

#### Data Structure

Each redirect entry contains:
- `user_id` - ID of the user who created the rule
- `type` - Either 'user' or 'role'
- `value` - User ID (e.g., '1', '2', '3') or role slug (e.g., 'administrator', 'subscriber')
- `redirect_to` - Full URL to redirect to
- `status` - Either 'active' or 'inactive'

### clear_login_redirects

Clear all login redirects from the database table.

#### Usage

```bash
wp authpress clear_login_redirects [--yes]
```

#### Parameters

- `--yes` - Skip confirmation prompt

#### Examples

**Clear login redirects with confirmation**
```bash
wp authpress clear_login_redirects
```
This will prompt:
```
Are you sure you want to delete 50 login redirect entries? [y/n]
```

**Clear login redirects without confirmation**
```bash
wp authpress clear_login_redirects --yes
```

#### Notes

- This operation is **irreversible**
- All data will be deleted permanently
- Consider backing up your database before running

### show_login_redirects

Display recent login redirects from the database.

#### Usage

```bash
wp authpress show_login_redirects [--limit=<number>] [--format=<format>]
```

#### Parameters

- `--limit=<number>` - Number of redirects to display (default: 10)
- `--format=<format>` - Output format: table, csv, json, yaml (default: table)

#### Examples

**Show 10 recent login redirects**
```bash
wp authpress show_login_redirects
```

**Show 20 recent login redirects**
```bash
wp authpress show_login_redirects --limit=20
```

**Show 50 recent login redirects**
```bash
wp authpress show_login_redirects --limit=50
```

**Output in JSON format**
```bash
wp authpress show_login_redirects --format=json
```

**Output in CSV format**
```bash
wp authpress show_login_redirects --format=csv
```

**Output in YAML format**
```bash
wp authpress show_login_redirects --format=yaml
```

**Combine limit and format**
```bash
wp authpress show_login_redirects --limit=25 --format=json
```

#### Exporting Data

**Export login redirects to JSON file**
```bash
wp authpress show_login_redirects --limit=100 --format=json > redirects.json
```

**Export login redirects to CSV file**
```bash
wp authpress show_login_redirects --limit=500 --format=csv > redirects.csv
```

#### Table Schema

The `authpress_login_redirects` table has the following structure:

| Column      | Type      | Description                                                  |
|------------|-----------|-------------------------------------------------------------|
| ID         | bigint    | Auto-increment primary key                                     |
| user_id    | bigint    | ID of the user who created the rule                            |
| type       | varchar   | Type of redirect: 'user' or 'role'                           |
| value      | varchar   | User ID (e.g., '1', '2', '3') or role slug (e.g., 'administrator', 'subscriber') |
| redirect_to| varchar   | Full URL to redirect to (e.g., 'https://example.com/dashboard') |
| status     | varchar   | Status of redirect: 'active' or 'inactive'                     |
| created_at | datetime  | Timestamp when the rule was created                             |
| updated_at | datetime  | Timestamp when the rule was last updated                        |

#### Type and Value Combinations

**User-based redirects:**
- `type`: 'user'
- `value`: User ID (e.g., '1', '2', '3')
- Example: When user with ID 5 logs in, redirect them to their dashboard

**Role-based redirects:**
- `type`: 'role'
- `value`: Role slug (e.g., 'administrator', 'editor', 'author', 'subscriber', 'contributor')
- Example: When user with 'editor' role logs in, redirect them to admin area

## Common Workflows

### Workflow 1: Fresh Test Environment

Set up a test environment with sample data:

```bash
# Step 1: Clear existing logs
wp authpress clear_logs --yes

# Step 2: Add 100 new test logs
wp authpress seed_logs --count=100

# Step 3: View the first 10 logs
wp authpress show_logs --limit=10

# Step 4: Export logs to JSON file
wp authpress show_logs --limit=100 --format=json > logs.json
```

### Workflow 2: Login Redirects Setup

Set up login redirects for testing:

```bash
# Clear existing redirects
wp authpress clear_login_redirects --yes

# Seed 50 test redirects
wp authpress seed_login_redirects --count=50

# Review the redirects
wp authpress show_login_redirects --limit=20

# Export to JSON for backup
wp authpress show_login_redirects --limit=50 --format=json > redirects-backup.json
```

### Workflow 3: Complete Data Reset

Reset both logs and login redirects:

```bash
# Clear all logs
wp authpress clear_logs --yes

# Clear all login redirects
wp authpress clear_login_redirects --yes

# Reseed logs
wp authpress seed_logs --count=100

# Reseed login redirects
wp authpress seed_login_redirects --count=50

# Verify data
wp authpress show_logs --limit=10
wp authpress show_login_redirects --limit=10
```

### Workflow 4: Data Analysis

Export and analyze data:

```bash
# Export all logs to CSV
wp authpress show_logs --limit=1000 --format=csv > logs_analysis.csv

# Export all redirects to JSON
wp authpress show_login_redirects --limit=500 --format=json > redirects_analysis.json

# Get summary counts
wp authpress show_logs --format=json | jq 'length'
wp authpress show_login_redirects --format=json | jq 'length'
```

## Tips and Best Practices

### Performance Tips

1. **Use appropriate counts** - Don't seed too many entries at once:
   ```bash
   # Good: 100-500 entries
   wp authpress seed_logs --count=100

   # Bad: 10000+ entries (may timeout)
   wp authpress seed_logs --count=10000
   ```

2. **Export in batches** - When exporting large datasets:
   ```bash
   # Export in chunks of 1000
   wp authpress show_logs --limit=1000 --format=json > logs-1.json
   ```

3. **Use --yes flag** - For automation scripts, use `--yes` to skip prompts:
   ```bash
   wp authpress clear_logs --yes
   ```

### Data Management

1. **Backup before clearing** - Always backup your database:
   ```bash
   wp db export backup-before-clear.sql
   wp authpress clear_logs --yes
   ```

2. **Use version control** - Track exported data files:
   ```bash
   git add logs.json redirects.json
   git commit -m "Add test data exports"
   ```

3. **Regular cleanup** - Schedule regular cleanup in cron:
   ```bash
   # Add to crontab
   0 3 * * * wp authpress clear_logs --yes
   ```

### Testing Best Practices

1. **Start small** - Begin with small datasets:
   ```bash
   wp authpress seed_logs --count=10
   ```

2. **Verify data** - Check data after seeding:
   ```bash
   wp authpress show_logs --limit=5
   ```

3. **Use different formats** - Test with various output formats:
   ```bash
   wp authpress show_logs --format=json
   wp authpress show_logs --format=csv
   ```

### Security Considerations

1. **Limit access** - Only allow trusted users to run these commands
2. **Use non-production environments** - Test in staging first
3. **Monitor usage** - Check command history:
   ```bash
   history | grep "wp authpress"
   ```

### Troubleshooting

**Command not found:**
```bash
# Verify WP-CLI is installed
wp --version

# Verify plugin is active
wp plugin list | grep authpress
```

**Table does not exist:**
```bash
# Reactivate the plugin to create tables
wp plugin deactivate authpress
wp plugin activate authpress
```

**Permission denied:**
```bash
# Run with sudo if necessary (not recommended)
sudo wp authpress seed_logs

# Better: Fix file permissions
chmod +x wp-cli.phar
```

**Database connection error:**
```bash
# Check database credentials
wp db check

# Verify database exists
wp db info
```

## Getting Help

If you encounter issues:

1. Check WP-CLI documentation: https://wp-cli.org/
2. Review AuthPress plugin documentation
3. Check WordPress debug logs:
   ```bash
   wp debug
   ```

## Version Information

To check your WP-CLI and AuthPress versions:

```bash
wp --version
wp plugin list | grep authpress
```
