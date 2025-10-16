globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BfFDGVc7.mjs';
import { c as config } from './config_C9OJ3Thw.mjs';

const frontmatter = {
  "title": "SDK",
  "description": "Type-safe JS client for opencode server."
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "install",
    "text": "Install"
  }, {
    "depth": 2,
    "slug": "create-client",
    "text": "Create client"
  }, {
    "depth": 4,
    "slug": "options",
    "text": "Options"
  }, {
    "depth": 2,
    "slug": "config",
    "text": "Config"
  }, {
    "depth": 2,
    "slug": "client-only",
    "text": "Client only"
  }, {
    "depth": 4,
    "slug": "options-1",
    "text": "Options"
  }, {
    "depth": 2,
    "slug": "types",
    "text": "Types"
  }, {
    "depth": 2,
    "slug": "errors",
    "text": "Errors"
  }, {
    "depth": 2,
    "slug": "apis",
    "text": "APIs"
  }, {
    "depth": 3,
    "slug": "app",
    "text": "App"
  }, {
    "depth": 4,
    "slug": "examples",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "project",
    "text": "Project"
  }, {
    "depth": 4,
    "slug": "examples-1",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "path",
    "text": "Path"
  }, {
    "depth": 4,
    "slug": "examples-2",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "config-1",
    "text": "Config"
  }, {
    "depth": 4,
    "slug": "examples-3",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "sessions",
    "text": "Sessions"
  }, {
    "depth": 4,
    "slug": "examples-4",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "files",
    "text": "Files"
  }, {
    "depth": 4,
    "slug": "examples-5",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "tui",
    "text": "TUI"
  }, {
    "depth": 4,
    "slug": "examples-6",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "auth",
    "text": "Auth"
  }, {
    "depth": 4,
    "slug": "examples-7",
    "text": "Examples"
  }, {
    "depth": 3,
    "slug": "events",
    "text": "Events"
  }, {
    "depth": 4,
    "slug": "examples-8",
    "text": "Examples"
  }];
}
const typesUrl = `${config.github}/blob/dev/packages/sdk/js/src/gen/types.gen.ts`;
function _createMdxContent(props) {
  const _components = {
    code: "code",
    p: "p",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ...props.components
  }, {Fragment: Fragment$1} = _components;
  if (!Fragment$1) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    children: [createVNode(Fragment$1, {
      "set:html": "<p>The opencode JS/TS SDK provides a type-safe client for interacting with the server.\nUse it to build integrations and control opencode programmatically.</p>\n<p><a href=\"/docs/server\">Learn more</a> about how the server works.</p>\n<hr>\n<h2 id=\"install\"><a href=\"#install\">Install</a></h2>\n<p>Install the SDK from npm:</p>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/docs/_astro/ec.4c0k7.css\"><script type=\"module\" src=\"/docs/_astro/ec.p1z7b.js\"></script><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">npm</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">install</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">@opencode-ai/sdk</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"npm install @opencode-ai/sdk\"><div></div></button></div></figure></div>\n<hr>\n<h2 id=\"create-client\"><a href=\"#create-client\">Create client</a></h2>\n<p>Create an instance of opencode:</p>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">import</span><span style=\"--0:#24292E;--1:#E1E4E8\"> { createOpencode } </span><span style=\"--0:#BF3441;--1:#F97583\">from</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"@opencode-ai/sdk\"</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> { </span><span style=\"--0:#005CC5;--1:#79B8FF\">client</span><span style=\"--0:#24292E;--1:#E1E4E8\"> } </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#6F42C1;--1:#B392F0\">createOpencode</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"import { createOpencode } from &#x22;@opencode-ai/sdk&#x22;const { client } = await createOpencode()\"><div></div></button></div></figure></div>\n<p>This starts both a server and a client</p>\n<h4 id=\"options\"><a href=\"#options\">Options</a></h4>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Option</th><th>Type</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code dir=\"auto\">baseUrl</code></td><td><code dir=\"auto\">string</code></td><td>URL of the server</td><td><code dir=\"auto\">http://localhost:4096</code></td></tr><tr><td><code dir=\"auto\">fetch</code></td><td><code dir=\"auto\">function</code></td><td>Custom fetch implementation</td><td><code dir=\"auto\">globalThis.fetch</code></td></tr><tr><td><code dir=\"auto\">parseAs</code></td><td><code dir=\"auto\">string</code></td><td>Response parsing method</td><td><code dir=\"auto\">auto</code></td></tr><tr><td><code dir=\"auto\">responseStyle</code></td><td><code dir=\"auto\">string</code></td><td>Return style: <code dir=\"auto\">data</code> or <code dir=\"auto\">fields</code></td><td><code dir=\"auto\">fields</code></td></tr><tr><td><code dir=\"auto\">throwOnError</code></td><td><code dir=\"auto\">boolean</code></td><td>Throw errors instead of return</td><td><code dir=\"auto\">false</code></td></tr></tbody></table>\n<hr>\n<h2 id=\"config\"><a href=\"#config\">Config</a></h2>\n<p>You can pass a configuration object to customize behavior. The instance still picks up your <code dir=\"auto\">opencode.json</code>, but you can override or add configuration inline:</p>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">import</span><span style=\"--0:#24292E;--1:#E1E4E8\"> { createOpencode } </span><span style=\"--0:#BF3441;--1:#F97583\">from</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"@opencode-ai/sdk\"</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#6F42C1;--1:#B392F0\">createOpencode</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">hostname: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"127.0.0.1\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">port: </span><span style=\"--0:#005CC5;--1:#79B8FF\">4096</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">config: {</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">    </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">model: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"anthropic/claude-3-5-sonnet-20241022\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">},</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">console.</span><span style=\"--0:#6F42C1;--1:#B392F0\">log</span><span style=\"--0:#24292E;--1:#E1E4E8\">(</span><span style=\"--0:#032F62;--1:#9ECBFF\">`Server running at ${</span><span style=\"--0:#24292E;--1:#E1E4E8\">opencode</span><span style=\"--0:#032F62;--1:#9ECBFF\">.</span><span style=\"--0:#24292E;--1:#E1E4E8\">server</span><span style=\"--0:#032F62;--1:#9ECBFF\">.</span><span style=\"--0:#24292E;--1:#E1E4E8\">url</span><span style=\"--0:#032F62;--1:#9ECBFF\">}`</span><span style=\"--0:#24292E;--1:#E1E4E8\">)</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">opencode.server.</span><span style=\"--0:#6F42C1;--1:#B392F0\">close</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"import { createOpencode } from &#x22;@opencode-ai/sdk&#x22;const opencode = await createOpencode({  hostname: &#x22;127.0.0.1&#x22;,  port: 4096,  config: {    model: &#x22;anthropic/claude-3-5-sonnet-20241022&#x22;,  },})console.log(&#x60;Server running at ${opencode.server.url}&#x60;)opencode.server.close()\"><div></div></button></div></figure></div>\n<h2 id=\"client-only\"><a href=\"#client-only\">Client only</a></h2>\n<p>If you aready have a running instance of opencode, you can create a client instance to connect to it:</p>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">import</span><span style=\"--0:#24292E;--1:#E1E4E8\"> { createOpencodeClient } </span><span style=\"--0:#BF3441;--1:#F97583\">from</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"@opencode-ai/sdk\"</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">client</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#6F42C1;--1:#B392F0\">createOpencodeClient</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">baseUrl: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"http://localhost:4096\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"import { createOpencodeClient } from &#x22;@opencode-ai/sdk&#x22;const client = createOpencodeClient({  baseUrl: &#x22;http://localhost:4096&#x22;,})\"><div></div></button></div></figure></div>\n<h4 id=\"options-1\"><a href=\"#options-1\">Options</a></h4>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Option</th><th>Type</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code dir=\"auto\">hostname</code></td><td><code dir=\"auto\">string</code></td><td>Server hostname</td><td><code dir=\"auto\">127.0.0.1</code></td></tr><tr><td><code dir=\"auto\">port</code></td><td><code dir=\"auto\">number</code></td><td>Server port</td><td><code dir=\"auto\">4096</code></td></tr><tr><td><code dir=\"auto\">signal</code></td><td><code dir=\"auto\">AbortSignal</code></td><td>Abort signal for cancellation</td><td><code dir=\"auto\">undefined</code></td></tr><tr><td><code dir=\"auto\">timeout</code></td><td><code dir=\"auto\">number</code></td><td>Timeout in ms for server start</td><td><code dir=\"auto\">5000</code></td></tr><tr><td><code dir=\"auto\">config</code></td><td><code dir=\"auto\">Config</code></td><td>Configuration object</td><td><code dir=\"auto\">{}</code></td></tr></tbody></table>\n<hr>\n<h2 id=\"types\"><a href=\"#types\">Types</a></h2>\n<p>The SDK includes TypeScript definitions for all API types. Import them directly:</p>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"typescript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">import</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">type</span><span style=\"--0:#24292E;--1:#E1E4E8\"> { Session, Message, Part } </span><span style=\"--0:#BF3441;--1:#F97583\">from</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"@opencode-ai/sdk\"</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"import type { Session, Message, Part } from &#x22;@opencode-ai/sdk&#x22;\"><div></div></button></div></figure></div>\n"
    }), createVNode(_components.p, {
      children: ["All types are generated from the server’s OpenAPI specification and available in the ", createVNode("a", {
        href: typesUrl,
        "set:html": "types file"
      }), "."]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h2 id=\"errors\"><a href=\"#errors\">Errors</a></h2>\n<p>The SDK can throw errors that you can catch and handle:</p>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"typescript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">try</span><span style=\"--0:#24292E;--1:#E1E4E8\"> {</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.session.</span><span style=\"--0:#6F42C1;--1:#B392F0\">get</span><span style=\"--0:#24292E;--1:#E1E4E8\">({ path: { id: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"invalid-id\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> } })</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">} </span><span style=\"--0:#BF3441;--1:#F97583\">catch</span><span style=\"--0:#24292E;--1:#E1E4E8\"> (error) {</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">console.</span><span style=\"--0:#6F42C1;--1:#B392F0\">error</span><span style=\"--0:#24292E;--1:#E1E4E8\">(</span><span style=\"--0:#032F62;--1:#9ECBFF\">\"Failed to get session:\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">, (error </span><span style=\"--0:#BF3441;--1:#F97583\">as</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#6F42C1;--1:#B392F0\">Error</span><span style=\"--0:#24292E;--1:#E1E4E8\">).message)</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">}</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"try {  await client.session.get({ path: { id: &#x22;invalid-id&#x22; } })} catch (error) {  console.error(&#x22;Failed to get session:&#x22;, (error as Error).message)}\"><div></div></button></div></figure></div>\n<hr>\n<h2 id=\"apis\"><a href=\"#apis\">APIs</a></h2>\n<p>The SDK exposes all server APIs through a type-safe client.</p>\n<hr>\n<h3 id=\"app\"><a href=\"#app\">App</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Description"
          }), createVNode(_components.th, {
            children: "Response"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "app.log()"
            })
          }), createVNode(_components.td, {
            children: "Write a log entry"
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "boolean"
            })
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "app.agents()"
            })
          }), createVNode(_components.td, {
            children: "List all available agents"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Agent[]</code>"
            })
          })]
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h4 id=\"examples\"><a href=\"#examples\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Write a log entry</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.app.</span><span style=\"--0:#6F42C1;--1:#B392F0\">log</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">body: {</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">    </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">service: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"my-app\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">    </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">level: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"info\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">    </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">message: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"Operation completed\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">},</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// List available agents</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">agents</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.app.</span><span style=\"--0:#6F42C1;--1:#B392F0\">agents</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"// Write a log entryawait client.app.log({  body: {    service: &#x22;my-app&#x22;,    level: &#x22;info&#x22;,    message: &#x22;Operation completed&#x22;,  },})// List available agentsconst agents = await client.app.agents()\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"project\"><a href=\"#project\">Project</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Description"
          }), createVNode(_components.th, {
            children: "Response"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "project.list()"
            })
          }), createVNode(_components.td, {
            children: "List all projects"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Project[]</code>"
            })
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "project.current()"
            })
          }), createVNode(_components.td, {
            children: "Get current project"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Project</code>"
            })
          })]
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h4 id=\"examples-1\"><a href=\"#examples-1\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// List all projects</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">projects</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.project.</span><span style=\"--0:#6F42C1;--1:#B392F0\">list</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Get current project</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">currentProject</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.project.</span><span style=\"--0:#6F42C1;--1:#B392F0\">current</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"// List all projectsconst projects = await client.project.list()// Get current projectconst currentProject = await client.project.current()\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"path\"><a href=\"#path\">Path</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Description"
          }), createVNode(_components.th, {
            children: "Response"
          })]
        })
      }), createVNode(_components.tbody, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "path.get()"
            })
          }), createVNode(_components.td, {
            children: "Get current path"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Path</code>"
            })
          })]
        })
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h4 id=\"examples-2\"><a href=\"#examples-2\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Get current path information</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">pathInfo</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.path.</span><span style=\"--0:#6F42C1;--1:#B392F0\">get</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"// Get current path informationconst pathInfo = await client.path.get()\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"config-1\"><a href=\"#config-1\">Config</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Description"
          }), createVNode(_components.th, {
            children: "Response"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "config.get()"
            })
          }), createVNode(_components.td, {
            children: "Get config info"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Config</code>"
            })
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "config.providers()"
            })
          }), createVNode(_components.td, {
            children: "List providers and default models"
          }), createVNode(_components.td, {
            children: [createVNode(_components.code, {
              dir: "auto",
              children: "{ providers: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Provider[]</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", default: { [key: string]: string } }"
            })]
          })]
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h4 id=\"examples-3\"><a href=\"#examples-3\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">config</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.config.</span><span style=\"--0:#6F42C1;--1:#B392F0\">get</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> { </span><span style=\"--0:#005CC5;--1:#79B8FF\">providers</span><span style=\"--0:#24292E;--1:#E1E4E8\">, </span><span style=\"--0:#AE4B07;--1:#FFAB70\">default</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#005CC5;--1:#79B8FF\">defaults</span><span style=\"--0:#24292E;--1:#E1E4E8\"> } </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.config.</span><span style=\"--0:#6F42C1;--1:#B392F0\">providers</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"const config = await client.config.get()const { providers, default: defaults } = await client.config.providers()\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"sessions\"><a href=\"#sessions\">Sessions</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Description"
          }), createVNode(_components.th, {
            children: "Notes"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.list()"
            })
          }), createVNode(_components.td, {
            children: "List sessions"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session[]</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.get({ path })"
            })
          }), createVNode(_components.td, {
            children: "Get session"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.children({ path })"
            })
          }), createVNode(_components.td, {
            children: "List child sessions"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session[]</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.create({ body })"
            })
          }), createVNode(_components.td, {
            children: "Create session"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          "set:html": "<td><code dir=\"auto\">session.delete({ path })</code></td><td>Delete session</td><td>Returns <code dir=\"auto\">boolean</code></td>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.update({ path, body })"
            })
          }), createVNode(_components.td, {
            children: "Update session properties"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(Fragment$1, {
          "set:html": "<tr><td><code dir=\"auto\">session.init({ path, body })</code></td><td>Analyze app and create <code dir=\"auto\">AGENTS.md</code></td><td>Returns <code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">session.abort({ path })</code></td><td>Abort a running session</td><td>Returns <code dir=\"auto\">boolean</code></td></tr>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.share({ path })"
            })
          }), createVNode(_components.td, {
            children: "Share session"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.unshare({ path })"
            })
          }), createVNode(_components.td, {
            children: "Unshare session"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          "set:html": "<td><code dir=\"auto\">session.summarize({ path, body })</code></td><td>Summarize session</td><td>Returns <code dir=\"auto\">boolean</code></td>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.messages({ path })"
            })
          }), createVNode(_components.td, {
            children: "List messages in a session"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode(_components.code, {
              dir: "auto",
              children: "{ info: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Message</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", parts: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Part[]</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": "}[]"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.message({ path })"
            })
          }), createVNode(_components.td, {
            children: "Get message details"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode(_components.code, {
              dir: "auto",
              children: "{ info: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Message</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", parts: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Part[]</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": "}"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.prompt({ path, body })"
            })
          }), createVNode(_components.td, {
            children: "Send prompt message"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode(_components.code, {
              dir: "auto",
              children: "{ info: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>AssistantMessage</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", parts: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Part[]</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": "}"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.command({ path, body })"
            })
          }), createVNode(_components.td, {
            children: "Send command to session"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode(_components.code, {
              dir: "auto",
              children: "{ info: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>AssistantMessage</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", parts: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Part[]</code>"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": "}"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.shell({ path, body })"
            })
          }), createVNode(_components.td, {
            children: "Run a shell command"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>AssistantMessage</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.revert({ path, body })"
            })
          }), createVNode(_components.td, {
            children: "Revert a message"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "session.unrevert({ path })"
            })
          }), createVNode(_components.td, {
            children: "Restore reverted messages"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          "set:html": "<td><code dir=\"auto\">postSessionByIdPermissionsByPermissionId({ path, body })</code></td><td>Respond to a permission request</td><td>Returns <code dir=\"auto\">boolean</code></td>"
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h4 id=\"examples-4\"><a href=\"#examples-4\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Create and manage sessions</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">session</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.session.</span><span style=\"--0:#6F42C1;--1:#B392F0\">create</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">body: { title: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"My session\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">sessions</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.session.</span><span style=\"--0:#6F42C1;--1:#B392F0\">list</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Send a prompt message</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">result</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.session.</span><span style=\"--0:#6F42C1;--1:#B392F0\">prompt</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">path: { id: session.id },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">body: {</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">    </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">model: { providerID: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"anthropic\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">, modelID: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"claude-3-5-sonnet-20241022\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">    </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">parts: [{ type: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"text\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">, text: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"Hello!\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> }],</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">},</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"// Create and manage sessionsconst session = await client.session.create({  body: { title: &#x22;My session&#x22; },})const sessions = await client.session.list()// Send a prompt messageconst result = await client.session.prompt({  path: { id: session.id },  body: {    model: { providerID: &#x22;anthropic&#x22;, modelID: &#x22;claude-3-5-sonnet-20241022&#x22; },    parts: [{ type: &#x22;text&#x22;, text: &#x22;Hello!&#x22; }],  },})\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"files\"><a href=\"#files\">Files</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Description"
          }), createVNode(_components.th, {
            children: "Response"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "find.text({ query })"
            })
          }), createVNode(_components.td, {
            children: "Search for text in files"
          }), createVNode(_components.td, {
            children: ["Array of match objects with ", createVNode(_components.code, {
              dir: "auto",
              children: "path"
            }), ", ", createVNode(_components.code, {
              dir: "auto",
              children: "lines"
            }), ", ", createVNode(_components.code, {
              dir: "auto",
              children: "line_number"
            }), ", ", createVNode(_components.code, {
              dir: "auto",
              children: "absolute_offset"
            }), ", ", createVNode(_components.code, {
              dir: "auto",
              children: "submatches"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "find.files({ query })"
            })
          }), createVNode(_components.td, {
            children: "Find files by name"
          }), createVNode(_components.td, {
            children: [createVNode(_components.code, {
              dir: "auto",
              children: "string[]"
            }), " (file paths)"]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "find.symbols({ query })"
            })
          }), createVNode(_components.td, {
            children: "Find workspace symbols"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Symbol[]</code>"
            })
          })]
        }), createVNode(_components.tr, {
          "set:html": "<td><code dir=\"auto\">file.read({ query })</code></td><td>Read a file</td><td><code dir=\"auto\">{ type: \"raw\" | \"patch\", content: string }</code></td>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "file.status({ query? })"
            })
          }), createVNode(_components.td, {
            children: "Get status for tracked files"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>File[]</code>"
            })
          })]
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h4 id=\"examples-5\"><a href=\"#examples-5\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Search and read files</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">textResults</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.find.</span><span style=\"--0:#6F42C1;--1:#B392F0\">text</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">query: { pattern: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"function.*opencode\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">files</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.find.</span><span style=\"--0:#6F42C1;--1:#B392F0\">files</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">query: { query: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"*.ts\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">content</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.file.</span><span style=\"--0:#6F42C1;--1:#B392F0\">read</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">query: { path: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"src/index.ts\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"// Search and read filesconst textResults = await client.find.text({  query: { pattern: &#x22;function.*opencode&#x22; },})const files = await client.find.files({  query: { query: &#x22;*.ts&#x22; },})const content = await client.file.read({  query: { path: &#x22;src/index.ts&#x22; },})\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"tui\"><a href=\"#tui\">TUI</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">tui.appendPrompt({ body })</code></td><td>Append text to the prompt</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.openHelp()</code></td><td>Open the help dialog</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.openSessions()</code></td><td>Open the session selector</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.openThemes()</code></td><td>Open the theme selector</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.openModels()</code></td><td>Open the model selector</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.submitPrompt()</code></td><td>Submit the current prompt</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.clearPrompt()</code></td><td>Clear the prompt</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.executeCommand({ body })</code></td><td>Execute a command</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">tui.showToast({ body })</code></td><td>Show toast notification</td><td><code dir=\"auto\">boolean</code></td></tr></tbody></table>\n<hr>\n<h4 id=\"examples-6\"><a href=\"#examples-6\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Control TUI interface</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.tui.</span><span style=\"--0:#6F42C1;--1:#B392F0\">appendPrompt</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">body: { text: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"Add this to prompt\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div><div class=\"ec-line\"><div class=\"code\">\n</div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.tui.</span><span style=\"--0:#6F42C1;--1:#B392F0\">showToast</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">body: { message: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"Task completed\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">, variant: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"success\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"// Control TUI interfaceawait client.tui.appendPrompt({  body: { text: &#x22;Add this to prompt&#x22; },})await client.tui.showToast({  body: { message: &#x22;Task completed&#x22;, variant: &#x22;success&#x22; },})\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"auth\"><a href=\"#auth\">Auth</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">auth.set({ ... })</code></td><td>Set authentication credentials</td><td><code dir=\"auto\">boolean</code></td></tr></tbody></table>\n<hr>\n<h4 id=\"examples-7\"><a href=\"#examples-7\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.auth.</span><span style=\"--0:#6F42C1;--1:#B392F0\">set</span><span style=\"--0:#24292E;--1:#E1E4E8\">({</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">path: { id: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"anthropic\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">body: { type: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"api\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">, key: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"your-api-key\"</span><span style=\"--0:#24292E;--1:#E1E4E8\"> },</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">})</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"await client.auth.set({  path: { id: &#x22;anthropic&#x22; },  body: { type: &#x22;api&#x22;, key: &#x22;your-api-key&#x22; },})\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"events\"><a href=\"#events\">Events</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">event.subscribe()</code></td><td>Server-sent events stream</td><td>Server-sent events stream</td></tr></tbody></table>\n<hr>\n<h4 id=\"examples-8\"><a href=\"#examples-8\">Examples</a></h4>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"javascript\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#616972;--1:#99A0A6\">// Listen to real-time events</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">events</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> client.event.</span><span style=\"--0:#6F42C1;--1:#B392F0\">subscribe</span><span style=\"--0:#24292E;--1:#E1E4E8\">()</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#BF3441;--1:#F97583\">for</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">await</span><span style=\"--0:#24292E;--1:#E1E4E8\"> (</span><span style=\"--0:#BF3441;--1:#F97583\">const</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">event</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#BF3441;--1:#F97583\">of</span><span style=\"--0:#24292E;--1:#E1E4E8\"> events.stream) {</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\"><span style=\"--0:#24292E;--1:#E1E4E8\">  </span></span><span style=\"--0:#24292E;--1:#E1E4E8\">console.</span><span style=\"--0:#6F42C1;--1:#B392F0\">log</span><span style=\"--0:#24292E;--1:#E1E4E8\">(</span><span style=\"--0:#032F62;--1:#9ECBFF\">\"Event:\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">, event.type, event.properties)</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">}</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"// Listen to real-time eventsconst events = await client.event.subscribe()for await (const event of events.stream) {  console.log(&#x22;Event:&#x22;, event.type, event.properties)}\"><div></div></button></div></figure></div>"
    })]
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

const url = "src/content/docs/sdk.mdx";
const file = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/sdk.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/sdk.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, typesUrl, url };
