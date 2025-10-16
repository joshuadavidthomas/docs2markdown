globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BfFDGVc7.mjs';
import './Code_Bjh26zHX.mjs';

const frontmatter = {
  "title": "CLI",
  "description": "OpenCode CLI options and commands."
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "commands",
    "text": "Commands"
  }, {
    "depth": 3,
    "slug": "agent",
    "text": "agent"
  }, {
    "depth": 4,
    "slug": "create",
    "text": "create"
  }, {
    "depth": 3,
    "slug": "auth",
    "text": "auth"
  }, {
    "depth": 4,
    "slug": "login",
    "text": "login"
  }, {
    "depth": 4,
    "slug": "list",
    "text": "list"
  }, {
    "depth": 4,
    "slug": "logout",
    "text": "logout"
  }, {
    "depth": 3,
    "slug": "github",
    "text": "github"
  }, {
    "depth": 4,
    "slug": "install",
    "text": "install"
  }, {
    "depth": 4,
    "slug": "run",
    "text": "run"
  }, {
    "depth": 5,
    "slug": "flags",
    "text": "Flags"
  }, {
    "depth": 3,
    "slug": "models",
    "text": "models"
  }, {
    "depth": 3,
    "slug": "run-1",
    "text": "run"
  }, {
    "depth": 4,
    "slug": "flags-1",
    "text": "Flags"
  }, {
    "depth": 3,
    "slug": "serve",
    "text": "serve"
  }, {
    "depth": 4,
    "slug": "flags-2",
    "text": "Flags"
  }, {
    "depth": 3,
    "slug": "upgrade",
    "text": "upgrade"
  }, {
    "depth": 4,
    "slug": "flags-3",
    "text": "Flags"
  }, {
    "depth": 2,
    "slug": "flags-4",
    "text": "Flags"
  }];
}
function _createMdxContent(props) {
  const {Fragment} = props.components || ({});
  if (!Fragment) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    "set:html": "<p>The OpenCode CLI by default starts the <a href=\"/docs/tui\">TUI</a> when run without any arguments.</p>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/docs/_astro/ec.4c0k7.css\"><script type=\"module\" src=\"/docs/_astro/ec.p1z7b.js\"></script><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode\"><div></div></button></div></figure></div>\n<p>But it also accepts commands as documented on this page. This allows you to interact with OpenCode programmatically.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">run</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"Explain how closures work in JavaScript\"</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode run &#x22;Explain how closures work in JavaScript&#x22;\"><div></div></button></div></figure></div>\n<hr>\n<h2 id=\"commands\"><a href=\"#commands\">Commands</a></h2>\n<p>The OpenCode CLI also has the following commands.</p>\n<hr>\n<h3 id=\"agent\"><a href=\"#agent\">agent</a></h3>\n<p>Manage agents for OpenCode.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">agent</span><span style=\"--0:#24292E;--1:#E1E4E8\"> [command]</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode agent [command]\"><div></div></button></div></figure></div>\n<hr>\n<h4 id=\"create\"><a href=\"#create\">create</a></h4>\n<p>Create a new agent with custom configuration.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">agent</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">create</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode agent create\"><div></div></button></div></figure></div>\n<p>This command will guide you through creating a new agent with a custom system prompt and tool configuration.</p>\n<hr>\n<h3 id=\"auth\"><a href=\"#auth\">auth</a></h3>\n<p>Command to manage credentials and login for providers.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">auth</span><span style=\"--0:#24292E;--1:#E1E4E8\"> [command]</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode auth [command]\"><div></div></button></div></figure></div>\n<hr>\n<h4 id=\"login\"><a href=\"#login\">login</a></h4>\n<p>OpenCode is powered by the provider list at <a href=\"https://models.dev\">Models.dev</a>, so you can use <code dir=\"auto\">opencode auth login</code> to configure API keys for any provider you’d like to use. This is stored in <code dir=\"auto\">~/.local/share/opencode/auth.json</code>.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">auth</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">login</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode auth login\"><div></div></button></div></figure></div>\n<p>When OpenCode starts up it loads the providers from the credentials file. And if there are any keys defined in your environments or a <code dir=\"auto\">.env</code> file in your project.</p>\n<hr>\n<h4 id=\"list\"><a href=\"#list\">list</a></h4>\n<p>Lists all the authenticated providers as stored in the credentials file.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">auth</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">list</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode auth list\"><div></div></button></div></figure></div>\n<p>Or the short version.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">auth</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">ls</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode auth ls\"><div></div></button></div></figure></div>\n<hr>\n<h4 id=\"logout\"><a href=\"#logout\">logout</a></h4>\n<p>Logs you out of a provider by clearing it from the credentials file.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">auth</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">logout</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode auth logout\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"github\"><a href=\"#github\">github</a></h3>\n<p>Manage the GitHub agent for repository automation.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">github</span><span style=\"--0:#24292E;--1:#E1E4E8\"> [command]</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode github [command]\"><div></div></button></div></figure></div>\n<hr>\n<h4 id=\"install\"><a href=\"#install\">install</a></h4>\n<p>Install the GitHub agent in your repository.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">github</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">install</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode github install\"><div></div></button></div></figure></div>\n<p>This sets up the necessary GitHub Actions workflow and guides you through the configuration process. <a href=\"/docs/github\">Learn more</a>.</p>\n<hr>\n<h4 id=\"run\"><a href=\"#run\">run</a></h4>\n<p>Run the GitHub agent. This is typically used in GitHub Actions.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">github</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">run</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode github run\"><div></div></button></div></figure></div>\n<h5 id=\"flags\"><a href=\"#flags\">Flags</a></h5>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Flag</th><th>Description</th></tr></thead><tbody><tr><td><code dir=\"auto\">--event</code></td><td>GitHub mock event to run the agent for</td></tr><tr><td><code dir=\"auto\">--token</code></td><td>GitHub personal access token</td></tr></tbody></table>\n<hr>\n<h3 id=\"models\"><a href=\"#models\">models</a></h3>\n<p>List all available models from configured providers.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">models</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode models\"><div></div></button></div></figure></div>\n<p>This command displays all models available across your configured providers in the format <code dir=\"auto\">provider/model</code>.</p>\n<p>This is useful for figuring out the exact model name to use in <a href=\"/docs/config/\">your config</a>.</p>\n<hr>\n<h3 id=\"run-1\"><a href=\"#run-1\">run</a></h3>\n<p>Run opencode in non-interactive mode by passing a prompt directly.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">run</span><span style=\"--0:#24292E;--1:#E1E4E8\"> [message..]</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode run [message..]\"><div></div></button></div></figure></div>\n<p>This is useful for scripting, automation, or when you want a quick answer without launching the full TUI. For example.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><mark><span style=\"--0:#5c37a0;--1:#c5acf4\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">run</span></mark><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">Explain</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">the</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">use</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">of</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">context</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">in</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">Go</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode run Explain the use of context in Go\"><div></div></button></div></figure></div>\n<h4 id=\"flags-1\"><a href=\"#flags-1\">Flags</a></h4>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Flag</th><th>Short</th><th>Description</th></tr></thead><tbody><tr><td><code dir=\"auto\">--continue</code></td><td><code dir=\"auto\">-c</code></td><td>Continue the last session</td></tr><tr><td><code dir=\"auto\">--session</code></td><td><code dir=\"auto\">-s</code></td><td>Session ID to continue</td></tr><tr><td><code dir=\"auto\">--share</code></td><td></td><td>Share the session</td></tr><tr><td><code dir=\"auto\">--model</code></td><td><code dir=\"auto\">-m</code></td><td>Model to use in the form of provider/model</td></tr><tr><td><code dir=\"auto\">--agent</code></td><td></td><td>Agent to use</td></tr></tbody></table>\n<hr>\n<h3 id=\"serve\"><a href=\"#serve\">serve</a></h3>\n<p>Start a headless opencode server for API access. Check out the <a href=\"/docs/server\">server docs</a> for the full HTTP interface.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">serve</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode serve\"><div></div></button></div></figure></div>\n<p>This starts an HTTP server that provides API access to opencode functionality without the TUI interface.</p>\n<h4 id=\"flags-2\"><a href=\"#flags-2\">Flags</a></h4>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Flag</th><th>Short</th><th>Description</th></tr></thead><tbody><tr><td><code dir=\"auto\">--port</code></td><td><code dir=\"auto\">-p</code></td><td>Port to listen on</td></tr><tr><td><code dir=\"auto\">--hostname</code></td><td><code dir=\"auto\">-h</code></td><td>Hostname to listen on</td></tr></tbody></table>\n<hr>\n<h3 id=\"upgrade\"><a href=\"#upgrade\">upgrade</a></h3>\n<p>Updates opencode to the latest version or a specific version.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">upgrade</span><span style=\"--0:#24292E;--1:#E1E4E8\"> [target]</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode upgrade [target]\"><div></div></button></div></figure></div>\n<p>To upgrade to the latest version.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">upgrade</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode upgrade\"><div></div></button></div></figure></div>\n<p>To upgrade to a specific version.</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">upgrade</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">v0.1.48</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode upgrade v0.1.48\"><div></div></button></div></figure></div>\n<h4 id=\"flags-3\"><a href=\"#flags-3\">Flags</a></h4>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Flag</th><th>Short</th><th>Description</th></tr></thead><tbody><tr><td><code dir=\"auto\">--method</code></td><td><code dir=\"auto\">-m</code></td><td>The installation method that was used; curl, npm, pnpm, bun, brew</td></tr></tbody></table>\n<hr>\n<h2 id=\"flags-4\"><a href=\"#flags-4\">Flags</a></h2>\n<p>The opencode CLI takes the following global flags.</p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Flag</th><th>Short</th><th>Description</th></tr></thead><tbody><tr><td><code dir=\"auto\">--help</code></td><td><code dir=\"auto\">-h</code></td><td>Display help</td></tr><tr><td><code dir=\"auto\">--version</code></td><td></td><td>Print version number</td></tr><tr><td><code dir=\"auto\">--print-logs</code></td><td></td><td>Print logs to stderr</td></tr><tr><td><code dir=\"auto\">--log-level</code></td><td></td><td>Log level (DEBUG, INFO, WARN, ERROR)</td></tr><tr><td><code dir=\"auto\">--prompt</code></td><td><code dir=\"auto\">-p</code></td><td>Prompt to use</td></tr><tr><td><code dir=\"auto\">--model</code></td><td><code dir=\"auto\">-m</code></td><td>Model to use in the form of provider/model</td></tr><tr><td><code dir=\"auto\">--agent</code></td><td></td><td>Agent to use</td></tr><tr><td><code dir=\"auto\">--port</code></td><td></td><td>Port to listen on</td></tr><tr><td><code dir=\"auto\">--hostname</code></td><td></td><td>Hostname to listen on</td></tr></tbody></table>"
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error("Expected " + ("component" ) + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
const url = "src/content/docs/cli.mdx";
const file = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/cli.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/cli.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
