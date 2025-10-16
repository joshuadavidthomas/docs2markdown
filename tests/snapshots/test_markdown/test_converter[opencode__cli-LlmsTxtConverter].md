 CLI | opencode

  [Skip to content](#_top)

[![](/docs/_astro/logo-dark.DOStV66V.svg) ![](/docs/_astro/logo-light.B0yzR0O5.svg)  opencode](/)

[Home](/)[Docs](/docs/)

Search  `CtrlK`   

Cancel

        

- [Intro](/docs/)
- [Config](/docs/config/)
- [Providers](/docs/providers/)
- [Enterprise](/docs/enterprise/)
- [Troubleshooting](/docs/troubleshooting/)
- Usage

   
  - [TUI](/docs/tui/)
  - [CLI](/docs/cli/)
  - [IDE](/docs/ide/)
  - [Zen](/docs/zen/)
  - [Share](/docs/share/)
  - [GitHub](/docs/github/)
  - [GitLab](/docs/gitlab/)
- Configure

   
  - [Tools](/docs/tools/)
  - [Rules](/docs/rules/)
  - [Agents](/docs/agents/)
  - [Models](/docs/models/)
  - [Themes](/docs/themes/)
  - [Keybinds](/docs/keybinds/)
  - [Commands](/docs/commands/)
  - [Formatters](/docs/formatters/)
  - [Permissions](/docs/permissions/)
  - [LSP Servers](/docs/lsp/)
  - [MCP servers](/docs/mcp-servers/)
  - [Custom Tools](/docs/custom-tools/)
- Develop

   
  - [SDK](/docs/sdk/)
  - [Server](/docs/server/)
  - [Plugins](/docs/plugins/)

 

[GitHub](https://github.com/sst/opencode)[Dscord](https://opencode.ai/discord)

  Select theme   DarkLightAuto

On this page

- [Overview](#_top)
- [Commands](#commands) 
  - [agent](#agent)
  - [auth](#auth)
  - [github](#github)
  - [models](#models)
  - [run](#run-1)
  - [serve](#serve)
  - [upgrade](#upgrade)
- [Flags](#flags-4)

## On this page

- [Overview](#_top)
- [Commands](#commands) 
  - [agent](#agent)
  - [auth](#auth)
  - [github](#github)
  - [models](#models)
  - [run](#run-1)
  - [serve](#serve)
  - [upgrade](#upgrade)
- [Flags](#flags-4)

# CLI

OpenCode CLI options and commands.

The OpenCode CLI by default starts the [TUI](/docs/tui) when run without any arguments.

Terminal window

```
opencode
```

But it also accepts commands as documented on this page. This allows you to interact with OpenCode programmatically.

Terminal window

```
opencode run "Explain how closures work in JavaScript"
```

---

## [Commands](#commands)

The OpenCode CLI also has the following commands.

---

### [agent](#agent)

Manage agents for OpenCode.

Terminal window

```
opencode agent [command]
```

---

#### [create](#create)

Create a new agent with custom configuration.

Terminal window

```
opencode agent create
```

This command will guide you through creating a new agent with a custom system prompt and tool configuration.

---

### [auth](#auth)

Command to manage credentials and login for providers.

Terminal window

```
opencode auth [command]
```

---

#### [login](#login)

OpenCode is powered by the provider list at [Models.dev](https://models.dev), so you can use `opencode auth login` to configure API keys for any provider you’d like to use. This is stored in `~/.local/share/opencode/auth.json`.

Terminal window

```
opencode auth login
```

When OpenCode starts up it loads the providers from the credentials file. And if there are any keys defined in your environments or a `.env` file in your project.

---

#### [list](#list)

Lists all the authenticated providers as stored in the credentials file.

Terminal window

```
opencode auth list
```

Or the short version.

Terminal window

```
opencode auth ls
```

---

#### [logout](#logout)

Logs you out of a provider by clearing it from the credentials file.

Terminal window

```
opencode auth logout
```

---

### [github](#github)

Manage the GitHub agent for repository automation.

Terminal window

```
opencode github [command]
```

---

#### [install](#install)

Install the GitHub agent in your repository.

Terminal window

```
opencode github install
```

This sets up the necessary GitHub Actions workflow and guides you through the configuration process. [Learn more](/docs/github).

---

#### [run](#run)

Run the GitHub agent. This is typically used in GitHub Actions.

Terminal window

```
opencode github run
```

##### [Flags](#flags)

| Flag | Description |
| --- | --- |
| `--event` | GitHub mock event to run the agent for |
| `--token` | GitHub personal access token |

---

### [models](#models)

List all available models from configured providers.

Terminal window

```
opencode models
```

This command displays all models available across your configured providers in the format `provider/model`.

This is useful for figuring out the exact model name to use in [your config](/docs/config/).

---

### [run](#run-1)

Run opencode in non-interactive mode by passing a prompt directly.

Terminal window

```
opencode run [message..]
```

This is useful for scripting, automation, or when you want a quick answer without launching the full TUI. For example.

Terminal window

```
opencode run Explain the use of context in Go
```

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

Terminal window

```
opencode serve
```

This starts an HTTP server that provides API access to opencode functionality without the TUI interface.

#### [Flags](#flags-2)

| Flag | Short | Description |
| --- | --- | --- |
| `--port` | `-p` | Port to listen on |
| `--hostname` | `-h` | Hostname to listen on |

---

### [upgrade](#upgrade)

Updates opencode to the latest version or a specific version.

Terminal window

```
opencode upgrade [target]
```

To upgrade to the latest version.

Terminal window

```
opencode upgrade
```

To upgrade to a specific version.

Terminal window

```
opencode upgrade v0.1.48
```

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

[Edit this page](https://github.com/sst/opencode/edit/dev/packages/web/src/content/docs/cli.mdx)[Find a bug? Open an issue](https://github.com/sst/opencode/issues/new)[Join our Discord community](https://opencode.ai/discord)

© [Anomaly](https://anoma.ly)

Oct 3, 2025
