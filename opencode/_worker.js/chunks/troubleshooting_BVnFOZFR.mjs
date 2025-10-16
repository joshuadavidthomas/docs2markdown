globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BfFDGVc7.mjs';

const frontmatter = {
  "title": "Troubleshooting",
  "description": "Common issues and how to resolve them."
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "logs",
    "text": "Logs"
  }, {
    "depth": 3,
    "slug": "storage",
    "text": "Storage"
  }, {
    "depth": 2,
    "slug": "getting-help",
    "text": "Getting help"
  }, {
    "depth": 2,
    "slug": "common-issues",
    "text": "Common issues"
  }, {
    "depth": 3,
    "slug": "opencode-wont-start",
    "text": "opencode won’t start"
  }, {
    "depth": 3,
    "slug": "authentication-issues",
    "text": "Authentication issues"
  }, {
    "depth": 3,
    "slug": "model-not-available",
    "text": "Model not available"
  }, {
    "depth": 3,
    "slug": "provideriniterror",
    "text": "ProviderInitError"
  }, {
    "depth": 3,
    "slug": "ai_apicallerror-and-provider-package-issues",
    "text": "AI_APICallError and provider package issues"
  }, {
    "depth": 3,
    "slug": "copypaste-not-working-on-linux",
    "text": "Copy/paste not working on Linux"
  }];
}
function _createMdxContent(props) {
  const {Fragment} = props.components || ({});
  if (!Fragment) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    "set:html": "<p>To debug any issues with OpenCode, you can check the logs or the session data\nthat it stores locally.</p>\n<hr>\n<h3 id=\"logs\"><a href=\"#logs\">Logs</a></h3>\n<p>Log files are written to:</p>\n<ul>\n<li><strong>macOS/Linux</strong>: <code dir=\"auto\">~/.local/share/opencode/log/</code></li>\n<li><strong>Windows</strong>: <code dir=\"auto\">%USERPROFILE%\\.local\\share\\opencode\\log\\</code></li>\n</ul>\n<p>Log files are named with timestamps (e.g., <code dir=\"auto\">2025-01-09T123456.log</code>) and the most recent 10 log files are kept.</p>\n<p>You can set the log level with the <code dir=\"auto\">--log-level</code> command-line option to get more detailed debug information. For example, <code dir=\"auto\">opencode --log-level DEBUG</code>.</p>\n<hr>\n<h3 id=\"storage\"><a href=\"#storage\">Storage</a></h3>\n<p>opencode stores session data and other application data on disk at:</p>\n<ul>\n<li><strong>macOS/Linux</strong>: <code dir=\"auto\">~/.local/share/opencode/</code></li>\n<li><strong>Windows</strong>: <code dir=\"auto\">%USERPROFILE%\\.local\\share\\opencode</code></li>\n</ul>\n<p>This directory contains:</p>\n<ul>\n<li><code dir=\"auto\">auth.json</code> - Authentication data like API keys, OAuth tokens</li>\n<li><code dir=\"auto\">log/</code> - Application logs</li>\n<li><code dir=\"auto\">project/</code> - Project-specific data like session and message data\n<ul>\n<li>If the project is within a Git repo, it is stored in <code dir=\"auto\">./&#x3C;project-slug>/storage/</code></li>\n<li>If it is not a Git repo, it is stored in <code dir=\"auto\">./global/storage/</code></li>\n</ul>\n</li>\n</ul>\n<hr>\n<h2 id=\"getting-help\"><a href=\"#getting-help\">Getting help</a></h2>\n<p>If you’re experiencing issues with OpenCode:</p>\n<ol>\n<li>\n<p><strong>Report issues on GitHub</strong></p>\n<p>The best way to report bugs or request features is through our GitHub repository:</p>\n<p><a href=\"https://github.com/sst/opencode/issues\"><strong>github.com/sst/opencode/issues</strong></a></p>\n<p>Before creating a new issue, search existing issues to see if your problem has already been reported.</p>\n</li>\n<li>\n<p><strong>Join our Discord</strong></p>\n<p>For real-time help and community discussion, join our Discord server:</p>\n<p><a href=\"https://opencode.ai/discord\"><strong>opencode.ai/discord</strong></a></p>\n</li>\n</ol>\n<hr>\n<h2 id=\"common-issues\"><a href=\"#common-issues\">Common issues</a></h2>\n<p>Here are some common issues and how to resolve them.</p>\n<hr>\n<h3 id=\"opencode-wont-start\"><a href=\"#opencode-wont-start\">opencode won’t start</a></h3>\n<ol>\n<li>Check the logs for error messages</li>\n<li>Try running with <code dir=\"auto\">--print-logs</code> to see output in the terminal</li>\n<li>Ensure you have the latest version with <code dir=\"auto\">opencode upgrade</code></li>\n</ol>\n<hr>\n<h3 id=\"authentication-issues\"><a href=\"#authentication-issues\">Authentication issues</a></h3>\n<ol>\n<li>Try re-authenticating with <code dir=\"auto\">opencode auth login &#x3C;provider></code></li>\n<li>Check that your API keys are valid</li>\n<li>Ensure your network allows connections to the provider’s API</li>\n</ol>\n<hr>\n<h3 id=\"model-not-available\"><a href=\"#model-not-available\">Model not available</a></h3>\n<ol>\n<li>Check that you’ve authenticated with the provider</li>\n<li>Verify the model name in your config is correct</li>\n<li>Some models may require specific access or subscriptions</li>\n</ol>\n<p>If you encounter <code dir=\"auto\">ProviderModelNotFoundError</code> you are most likely incorrectly\nreferencing a model somewhere.\nModels should be referenced like so: <code dir=\"auto\">&#x3C;providerId>/&#x3C;modelId></code></p>\n<p>Examples:</p>\n<ul>\n<li><code dir=\"auto\">openai/gpt-4.1</code></li>\n<li><code dir=\"auto\">openrouter/google/gemini-2.5-flash</code></li>\n<li><code dir=\"auto\">opencode/kimi-k2</code></li>\n</ul>\n<p>To figure out what models you have access to, run <code dir=\"auto\">opencode models</code></p>\n<hr>\n<h3 id=\"provideriniterror\"><a href=\"#provideriniterror\">ProviderInitError</a></h3>\n<p>If you encounter a ProviderInitError, you likely have an invalid or corrupted configuration.</p>\n<p>To resolve this:</p>\n<ol>\n<li>\n<p>First, verify your provider is set up correctly by following the <a href=\"/docs/providers\">providers guide</a></p>\n</li>\n<li>\n<p>If the issue persists, try clearing your stored configuration:</p>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/docs/_astro/ec.4c0k7.css\"><script type=\"module\" src=\"/docs/_astro/ec.p1z7b.js\"></script><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">rm</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">-rf</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">~/.local/share/opencode</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"rm -rf ~/.local/share/opencode\"><div></div></button></div></figure></div>\n</li>\n<li>\n<p>Re-authenticate with your provider:</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">auth</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">login</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">&#x3C;provider></span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode auth login <provider>\"><div></div></button></div></figure></div>\n</li>\n</ol>\n<hr>\n<h3 id=\"ai_apicallerror-and-provider-package-issues\"><a href=\"#ai_apicallerror-and-provider-package-issues\">AI_APICallError and provider package issues</a></h3>\n<p>If you encounter API call errors, this may be due to outdated provider packages. opencode dynamically installs provider packages (OpenAI, Anthropic, Google, etc.) as needed and caches them locally.</p>\n<p>To resolve provider package issues:</p>\n<ol>\n<li>\n<p>Clear the provider package cache:</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">rm</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">-rf</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">~/.cache/opencode</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"rm -rf ~/.cache/opencode\"><div></div></button></div></figure></div>\n</li>\n<li>\n<p>Restart opencode to reinstall the latest provider packages</p>\n</li>\n</ol>\n<p>This will force opencode to download the most recent versions of provider packages, which often resolves compatibility issues with model parameters and API changes.</p>\n<hr>\n<h3 id=\"copypaste-not-working-on-linux\"><a href=\"#copypaste-not-working-on-linux\">Copy/paste not working on Linux</a></h3>\n<p>Linux users need to have one of the following clipboard utilities installed for copy/paste functionality to work:</p>\n<p><strong>For X11 systems:</strong></p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">apt</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">install</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">-y</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">xclip</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\"># or</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">apt</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">install</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">-y</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">xsel</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"apt install -y xclipapt install -y xsel\"><div></div></button></div></figure></div>\n<p><strong>For Wayland systems:</strong></p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">apt</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">install</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">-y</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">wl-clipboard</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"apt install -y wl-clipboard\"><div></div></button></div></figure></div>\n<p><strong>For headless environments:</strong></p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">apt</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">install</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">-y</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">xvfb</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\"># and run:</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">Xvfb</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">:99</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">-screen</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">0</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">1024x768x24</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">></span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">/dev/null</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">2>&#x26;1</span><span style=\"--0:#24292E;--1:#E1E4E8\"> &#x26;</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">export</span><span style=\"--0:#24292E;--1:#E1E4E8\"> DISPLAY</span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\">:99.0</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"apt install -y xvfbXvfb :99 -screen 0 1024x768x24 > /dev/null 2>&#x26;1 &#x26;export DISPLAY=:99.0\"><div></div></button></div></figure></div>\n<p>opencode will detect if you’re using Wayland and prefer <code dir=\"auto\">wl-clipboard</code>, otherwise it will try to find clipboard tools in order of: <code dir=\"auto\">xclip</code> and <code dir=\"auto\">xsel</code>.</p>"
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
const url = "src/content/docs/troubleshooting.mdx";
const file = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/troubleshooting.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/troubleshooting.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
