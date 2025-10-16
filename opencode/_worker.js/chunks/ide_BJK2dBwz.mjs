globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BfFDGVc7.mjs';

const frontmatter = {
  "title": "IDE",
  "description": "The OpenCode extension for VS Code, Cursor, and other IDEs"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "usage",
    "text": "Usage"
  }, {
    "depth": 2,
    "slug": "installation",
    "text": "Installation"
  }, {
    "depth": 3,
    "slug": "manual-install",
    "text": "Manual Install"
  }, {
    "depth": 3,
    "slug": "troubleshooting",
    "text": "Troubleshooting"
  }];
}
function _createMdxContent(props) {
  const {Fragment} = props.components || ({});
  if (!Fragment) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    "set:html": "<p>OpenCode integrates with VS Code, Cursor, or any IDE that supports a terminal. Just run <code dir=\"auto\">opencode</code> in the terminal to get started.</p>\n<hr>\n<h2 id=\"usage\"><a href=\"#usage\">Usage</a></h2>\n<ul>\n<li><strong>Quick Launch</strong>: Use <code dir=\"auto\">Cmd+Esc</code> (Mac) or <code dir=\"auto\">Ctrl+Esc</code> (Windows/Linux) to open OpenCode in a split terminal view, or focus an existing terminal session if one is already running.</li>\n<li><strong>New Session</strong>: Use <code dir=\"auto\">Cmd+Shift+Esc</code> (Mac) or <code dir=\"auto\">Ctrl+Shift+Esc</code> (Windows/Linux) to start a new OpenCode terminal session, even if one is already open. You can also click the OpenCode button in the UI.</li>\n<li><strong>Context Awareness</strong>: Automatically share your current selection or tab with OpenCode.</li>\n<li><strong>File Reference Shortcuts</strong>: Use <code dir=\"auto\">Cmd+Option+K</code> (Mac) or <code dir=\"auto\">Alt+Ctrl+K</code> (Linux/Windows) to insert file references. For example, <code dir=\"auto\">@File#L37-42</code>.</li>\n</ul>\n<hr>\n<h2 id=\"installation\"><a href=\"#installation\">Installation</a></h2>\n<p>To install OpenCode on VS Code and popular forks like Cursor, Windsurf, VSCodium:</p>\n<ol>\n<li>Open VS Code</li>\n<li>Open the integrated terminal</li>\n<li>Run <code dir=\"auto\">opencode</code> - the extension installs automatically</li>\n</ol>\n<p>If on the other hand you want to use your own IDE when you run <code dir=\"auto\">/editor</code> or <code dir=\"auto\">/export</code> from the TUI, you’ll need to set <code dir=\"auto\">export EDITOR=\"code --wait\"</code>. <a href=\"/docs/tui/#editor-setup\">Learn more</a>.</p>\n<hr>\n<h3 id=\"manual-install\"><a href=\"#manual-install\">Manual Install</a></h3>\n<p>Search for <strong>OpenCode</strong> in the Extension Marketplace and click <strong>Install</strong>.</p>\n<hr>\n<h3 id=\"troubleshooting\"><a href=\"#troubleshooting\">Troubleshooting</a></h3>\n<p>If the extension fails to install automatically:</p>\n<ul>\n<li>Ensure you’re running <code dir=\"auto\">opencode</code> in the integrated terminal.</li>\n<li>Confirm the CLI for your IDE is installed:\n<ul>\n<li>For VS Code: <code dir=\"auto\">code</code> command</li>\n<li>For Cursor: <code dir=\"auto\">cursor</code> command</li>\n<li>For Windsurf: <code dir=\"auto\">windsurf</code> command</li>\n<li>For VSCodium: <code dir=\"auto\">codium</code> command</li>\n<li>If not, run <code dir=\"auto\">Cmd+Shift+P</code> (Mac) or <code dir=\"auto\">Ctrl+Shift+P</code> (Windows/Linux) and search for “Shell Command: Install ‘code’ command in PATH” (or the equivalent for your IDE)</li>\n</ul>\n</li>\n<li>Ensure VS Code has permission to install extensions</li>\n</ul>"
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
const url = "src/content/docs/ide.mdx";
const file = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/ide.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/ide.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
