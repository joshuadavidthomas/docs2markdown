globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BfFDGVc7.mjs';
import { c as config } from './config_C9OJ3Thw.mjs';

const frontmatter = {
  "title": "Server",
  "description": "Interact with opencode server over HTTP."
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "usage",
    "text": "Usage"
  }, {
    "depth": 4,
    "slug": "options",
    "text": "Options"
  }, {
    "depth": 3,
    "slug": "how-it-works",
    "text": "How it works"
  }, {
    "depth": 4,
    "slug": "connect-to-an-existing-server",
    "text": "Connect to an existing server"
  }, {
    "depth": 2,
    "slug": "spec",
    "text": "Spec"
  }, {
    "depth": 2,
    "slug": "apis",
    "text": "APIs"
  }, {
    "depth": 3,
    "slug": "app",
    "text": "App"
  }, {
    "depth": 3,
    "slug": "config",
    "text": "Config"
  }, {
    "depth": 3,
    "slug": "sessions",
    "text": "Sessions"
  }, {
    "depth": 3,
    "slug": "files",
    "text": "Files"
  }, {
    "depth": 3,
    "slug": "logging",
    "text": "Logging"
  }, {
    "depth": 3,
    "slug": "agents",
    "text": "Agents"
  }, {
    "depth": 3,
    "slug": "tui",
    "text": "TUI"
  }, {
    "depth": 3,
    "slug": "auth",
    "text": "Auth"
  }, {
    "depth": 3,
    "slug": "events",
    "text": "Events"
  }, {
    "depth": 3,
    "slug": "docs",
    "text": "Docs"
  }];
}
const typesUrl = `${config.github}/blob/dev/packages/sdk/js/src/gen/types.gen.ts`;
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
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
      "set:html": "<p>The <code dir=\"auto\">opencode serve</code> command runs a headless HTTP server that exposes an OpenAPI endpoint that an opencode client can use.</p>\n<hr>\n<h3 id=\"usage\"><a href=\"#usage\">Usage</a></h3>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/docs/_astro/ec.4c0k7.css\"><script type=\"module\" src=\"/docs/_astro/ec.p1z7b.js\"></script><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">opencode</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">serve</span><span style=\"--0:#24292E;--1:#E1E4E8\"> [--port </span><span style=\"--0:#032F62;--1:#9ECBFF\">&#x3C;number>]</span><span style=\"--0:#24292E;--1:#E1E4E8\"> [--hostname </span><span style=\"--0:#032F62;--1:#9ECBFF\">&#x3C;string>]</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"opencode serve [--port <number>] [--hostname <string>]\"><div></div></button></div></figure></div>\n<h4 id=\"options\"><a href=\"#options\">Options</a></h4>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Flag</th><th>Short</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code dir=\"auto\">--port</code></td><td><code dir=\"auto\">-p</code></td><td>Port to listen on</td><td><code dir=\"auto\">4096</code></td></tr><tr><td><code dir=\"auto\">--hostname</code></td><td><code dir=\"auto\">-h</code></td><td>Hostname to listen on</td><td><code dir=\"auto\">127.0.0.1</code></td></tr></tbody></table>\n<hr>\n<h3 id=\"how-it-works\"><a href=\"#how-it-works\">How it works</a></h3>\n<p>When you run <code dir=\"auto\">opencode</code> it starts a TUI and a server. Where the TUI is the\nclient that talks to the server. The server exposes an OpenAPI 3.1 spec\nendpoint. This endpoint is also used to generate an <a href=\"/docs/sdk\">SDK</a>.</p>\n<aside aria-label=\"Tip\" class=\"starlight-aside starlight-aside--tip\"><p class=\"starlight-aside__title\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"starlight-aside__icon\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1.43909 8.85483L1.44039 8.85354L4.96668 5.33815C5.30653 4.99386 5.7685 4.79662 6.2524 4.78972L6.26553 4.78963L12.9014 4.78962L13.8479 3.84308C16.9187 0.772319 20.0546 0.770617 21.4678 0.975145C21.8617 1.02914 22.2271 1.21053 22.5083 1.4917C22.7894 1.77284 22.9708 2.13821 23.0248 2.53199C23.2294 3.94517 23.2278 7.08119 20.1569 10.1521L19.2107 11.0983V17.7338L19.2106 17.7469C19.2037 18.2308 19.0067 18.6933 18.6624 19.0331L15.1456 22.5608C14.9095 22.7966 14.6137 22.964 14.29 23.0449C13.9663 23.1259 13.6267 23.1174 13.3074 23.0204C12.9881 22.9235 12.7011 22.7417 12.4771 22.4944C12.2533 22.2473 12.1006 21.9441 12.0355 21.6171L11.1783 17.3417L6.65869 12.822L4.34847 12.3589L2.38351 11.965C2.05664 11.8998 1.75272 11.747 1.50564 11.5232C1.25835 11.2992 1.07653 11.0122 0.979561 10.6929C0.882595 10.3736 0.874125 10.034 0.955057 9.7103C1.03599 9.38659 1.20328 9.09092 1.43909 8.85483ZM6.8186 10.8724L2.94619 10.096L6.32006 6.73268H10.9583L6.8186 10.8724ZM15.2219 5.21703C17.681 2.75787 20.0783 2.75376 21.1124 2.8876C21.2462 3.92172 21.2421 6.31895 18.783 8.77812L12.0728 15.4883L8.51172 11.9272L15.2219 5.21703ZM13.9042 21.0538L13.1279 17.1811L17.2676 13.0414V17.68L13.9042 21.0538Z\"></path><path d=\"M9.31827 18.3446C9.45046 17.8529 9.17864 17.3369 8.68945 17.1724C8.56178 17.1294 8.43145 17.1145 8.30512 17.1243C8.10513 17.1398 7.91519 17.2172 7.76181 17.3434C7.62613 17.455 7.51905 17.6048 7.45893 17.7835C6.97634 19.2186 5.77062 19.9878 4.52406 20.4029C4.08525 20.549 3.6605 20.644 3.29471 20.7053C3.35607 20.3395 3.45098 19.9148 3.59711 19.476C4.01221 18.2294 4.78141 17.0237 6.21648 16.5411C6.39528 16.481 6.54504 16.3739 6.65665 16.2382C6.85126 16.0016 6.92988 15.678 6.84417 15.3647C6.83922 15.3466 6.83373 15.3286 6.82767 15.3106C6.74106 15.053 6.55701 14.8557 6.33037 14.7459C6.10949 14.6389 5.84816 14.615 5.59715 14.6994C5.47743 14.7397 5.36103 14.7831 5.24786 14.8294C3.22626 15.6569 2.2347 17.4173 1.75357 18.8621C1.49662 19.6337 1.36993 20.3554 1.30679 20.8818C1.27505 21.1464 1.25893 21.3654 1.25072 21.5213C1.24662 21.5993 1.24448 21.6618 1.24337 21.7066L1.243 21.7226L1.24235 21.7605L1.2422 21.7771L1.24217 21.7827L1.24217 21.7856C1.24217 22.3221 1.67703 22.7579 2.2137 22.7579L2.2155 22.7579L2.22337 22.7578L2.23956 22.7577C2.25293 22.7575 2.27096 22.7572 2.29338 22.7567C2.33821 22.7555 2.40073 22.7534 2.47876 22.7493C2.63466 22.7411 2.85361 22.725 3.11822 22.6932C3.64462 22.6301 4.36636 22.5034 5.13797 22.2464C6.58274 21.7653 8.3431 20.7738 9.17063 18.7522C9.21696 18.639 9.26037 18.5226 9.30064 18.4029C9.30716 18.3835 9.31304 18.364 9.31827 18.3446Z\"></path></svg>Tip</p><div class=\"starlight-aside__content\"><p>Use the opencode server to interact with opencode programmatically.</p></div></aside>\n<p>This architecture lets opencode support multiple clients and allows you to interact with opencode programmatically.</p>\n<p>You can run <code dir=\"auto\">opencode serve</code> to start a standalone server. If you have the\nopencode TUI running, <code dir=\"auto\">opencode serve</code> will start a new server.</p>\n<hr>\n<h4 id=\"connect-to-an-existing-server\"><a href=\"#connect-to-an-existing-server\">Connect to an existing server</a></h4>\n<p>When you start the TUI it randomly assigns a port and hostname. You can instead pass in the <code dir=\"auto\">--hostname</code> and <code dir=\"auto\">--port</code> <a href=\"/docs/cli\">flags</a>. Then use this to connect to its server.</p>\n<p>The <a href=\"#tui\"><code dir=\"auto\">/tui</code></a> endpoint can be used to drive the TUI through the server. For example, you can prefill or run a prompt. This setup is used by the OpenCode <a href=\"/docs/ide\">IDE</a> plugins.</p>\n<hr>\n<h2 id=\"spec\"><a href=\"#spec\">Spec</a></h2>\n<p>The server publishes an OpenAPI 3.1 spec that can be viewed at:</p>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"plaintext\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292e;--1:#e1e4e8\">http://&#x3C;hostname>:&#x3C;port>/doc</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"http://<hostname>:<port>/doc\"><div></div></button></div></figure></div>\n<p>For example, <code dir=\"auto\">http://localhost:4096/doc</code>. Use the spec to generate clients or inspect request and response types. Or view it in a Swagger explorer.</p>\n<hr>\n<h2 id=\"apis\"><a href=\"#apis\">APIs</a></h2>\n<p>The opencode server exposes the following APIs.</p>\n<hr>\n<h3 id=\"app\"><a href=\"#app\">App</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Path"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/app"
            })
          }), createVNode(_components.td, {
            children: "Get app info"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>App</code>"
            })
          })]
        }), createVNode(_components.tr, {
          "set:html": "<td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/app/init</code></td><td>Initialize the app</td><td><code dir=\"auto\">boolean</code></td>"
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h3 id=\"config\"><a href=\"#config\">Config</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Path"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/config"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/config/providers"
            })
          }), createVNode(_components.td, {
            children: "List providers and default models"
          }), createVNode(_components.td, {
            children: [createVNode(_components.code, {
              dir: "auto",
              children: "{ providers: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "Provider[]"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", default: { [key: string]: string } }"
            })]
          })]
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h3 id=\"sessions\"><a href=\"#sessions\">Sessions</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Path"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id/children"
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
              children: "POST"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session"
            })
          }), createVNode(_components.td, {
            children: "Create session"
          }), createVNode(_components.td, {
            children: ["body: ", createVNode(_components.code, {
              dir: "auto",
              children: "{ parentID?, title? }"
            }), ", returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          "set:html": "<td><code dir=\"auto\">DELETE</code></td><td><code dir=\"auto\">/session/:id</code></td><td>Delete session</td><td></td>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "PATCH"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id"
            })
          }), createVNode(_components.td, {
            children: "Update session properties"
          }), createVNode(_components.td, {
            children: ["body: ", createVNode(_components.code, {
              dir: "auto",
              children: "{ title? }"
            }), ", returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Session</code>"
            })]
          })]
        }), createVNode(Fragment$1, {
          "set:html": "<tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/session/:id/init</code></td><td>Analyze app and create <code dir=\"auto\">AGENTS.md</code></td><td>body: <code dir=\"auto\">{ messageID, providerID, modelID }</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/session/:id/abort</code></td><td>Abort a running session</td><td></td></tr>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "POST"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id/share"
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
              children: "DELETE"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id/share"
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
          "set:html": "<td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/session/:id/summarize</code></td><td>Summarize session</td><td></td>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id/message"
            })
          }), createVNode(_components.td, {
            children: "List messages in a session"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode(_components.code, {
              dir: "auto",
              children: "{ info: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "Message"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", parts: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "Part[]"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": "}[]"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id/message/:messageID"
            })
          }), createVNode(_components.td, {
            children: "Get message details"
          }), createVNode(_components.td, {
            children: ["Returns ", createVNode(_components.code, {
              dir: "auto",
              children: "{ info: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "Message"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": ", parts: "
            }), createVNode("a", {
              href: typesUrl,
              "set:html": "Part[]"
            }), createVNode(_components.code, {
              dir: "auto",
              "set:html": "}"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "POST"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id/message"
            })
          }), createVNode(_components.td, {
            children: "Send chat message"
          }), createVNode(_components.td, {
            children: ["body matches ", createVNode(_components.a, {
              href: "https://github.com/sst/opencode/blob/main/packages/opencode/src/session/index.ts#L358",
              children: createVNode(_components.code, {
                dir: "auto",
                children: "ChatInput"
              })
            }), ", returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Message</code>"
            })]
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "POST"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/session/:id/shell"
            })
          }), createVNode(_components.td, {
            children: "Run a shell command"
          }), createVNode(_components.td, {
            children: ["body matches ", createVNode(_components.a, {
              href: "https://github.com/sst/opencode/blob/main/packages/opencode/src/session/index.ts#L1007",
              children: createVNode(_components.code, {
                dir: "auto",
                children: "CommandInput"
              })
            }), ", returns ", createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Message</code>"
            })]
          })]
        }), createVNode(Fragment$1, {
          "set:html": "<tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/session/:id/revert</code></td><td>Revert a message</td><td>body: <code dir=\"auto\">{ messageID }</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/session/:id/unrevert</code></td><td>Restore reverted messages</td><td></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/session/:id/permissions/:permissionID</code></td><td>Respond to a permission request</td><td>body: <code dir=\"auto\">{ response }</code></td></tr>"
        })]
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h3 id=\"files\"><a href=\"#files\">Files</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Path"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/find?pattern=<pat>"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/find/file?query=<q>"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/find/symbol?query=<q>"
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
          "set:html": "<td><code dir=\"auto\">GET</code></td><td><code dir=\"auto\">/file?path=&#x3C;path></code></td><td>Read a file</td><td><code dir=\"auto\">{ type: \"raw\" | \"patch\", content: string }</code></td>"
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/file/status"
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
      "set:html": "<hr>\n<h3 id=\"logging\"><a href=\"#logging\">Logging</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/log</code></td><td>Write log entry. Body: <code dir=\"auto\">{ service, level, message, extra? }</code></td><td><code dir=\"auto\">boolean</code></td></tr></tbody></table>\n<hr>\n<h3 id=\"agents\"><a href=\"#agents\">Agents</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    }), createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            children: "Method"
          }), createVNode(_components.th, {
            children: "Path"
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
              children: "GET"
            })
          }), createVNode(_components.td, {
            children: createVNode(_components.code, {
              dir: "auto",
              children: "/agent"
            })
          }), createVNode(_components.td, {
            children: "List all available agents"
          }), createVNode(_components.td, {
            children: createVNode("a", {
              href: typesUrl,
              "set:html": "<code>Agent[]</code>"
            })
          })]
        })
      })]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h3 id=\"tui\"><a href=\"#tui\">TUI</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/append-prompt</code></td><td>Append text to the prompt</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/open-help</code></td><td>Open the help dialog</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/open-sessions</code></td><td>Open the session selector</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/open-themes</code></td><td>Open the theme selector</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/open-models</code></td><td>Open the model selector</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/submit-prompt</code></td><td>Submit the current prompt</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/clear-prompt</code></td><td>Clear the prompt</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/execute-command</code></td><td>Execute a command (<code dir=\"auto\">{ command }</code>)</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/show-toast</code></td><td>Show toast (<code dir=\"auto\">{ title?, message, variant }</code>)</td><td><code dir=\"auto\">boolean</code></td></tr><tr><td><code dir=\"auto\">GET</code></td><td><code dir=\"auto\">/tui/control/next</code></td><td>Wait for the next control request</td><td>Control request object</td></tr><tr><td><code dir=\"auto\">POST</code></td><td><code dir=\"auto\">/tui/control/response</code></td><td>Respond to a control request (<code dir=\"auto\">{ body }</code>)</td><td><code dir=\"auto\">boolean</code></td></tr></tbody></table>\n<hr>\n<h3 id=\"auth\"><a href=\"#auth\">Auth</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">PUT</code></td><td><code dir=\"auto\">/auth/:id</code></td><td>Set authentication credentials. Body must match provider schema</td><td><code dir=\"auto\">boolean</code></td></tr></tbody></table>\n<hr>\n<h3 id=\"events\"><a href=\"#events\">Events</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">GET</code></td><td><code dir=\"auto\">/event</code></td><td>Server-sent events stream. First event is <code dir=\"auto\">server.connected</code>, then bus events</td><td>Server-sent events stream</td></tr></tbody></table>\n<hr>\n<h3 id=\"docs\"><a href=\"#docs\">Docs</a></h3>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Response</th></tr></thead><tbody><tr><td><code dir=\"auto\">GET</code></td><td><code dir=\"auto\">/doc</code></td><td>OpenAPI 3.1 specification</td><td>HTML page with OpenAPI spec</td></tr></tbody></table>"
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

const url = "src/content/docs/server.mdx";
const file = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/server.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/server.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, typesUrl, url };
