globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BfFDGVc7.mjs';

const frontmatter = {
  "title": "Share",
  "description": "Share your OpenCode conversations."
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "how-it-works",
    "text": "How it works"
  }, {
    "depth": 2,
    "slug": "sharing",
    "text": "Sharing"
  }, {
    "depth": 3,
    "slug": "manual-default",
    "text": "Manual (default)"
  }, {
    "depth": 3,
    "slug": "auto-share",
    "text": "Auto-share"
  }, {
    "depth": 3,
    "slug": "disabled",
    "text": "Disabled"
  }, {
    "depth": 2,
    "slug": "un-sharing",
    "text": "Un-sharing"
  }, {
    "depth": 2,
    "slug": "privacy",
    "text": "Privacy"
  }, {
    "depth": 3,
    "slug": "data-retention",
    "text": "Data retention"
  }, {
    "depth": 3,
    "slug": "recommendations",
    "text": "Recommendations"
  }, {
    "depth": 2,
    "slug": "for-enterprises",
    "text": "For enterprises"
  }];
}
function _createMdxContent(props) {
  const {Fragment} = props.components || ({});
  if (!Fragment) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    "set:html": "<p>OpenCode’s share feature allows you to create public links to your OpenCode conversations, so you can collaborate with teammates or get help from others.</p>\n<aside aria-label=\"Note\" class=\"starlight-aside starlight-aside--note\"><p class=\"starlight-aside__title\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"starlight-aside__icon\"><path d=\"M12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12.38 7.08C12.1365 6.97998 11.8635 6.97998 11.62 7.08C11.4973 7.12759 11.3851 7.19896 11.29 7.29C11.2017 7.3872 11.1306 7.49882 11.08 7.62C11.024 7.73868 10.9966 7.86882 11 8C10.9992 8.13161 11.0245 8.26207 11.0742 8.38391C11.124 8.50574 11.1973 8.61656 11.29 8.71C11.3872 8.79833 11.4988 8.86936 11.62 8.92C11.7715 8.98224 11.936 9.00632 12.099 8.99011C12.2619 8.97391 12.4184 8.91792 12.5547 8.82707C12.691 8.73622 12.8029 8.61328 12.8805 8.46907C12.9582 8.32486 12.9992 8.16378 13 8C12.9963 7.73523 12.8927 7.48163 12.71 7.29C12.6149 7.19896 12.5028 7.12759 12.38 7.08ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z\"></path></svg>Note</p><div class=\"starlight-aside__content\"><p>Shared conversations are publicly accessible to anyone with the link.</p></div></aside>\n<hr>\n<h2 id=\"how-it-works\"><a href=\"#how-it-works\">How it works</a></h2>\n<p>When you share a conversation, OpenCode:</p>\n<ol>\n<li>Creates a unique public URL for your session</li>\n<li>Syncs your conversation history to our servers</li>\n<li>Makes the conversation accessible via the shareable link — <code dir=\"auto\">opencode.ai/s/&#x3C;share-id></code></li>\n</ol>\n<hr>\n<h2 id=\"sharing\"><a href=\"#sharing\">Sharing</a></h2>\n<p>OpenCode supports three sharing modes that control how conversations are shared:</p>\n<hr>\n<h3 id=\"manual-default\"><a href=\"#manual-default\">Manual (default)</a></h3>\n<p>By default, OpenCode uses manual sharing mode. Sessions are not shared automatically, but you can manually share them using the <code dir=\"auto\">/share</code> command:</p>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/docs/_astro/ec.4c0k7.css\"><script type=\"module\" src=\"/docs/_astro/ec.p1z7b.js\"></script><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"plaintext\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292e;--1:#e1e4e8\">/share</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"/share\"><div></div></button></div></figure></div>\n<p>This will generate a unique URL that’ll be copied to your clipboard.</p>\n<p>To explicitly set manual mode in your <a href=\"/docs/config\">config file</a>:</p>\n<div class=\"expressive-code\"><figure class=\"frame has-title not-content\"><figcaption class=\"header\"><span class=\"title\">opencode.json</span></figcaption><pre data-language=\"json\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">{</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"$schema\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"https://opencode.ai/config.json\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"share\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"manual\"</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">}</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"{  &#x22;$schema&#x22;: &#x22;https://opencode.ai/config.json&#x22;,  &#x22;share&#x22;: &#x22;manual&#x22;}\"><div></div></button></div></figure></div>\n<hr>\n<h3 id=\"auto-share\"><a href=\"#auto-share\">Auto-share</a></h3>\n<p>You can enable automatic sharing for all new conversations by setting the <code dir=\"auto\">share</code> option to <code dir=\"auto\">\"auto\"</code> in your <a href=\"/docs/config\">config file</a>:</p>\n<div class=\"expressive-code\"><figure class=\"frame has-title not-content\"><figcaption class=\"header\"><span class=\"title\">opencode.json</span></figcaption><pre data-language=\"json\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">{</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"$schema\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"https://opencode.ai/config.json\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"share\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"auto\"</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">}</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"{  &#x22;$schema&#x22;: &#x22;https://opencode.ai/config.json&#x22;,  &#x22;share&#x22;: &#x22;auto&#x22;}\"><div></div></button></div></figure></div>\n<p>With auto-share enabled, every new conversation will automatically be shared and a link will be generated.</p>\n<hr>\n<h3 id=\"disabled\"><a href=\"#disabled\">Disabled</a></h3>\n<p>You can disable sharing entirely by setting the <code dir=\"auto\">share</code> option to <code dir=\"auto\">\"disabled\"</code> in your <a href=\"/docs/config\">config file</a>:</p>\n<div class=\"expressive-code\"><figure class=\"frame has-title not-content\"><figcaption class=\"header\"><span class=\"title\">opencode.json</span></figcaption><pre data-language=\"json\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">{</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"$schema\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"https://opencode.ai/config.json\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"share\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"disabled\"</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">}</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"{  &#x22;$schema&#x22;: &#x22;https://opencode.ai/config.json&#x22;,  &#x22;share&#x22;: &#x22;disabled&#x22;}\"><div></div></button></div></figure></div>\n<p>To enforce this across your team for a given project, add it to the <code dir=\"auto\">opencode.json</code> in your project and check into Git.</p>\n<hr>\n<h2 id=\"un-sharing\"><a href=\"#un-sharing\">Un-sharing</a></h2>\n<p>To stop sharing a conversation and remove it from public access:</p>\n<div class=\"expressive-code\"><figure class=\"frame not-content\"><figcaption class=\"header\"></figcaption><pre data-language=\"plaintext\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292e;--1:#e1e4e8\">/unshare</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"/unshare\"><div></div></button></div></figure></div>\n<p>This will remove the share link and delete the data related to the conversation.</p>\n<hr>\n<h2 id=\"privacy\"><a href=\"#privacy\">Privacy</a></h2>\n<p>There are a few things to keep in mind when sharing a conversation.</p>\n<hr>\n<h3 id=\"data-retention\"><a href=\"#data-retention\">Data retention</a></h3>\n<p>Shared conversations remain accessible until you explicitly unshare them. This\nincludes:</p>\n<ul>\n<li>Full conversation history</li>\n<li>All messages and responses</li>\n<li>Session metadata</li>\n</ul>\n<hr>\n<h3 id=\"recommendations\"><a href=\"#recommendations\">Recommendations</a></h3>\n<ul>\n<li>Only share conversations that don’t contain sensitive information.</li>\n<li>Review conversation content before sharing.</li>\n<li>Unshare conversations when collaboration is complete.</li>\n<li>Avoid sharing conversations with proprietary code or confidential data.</li>\n<li>For sensitive projects, disable sharing entirely.</li>\n</ul>\n<hr>\n<h2 id=\"for-enterprises\"><a href=\"#for-enterprises\">For enterprises</a></h2>\n<p>For enterprise deployments, the share feature can be:</p>\n<ul>\n<li><strong>Disabled</strong> entirely for security compliance</li>\n<li><strong>Restricted</strong> to users authenticated through SSO only</li>\n<li><strong>Self-hosted</strong> on your own infrastructure</li>\n</ul>\n<p><a href=\"/docs/enterprise\">Learn more</a> about using opencode in your organization.</p>"
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
const url = "src/content/docs/share.mdx";
const file = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/share.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/share.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
