# Agents

Configure and use specialized agents.

Agents are specialized AI assistants that can be configured for specific tasks and workflows. They allow you to create focused tools with custom prompts, models, and tool access.

You can switch between agents during a session or invoke them with the `@` mention.

---

## [Types](#types)

There are two types of agents in OpenCode; primary agents and subagents.

---

### [Primary agents](#primary-agents)

Primary agents are the main assistants you interact with directly. You can cycle through them using the **Tab** key, or your configured `switch_agent` keybind. These agents handle your main conversation and can access all configured tools.

OpenCode comes with two built-in primary agents, **Build** and **Plan**. We’ll look at these below.

---

### [Subagents](#subagents)

Subagents are specialized assistants that primary agents can invoke for specific tasks. You can also manually invoke them by **@ mentioning** them in your messages.

OpenCode comes with one built-in subagent, **General**. We’ll look at this below.

---

## [Built-in](#built-in)

OpenCode comes with two built-in primary agents and one built-in subagent.

---

### [Build](#build)

*Mode*: `primary`

Build is the **default** primary agent with all tools enabled. This is the standard agent for development work where you need full access to file operations and system commands.

---

### [Plan](#plan)

*Mode*: `primary`

A restricted agent designed for planning and analysis. We use a permission system to give you more control and prevent unintended changes. By default, all of the following are set to `ask`:

- `file edits`: All writes, patches, and edits
- `bash`: All bash commands

This agent is useful when you want the LLM to analyze code, suggest changes, or create plans without making any actual modifications to your codebase.

---

### [General](#general)

*Mode*: `subagent`

A general-purpose agent for researching complex questions, searching for code, and executing multi-step tasks. Use when searching for keywords or files and you’re not confident you’ll find the right match in the first few tries.

---

## [Usage](#usage)

1. For primary agents, use the **Tab** key to cycle through them during a session. You can also use your configured `switch_agent` keybind.
2. Subagents can be invoked:

   - **Automatically** by primary agents for specialized tasks based on their descriptions.
   - Manually by **@ mentioning** a subagent in your message. For example.

     ```txt
     @general help me search for this function
     ```
3. **Navigation between sessions**: When subagents create their own child sessions, you can navigate between the parent session and all child sessions using:

   - **Ctrl+Right** (or your configured `session_child_cycle` keybind) to cycle forward through parent → child1 → child2 → … → parent
   - **Ctrl+Left** (or your configured `session_child_cycle_reverse` keybind) to cycle backward through parent ← child1 ← child2 ← … ← parent

   This allows you to seamlessly switch between the main conversation and specialized subagent work.

---

## [Configure](#configure)

You can customize the built-in agents or create your own through configuration. Agents can be configured in two ways:

---

### [JSON](#json)

Configure agents in your `opencode.json` config file:

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": {
      "mode": "primary",
      "model": "anthropic/claude-sonnet-4-20250514",
      "prompt": "{file:./prompts/build.txt}",
      "tools": {
        "write": true,
        "edit": true,
        "bash": true
      }
    },
    "plan": {
      "mode": "primary",
      "model": "anthropic/claude-haiku-4-20250514",
      "tools": {
        "write": false,
        "edit": false,
        "bash": false
      }
    },
    "code-reviewer": {
      "description": "Reviews code for best practices and potential issues",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "prompt": "You are a code reviewer. Focus on security, performance, and maintainability.",
      "tools": {
        "write": false,
        "edit": false
      }
    }
  }
}
```

</figure>

---

### [Markdown](#markdown)

You can also define agents using markdown files. Place them in:

- Global: `~/.config/opencode/agent/`
- Per-project: `.opencode/agent/`

<figure>
<figcaption>~/.config/opencode/agent/review.md</figcaption>



```markdown
---
description: Reviews code for quality and best practices
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---


You are in code review mode. Focus on:


- Code quality and best practices
- Potential bugs and edge cases
- Performance implications
- Security considerations


Provide constructive feedback without making direct changes.
```

</figure>

The markdown file name becomes the agent name. For example, `review.md` creates a `review` agent.

---

## [Options](#options)

Let’s look at these configuration options in detail.

---

### [Description](#description)

Use the `description` option to provide a brief description of what the agent does and when to use it.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "review": {
      "description": "Reviews code for best practices and potential issues"
    }
  }
}
```

</figure>

This is a **required** config option.

---

### [Temperature](#temperature)

Control the randomness and creativity of the LLM’s responses with the `temperature` config.

Lower values make responses more focused and deterministic, while higher values increase creativity and variability.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "plan": {
      "temperature": 0.1
    },
    "creative": {
      "temperature": 0.8
    }
  }
}
```

</figure>

Temperature values typically range from 0.0 to 1.0:

- **0.0-0.2**: Very focused and deterministic responses, ideal for code analysis and planning
- **0.3-0.5**: Balanced responses with some creativity, good for general development tasks
- **0.6-1.0**: More creative and varied responses, useful for brainstorming and exploration

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "analyze": {
      "temperature": 0.1,
      "prompt": "{file:./prompts/analysis.txt}"
    },
    "build": {
      "temperature": 0.3
    },
    "brainstorm": {
      "temperature": 0.7,
      "prompt": "{file:./prompts/creative.txt}"
    }
  }
}
```

</figure>

If no temperature is specified, OpenCode uses model-specific defaults; typically 0 for most models, 0.55 for Qwen models.

