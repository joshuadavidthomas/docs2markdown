globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_BfFDGVc7.mjs';
import { c as config } from './config_C9OJ3Thw.mjs';

const frontmatter = {
  "title": "Enterprise",
  "description": "Using OpenCode in your organization."
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "trial",
    "text": "Trial"
  }, {
    "depth": 3,
    "slug": "data-handling",
    "text": "Data handling"
  }, {
    "depth": 4,
    "slug": "sharing-conversations",
    "text": "Sharing conversations"
  }, {
    "depth": 3,
    "slug": "code-ownership",
    "text": "Code ownership"
  }, {
    "depth": 2,
    "slug": "deployment",
    "text": "Deployment"
  }, {
    "depth": 3,
    "slug": "sso",
    "text": "SSO"
  }, {
    "depth": 3,
    "slug": "private-npm",
    "text": "Private NPM"
  }, {
    "depth": 3,
    "slug": "self-hosting",
    "text": "Self-hosting"
  }];
}
const email = `mailto:${config.email}`;
function _createMdxContent(props) {
  const _components = {
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ...props.components
  }, {Fragment: Fragment$1} = _components;
  if (!Fragment$1) _missingMdxReference("Fragment");
  return createVNode(Fragment, {
    children: [createVNode(Fragment$1, {
      "set:html": "<p>OpenCode does not store any of your code or context data. This makes it easy for\nyou to use OpenCode at your organization.</p>\n<p>To get started, we recommend:</p>\n"
    }), createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Do a trial internally with your team."
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: createVNode("a", {
            href: email,
            "set:html": "Contact us"
          })
        }), " to discuss pricing and implementation options."]
      }), "\n"]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h2 id=\"trial\"><a href=\"#trial\">Trial</a></h2>\n<p>Since OpenCode is open source and does not store any of your code or context data, your developers can simply <a href=\"/docs/\">get started</a> and carry out a trial.</p>\n<hr>\n<h3 id=\"data-handling\"><a href=\"#data-handling\">Data handling</a></h3>\n<p><strong>opencode does not store your code or context data.</strong> All processing happens locally or through direct API calls to your AI provider.</p>\n<p>The only caveat here is the optional <code dir=\"auto\">/share</code> feature.</p>\n<hr>\n<h4 id=\"sharing-conversations\"><a href=\"#sharing-conversations\">Sharing conversations</a></h4>\n<p>If a user enables the <code dir=\"auto\">/share</code> feature, the conversation and the data associated with it are sent to the service we use to host these shares pages at opencode.ai.</p>\n<p>The data is currently served through our CDN’s edge network, and is cached on the edge near your users.</p>\n<p>We recommend you disable this for your trial.</p>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/docs/_astro/ec.4c0k7.css\"><script type=\"module\" src=\"/docs/_astro/ec.p1z7b.js\"></script><figure class=\"frame has-title not-content\"><figcaption class=\"header\"><span class=\"title\">opencode.json</span></figcaption><pre data-language=\"json\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">{</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"$schema\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"https://opencode.ai/config.json\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">,</span></div></div><div class=\"ec-line\"><div class=\"code\"><span class=\"indent\">  </span><span style=\"--0:#005CC5;--1:#79B8FF\">\"share\"</span><span style=\"--0:#24292E;--1:#E1E4E8\">: </span><span style=\"--0:#032F62;--1:#9ECBFF\">\"disabled\"</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">}</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"{  &#x22;$schema&#x22;: &#x22;https://opencode.ai/config.json&#x22;,  &#x22;share&#x22;: &#x22;disabled&#x22;}\"><div></div></button></div></figure></div>\n<p><a href=\"/docs/share\">Learn more about sharing</a>.</p>\n<hr>\n<h3 id=\"code-ownership\"><a href=\"#code-ownership\">Code ownership</a></h3>\n<p><strong>You own all code produced by opencode.</strong> There are no licensing restrictions or ownership claims.</p>\n<hr>\n<h2 id=\"deployment\"><a href=\"#deployment\">Deployment</a></h2>\n"
    }), createVNode(_components.p, {
      children: ["Once you have completed your trial and you are ready to self-host opencode at\nyour organization, you can ", createVNode(_components.strong, {
        children: createVNode("a", {
          href: email,
          "set:html": "contact us"
        })
      }), " to discuss\npricing and implementation options."]
    }), "\n", createVNode(Fragment$1, {
      "set:html": "<hr>\n<h3 id=\"sso\"><a href=\"#sso\">SSO</a></h3>\n<p>SSO integration can be implemented for enterprise deployments after your trial.\nThis will allow your team’s session data and shared conversations to be protected\nby your enterprise’s authentication system.</p>\n<hr>\n<h3 id=\"private-npm\"><a href=\"#private-npm\">Private NPM</a></h3>\n<p>opencode supports private npm registries through Bun’s native <code dir=\"auto\">.npmrc</code> file support. If your organization uses a private registry, such as JFrog Artifactory, Nexus, or similar, ensure developers are authenticated before running opencode.</p>\n<p>To set up authentication with your private registry:</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">npm</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#032F62;--1:#9ECBFF\">login</span><span style=\"--0:#24292E;--1:#E1E4E8\"> </span><span style=\"--0:#005CC5;--1:#79B8FF\">--registry=https://your-company.jfrog.io/api/npm/npm-virtual/</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"npm login --registry=https://your-company.jfrog.io/api/npm/npm-virtual/\"><div></div></button></div></figure></div>\n<p>This creates <code dir=\"auto\">~/.npmrc</code> with authentication details. opencode will automatically\npick this up.</p>\n<aside aria-label=\"Caution\" class=\"starlight-aside starlight-aside--caution\"><p class=\"starlight-aside__title\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"starlight-aside__icon\"><path d=\"M12 16C11.8022 16 11.6089 16.0587 11.4444 16.1686C11.28 16.2784 11.1518 16.4346 11.0761 16.6173C11.0004 16.8001 10.9806 17.0011 11.0192 17.1951C11.0578 17.3891 11.153 17.5673 11.2929 17.7071C11.4327 17.847 11.6109 17.9422 11.8049 17.9808C11.9989 18.0194 12.2 17.9996 12.3827 17.9239C12.5654 17.8482 12.7216 17.72 12.8315 17.5556C12.9413 17.3911 13 17.1978 13 17C13 16.7348 12.8946 16.4805 12.7071 16.2929C12.5196 16.1054 12.2652 16 12 16ZM22.67 17.47L14.62 3.47003C14.3598 3.00354 13.9798 2.61498 13.5192 2.3445C13.0586 2.07401 12.5341 1.9314 12 1.9314C11.4659 1.9314 10.9414 2.07401 10.4808 2.3445C10.0202 2.61498 9.64019 3.00354 9.38 3.47003L1.38 17.47C1.11079 17.924 0.966141 18.441 0.960643 18.9688C0.955144 19.4966 1.089 20.0166 1.34868 20.4761C1.60837 20.9356 1.9847 21.3185 2.43968 21.5861C2.89466 21.8536 3.41218 21.9964 3.94 22H20.06C20.5921 22.0053 21.1159 21.8689 21.5779 21.6049C22.0399 21.341 22.4234 20.9589 22.689 20.4978C22.9546 20.0368 23.0928 19.5134 23.0895 18.9814C23.0862 18.4493 22.9414 17.9277 22.67 17.47ZM20.94 19.47C20.8523 19.626 20.7245 19.7556 20.5697 19.8453C20.4149 19.935 20.2389 19.9815 20.06 19.98H3.94C3.76111 19.9815 3.5851 19.935 3.43032 19.8453C3.27553 19.7556 3.14765 19.626 3.06 19.47C2.97223 19.318 2.92602 19.1456 2.92602 18.97C2.92602 18.7945 2.97223 18.622 3.06 18.47L11.06 4.47003C11.1439 4.30623 11.2714 4.16876 11.4284 4.07277C11.5855 3.97678 11.766 3.92599 11.95 3.92599C12.134 3.92599 12.3145 3.97678 12.4716 4.07277C12.6286 4.16876 12.7561 4.30623 12.84 4.47003L20.89 18.47C20.9892 18.6199 21.0462 18.7937 21.055 18.9732C21.0638 19.1527 21.0241 19.3312 20.94 19.49V19.47ZM12 8.00003C11.7348 8.00003 11.4804 8.10538 11.2929 8.29292C11.1054 8.48046 11 8.73481 11 9.00003V13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8947 11.7348 14 12 14C12.2652 14 12.5196 13.8947 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13V9.00003C13 8.73481 12.8946 8.48046 12.7071 8.29292C12.5196 8.10538 12.2652 8.00003 12 8.00003Z\"></path></svg>Caution</p><div class=\"starlight-aside__content\"><p>You must be logged into the private registry before running opencode.</p></div></aside>\n<p>Alternatively, you can manually configure a <code dir=\"auto\">.npmrc</code> file:</p>\n<div class=\"expressive-code\"><figure class=\"frame has-title not-content\"><figcaption class=\"header\"><span class=\"title\">~/.npmrc</span></figcaption><pre data-language=\"bash\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#24292E;--1:#E1E4E8\">registry</span><span style=\"--0:#BF3441;--1:#F97583\">=</span><span style=\"--0:#032F62;--1:#9ECBFF\">https://your-company.jfrog.io/api/npm/npm-virtual/</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#6F42C1;--1:#B392F0\">//your-company.jfrog.io/api/npm/npm-virtual/:_authToken</span><span style=\"--0:#032F62;--1:#9ECBFF\">=</span><span style=\"--0:#24292E;--1:#E1E4E8\">${NPM_AUTH_TOKEN}</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"registry=https://your-company.jfrog.io/api/npm/npm-virtual///your-company.jfrog.io/api/npm/npm-virtual/:_authToken=${NPM_AUTH_TOKEN}\"><div></div></button></div></figure></div>\n<p>Developers must be logged into the private registry before running opencode to ensure packages can be installed from your enterprise registry.</p>\n<hr>\n<h3 id=\"self-hosting\"><a href=\"#self-hosting\">Self-hosting</a></h3>\n<p>The share feature can be self-hosted and the share pages can be made accessible\nonly after the user has been authenticated.</p>"
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

const url = "src/content/docs/enterprise.mdx";
const file = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/enterprise.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/josh/projects/sst/opencode/packages/web/src/content/docs/enterprise.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, email, file, frontmatter, getHeadings, url };
