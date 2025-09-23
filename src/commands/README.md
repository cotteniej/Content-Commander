# Content Commander

A command-line content management tool.

## Features

- Store and organize content ideas
- Search and filter your content collection
- Set due dates and view a content calendar
- Update and delete content ideas

## Installation

```
npm install -g .
```

## Commands

- `content-commander add` - Add a new content idea
- `content-commander list` - List all content ideas
- `content-commander search <term>` - Search for content ideas
- `content-commander filter [options]` - Filter content ideas
  - `-t, --type <type>` - Filter by content type
  - `-s, --status <status>` - Filter by status
  - `-g, --tag <tag>` - Filter by tag
- `content-commander update <id>` - Update a content idea
- `content-commander delete <id>` - Delete a content idea
- `content-commander calendar` - View content calendar
- `content-commander help` - Show help information

## Examples

```
# Add a new content idea
content-commander add

# Search for content ideas containing "blog"
content-commander search "blog"

# Filter for content ideas of type "Blog Post" with "Planning" status
content-commander filter --type "Blog Post" --status "Planning"

# Update a content idea by ID
content-commander update 1677602792348

# View content calendar
content-commander calendar
```// Command files will go here
