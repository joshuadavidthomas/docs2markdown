# CLI

OpenCode CLI options and commands.

The OpenCode CLI by default starts the [TUI](/docs/tui) when run without any arguments.

But it also accepts commands as documented on this page. This allows you to interact with OpenCode programmatically.

---

## [Commands](#commands)

The OpenCode CLI also has the following commands.

---

### [agent](#agent)

Manage agents for OpenCode.

---

#### [create](#create)

Create a new agent with custom configuration.

This command will guide you through creating a new agent with a custom system prompt and tool configuration.

---

### [auth](#auth)

Command to manage credentials and login for providers.

---

#### [login](#login)

OpenCode is powered by the provider list at [Models.dev](https://models.dev), so you can use `opencode auth login` to configure API keys for any provider you’d like to use. This is stored in `~/.local/share/opencode/auth.json`.

When OpenCode starts up it loads the providers from the credentials file. And if there are any keys defined in your environments or a `.env` file in your project.

---

#### [list](#list)

Lists all the authenticated providers as stored in the credentials file.

Or the short version.

---

#### [logout](#logout)

Logs you out of a provider by clearing it from the credentials file.

---

### [github](#github)

Manage the GitHub agent for repository automation.

---

#### [install](#install)

Install the GitHub agent in your repository.

This sets up the necessary GitHub Actions workflow and guides you through the configuration process. [Learn more](/docs/github).

---

#### [run](#run)

Run the GitHub agent. This is typically used in GitHub Actions.

##### [Flags](#flags)

| Flag | Description |
| --- | --- |
| `--event` | GitHub mock event to run the agent for |
| `--token` | GitHub personal access token |

---

### [models](#models)

List all available models from configured providers.

This command displays all models available across your configured providers in the format `provider/model`.

This is useful for figuring out the exact model name to use in [your config](/docs/config/).

---

### [run](#run-1)

Run opencode in non-interactive mode by passing a prompt directly.

This is useful for scripting, automation, or when you want a quick answer without launching the full TUI. For example.

#### [Flags](#flags-1)

| Flag | Short | Description |
| --- | --- | --- |
| `--continue` | `-c` | Continue the last session |
| `--session` | `-s` | Session ID to continue |
| `--share` |  | Share the session |
| `--model` | `-m` | Model to use in the form of provider/model |
| `--agent` |  | Agent to use |

---

### [serve](#serve)

Start a headless opencode server for API access. Check out the [server docs](/docs/server) for the full HTTP interface.

This starts an HTTP server that provides API access to opencode functionality without the TUI interface.

#### [Flags](#flags-2)

| Flag | Short | Description |
| --- | --- | --- |
| `--port` | `-p` | Port to listen on |
| `--hostname` | `-h` | Hostname to listen on |

---

### [upgrade](#upgrade)

Updates opencode to the latest version or a specific version.

To upgrade to the latest version.

To upgrade to a specific version.

#### [Flags](#flags-3)

| Flag | Short | Description |
| --- | --- | --- |
| `--method` | `-m` | The installation method that was used; curl, npm, pnpm, bun, brew |

---

## [Flags](#flags-4)

The opencode CLI takes the following global flags.

| Flag | Short | Description |
| --- | --- | --- |
| `--help` | `-h` | Display help |
| `--version` |  | Print version number |
| `--print-logs` |  | Print logs to stderr |
| `--log-level` |  | Log level (DEBUG, INFO, WARN, ERROR) |
| `--prompt` | `-p` | Prompt to use |
| `--model` | `-m` | Model to use in the form of provider/model |
| `--agent` |  | Agent to use |
| `--port` |  | Port to listen on |
| `--hostname` |  | Hostname to listen on |
