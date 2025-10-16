# docs2md

Convert HTML documentation to GitHub-flavored Markdown.

## Format Options

docs2md supports two output formats:

- `ghfm` (default): GitHub-flavored Markdown with some HTML preservation for proper GitHub rendering
- `llmstxt`: Clean markdown optimized for LLM consumption with no HTML elements

### Examples

```bash
# Default GitHub-flavored output
docs2md docs/api.html output.md

# LLM-friendly text output
docs2md docs/api.html output.txt --format llmstxt

# Convert directory to LLM-friendly format
docs2md docs/_build/html dist/ --format llmstxt
```

### Format Differences

| Feature | GHFM | LLMSTXT |
|---------|------|---------|
| File extension | `.md` | `.txt` |
| HTML elements | Preserves some for GitHub | None |
| Definition lists | HTML `<dl>` tags | Plain markdown |
| Alerts | `[!NOTE]` syntax | `**Note:**` format |
| Anchor spans | Preserved | Removed |