---

### [Disable](#disable)

Set to `true` to disable the agent.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "review": {
      "disable": true
    }
  }
}
```

</figure>

---

### [Prompt](#prompt)

Specify a custom system prompt file for this agent with the `prompt` config. The prompt file should contain instructions specific to the agent’s purpose.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "review": {
      "prompt": "{file:./prompts/code-review.txt}"
    }
  }
}
```

</figure>

This path is relative to where the config file is located. So this works for both the global OpenCode config and the project specific config.

---

### [Model](#model)

Use the `model` config to override the default model for this agent. Useful for using different models optimized for different tasks. For example, a faster model for planning, a more capable model for implementation.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "plan": {
      "model": "anthropic/claude-haiku-4-20250514"
    }
  }
}
```

</figure>

---

### [Tools](#tools)

Control which tools are available in this agent with the `tools` config. You can enable or disable specific tools by setting them to `true` or `false`.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "tools": {
    "write": true,
    "bash": true
  },
  "agent": {
    "plan": {
      "tools": {
        "write": false,
        "bash": false
      }
    }
  }
}
```

</figure>

You can also use wildcards to control multiple tools at once. For example, to disable all tools from an MCP server:

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "readonly": {
      "tools": {
        "mymcp_*": false,
        "write": false,
        "edit": false
      }
    }
  }
}
```

</figure>

[Learn more about tools](/docs/tools).

---

### [Permissions](#permissions)

You can configure permissions to manage what actions an agent can take. Currently, the permissions for the `edit`, `bash`, and `webfetch` tools can be configured to:

- `"ask"` — Prompt for approval before running the tool
- `"allow"` — Allow all operations without approval
- `"deny"` — Disable the tool

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "deny"
  }
}
```

</figure>

You can override these permissions per agent.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "edit": "deny"
  },
  "agent": {
    "build": {
      "permission": {
        "edit": "ask"
      }
    }
  }
}
```

</figure>

You can also set permissions in Markdown agents.

<figure>
<figcaption>~/.config/opencode/agent/review.md</figcaption>



```markdown
---
description: Code review without edits
mode: subagent
permission:
  edit: deny
  bash: ask
  webfetch: deny
---


Only analyze code and suggest changes.
```

</figure>

You can set permissions for specific bash commands.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "git push": "ask"
        }
      }
    }
  }
}
```

</figure>

This can take a glob pattern.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "git *": "ask"
        }
      }
    }
  }
}
```

</figure>

And you can also use the `*` wildcard to manage permissions for all commands. Where the specific rule can override the `*` wildcard.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "git status": "allow",
          "*": "ask"
        }
      }
    }
  }
}
```

</figure>

[Learn more about permissions](/docs/permissions).

---

### [Mode](#mode)

Control the agent’s mode with the `mode` config. The `mode` option is used to determine how the agent can be used.

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "review": {
      "mode": "subagent"
    }
  }
}
```

</figure>

The `mode` option can be set to `primary`, `subagent`, or `all`. If no `mode` is specified, it defaults to `all`.

---

### [Additional](#additional)

Any other options you specify in your agent configuration will be **passed through directly** to the provider as model options. This allows you to use provider-specific features and parameters.

For example, with OpenAI’s reasoning models, you can control the reasoning effort:

<figure>
<figcaption>opencode.json</figcaption>



```json
{
  "agent": {
    "deep-thinker": {
      "description": "Agent that uses high reasoning effort for complex problems",
      "model": "openai/gpt-5",
      "reasoningEffort": "high",
      "textVerbosity": "low"
    }
  }
}
```

</figure>

These additional options are model and provider-specific. Check your provider’s documentation for available parameters.

---

## [Create agents](#create-agents)

You can create new agents using the following command:

```bash
opencode agent create
```

This interactive command will:

1. Ask where to save the agent; global or project-specific.
2. Description of what the agent should do.
3. Generate an appropriate system prompt and identifier.
4. Let you select which tools the agent can access.
5. Finally, create a markdown file with the agent configuration.

---

## [Use cases](#use-cases)

Here are some common use cases for different agents.

- **Build agent**: Full development work with all tools enabled
- **Plan agent**: Analysis and planning without making changes
- **Review agent**: Code review with read-only access plus documentation tools
- **Debug agent**: Focused on investigation with bash and read tools enabled
- **Docs agent**: Documentation writing with file operations but no system commands

---

## [Examples](#examples)

Here are some examples agents you might find useful.

---

### [Documentation agent](#documentation-agent)

<figure>
<figcaption>~/.config/opencode/agent/docs-writer.md</figcaption>



```markdown
---
description: Writes and maintains project documentation
mode: subagent
tools:
  bash: false
---


You are a technical writer. Create clear, comprehensive documentation.


Focus on:


- Clear explanations
- Proper structure
- Code examples
- User-friendly language
```

</figure>

---

### [Security auditor](#security-auditor)

<figure>
<figcaption>~/.config/opencode/agent/security-auditor.md</figcaption>



```markdown
---
description: Performs security audits and identifies vulnerabilities
mode: subagent
tools:
  write: false
  edit: false
---


You are a security expert. Focus on identifying potential security issues.


Look for:


- Input validation vulnerabilities
- Authentication and authorization flaws
- Data exposure risks
- Dependency vulnerabilities
- Configuration security issues
```

</figure>
