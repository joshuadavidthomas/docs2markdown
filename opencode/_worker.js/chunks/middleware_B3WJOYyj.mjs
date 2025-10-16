globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, ao as maybeRenderHead, at as unescapeHTML, b as renderTemplate, h as renderSlot, r as renderComponent, ap as addAttribute, aB as renderScript, aq as spreadAttributes, F as Fragment, aC as defineStyleVars, A as AstroUserError, aD as renderHead } from './astro/server_BfFDGVc7.mjs';
import { p as printHref } from './_id_.7b0be986_BINStOLP.mjs';
import { e as $$Icon, f as $$LinkButton, g as $$Badge } from './Code_Bjh26zHX.mjs';
import { s as starlightConfig, A as stripTrailingSlash, D as stripLeadingSlash, E as stripHtmlExtension, F as ensureHtmlExtension, G as ensureTrailingSlash, p as project, B as BuiltInDefaultLocale, H as getCollection, j as getCollectionPathFromRoot, I as pickLang, h as stripLeadingAndTrailingSlashes, J as ensureLeadingSlash, K as stripExtension, q as arrayType, o as objectType, c as stringType, d as recordType, e as enumType, a as unionType, b as booleanType, f as undefinedType, L as getEntry, u as useTranslations } from './translations_DJ110TSw.mjs';
import { c as config } from './config_C9OJ3Thw.mjs';
import { $ as $$Image } from './_astro_assets_DOn0VAFB.mjs';

const $$Astro$v = createAstro("https://dev.opencode.ai");
const $$Banner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$Banner;
  const { banner } = Astro2.locals.starlightRoute.entry.data;
  return renderTemplate`${banner && renderTemplate`${maybeRenderHead()}<div class="sl-banner astro-u7up6dmg">${unescapeHTML(banner.content)}</div>`}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Banner.astro", void 0);

const $$ContentPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="content-panel astro-hiqdptjl"> <div class="sl-container astro-hiqdptjl">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/ContentPanel.astro", void 0);

const $$Astro$u = createAstro("https://dev.opencode.ai");
const $$ContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$ContentNotice;
  const { icon, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p class="sl-flex astro-3ec6y7vj"> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "size": "1.5em", "color": "var(--sl-color-orange-high)", "class": "astro-3ec6y7vj" })} <span class="astro-3ec6y7vj">${label}</span> </p> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/ContentNotice.astro", void 0);

const $$Astro$t = createAstro("https://dev.opencode.ai");
const $$FallbackContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$FallbackContentNotice;
  return renderTemplate`${renderComponent($$result, "ContentNotice", $$ContentNotice, { "icon": "warning", "label": Astro2.locals.t("i18n.untranslatedContent") })}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/FallbackContentNotice.astro", void 0);

const $$Astro$s = createAstro("https://dev.opencode.ai");
const $$DraftContentNotice = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$DraftContentNotice;
  return renderTemplate`${renderComponent($$result, "ContentNotice", $$ContentNotice, { "icon": "warning", "label": Astro2.locals.t("page.draft") })}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/DraftContentNotice.astro", void 0);

const $$Astro$r = createAstro("https://dev.opencode.ai");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Footer;
  const {
    lang,
    editUrl,
    lastUpdated,
    entry: {
      data: { template }
    }
  } = Astro2.locals.starlightRoute;
  Astro2.url.pathname.replace(/^\//, "").replace(/\/$/, "");
  const github = starlightConfig.social.filter((s) => s.icon === "github")[0];
  const discord = starlightConfig.social.filter((s) => s.icon === "discord")[0];
  return renderTemplate`${template === "doc" && renderTemplate`${maybeRenderHead()}<footer class="doc astro-jcilvoi7"><div class="meta sl-flex astro-jcilvoi7"><div class="astro-jcilvoi7"><a${addAttribute(editUrl, "href")} target="_blank" class="sl-flex astro-jcilvoi7">${renderComponent($$result, "Icon", $$Icon, { "name": "pencil", "size": "1em", "class": "astro-jcilvoi7" })}
Edit this page
</a>${github && renderTemplate`<a${addAttribute(`${github.href}/issues/new`, "href")} target="_blank" class="sl-flex astro-jcilvoi7">${renderComponent($$result, "Icon", $$Icon, { "name": github.icon, "size": "1em", "class": "astro-jcilvoi7" })}
Find a bug? Open an issue
</a>`}${discord && renderTemplate`<a${addAttribute(discord.href, "href")} target="_blank" class="sl-flex astro-jcilvoi7">${renderComponent($$result, "Icon", $$Icon, { "name": discord.icon, "size": "1em", "class": "astro-jcilvoi7" })}
Join our Discord community
</a>`}</div><div class="astro-jcilvoi7"><p class="astro-jcilvoi7">&copy; <a target="_blank" href="https://anoma.ly" class="astro-jcilvoi7">Anomaly</a></p><p title="Last updated" class="astro-jcilvoi7">${lastUpdated ? renderTemplate`<time${addAttribute(lastUpdated.toISOString(), "datetime")} class="astro-jcilvoi7">${lastUpdated.toLocaleDateString(lang, { dateStyle: "medium", timeZone: "UTC" })}</time>` : "Last updated \u2014"}</p></div></div></footer>`}${template === "splash" && null}`;
}, "/home/josh/projects/sst/opencode/node_modules/toolbeam-docs-theme/src/overrides/Footer.astro", void 0);

/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
const version$1 = '3.7.7';
/**
 * @deprecated use lowercase `version`.
 */
const VERSION = version$1;
const _hasBuffer = typeof Buffer === 'function';
const _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
const _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
const b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const b64chs = Array.prototype.slice.call(b64ch);
const b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
})(b64chs);
const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
const _fromCC = String.fromCharCode.bind(String);
const _U8Afrom = typeof Uint8Array.from === 'function'
    ? Uint8Array.from.bind(Uint8Array)
    : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
const _mkUriSafe = (src) => src
    .replace(/=/g, '').replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_');
const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, '');
/**
 * polyfill version of `btoa`
 */
const btoaPolyfill = (bin) => {
    // console.log('polyfilled');
    let u32, c0, c1, c2, asc = '';
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length;) {
        if ((c0 = bin.charCodeAt(i++)) > 255 ||
            (c1 = bin.charCodeAt(i++)) > 255 ||
            (c2 = bin.charCodeAt(i++)) > 255)
            throw new TypeError('invalid character found');
        u32 = (c0 << 16) | (c1 << 8) | c2;
        asc += b64chs[u32 >> 18 & 63]
            + b64chs[u32 >> 12 & 63]
            + b64chs[u32 >> 6 & 63]
            + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
};
/**
 * does what `window.btoa` of web browsers do.
 * @param {String} bin binary string
 * @returns {string} Base64-encoded string
 */
const _btoa = typeof btoa === 'function' ? (bin) => btoa(bin)
    : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')
        : btoaPolyfill;
const _fromUint8Array = _hasBuffer
    ? (u8a) => Buffer.from(u8a).toString('base64')
    : (u8a) => {
        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326
        const maxargs = 0x1000;
        let strs = [];
        for (let i = 0, l = u8a.length; i < l; i += maxargs) {
            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
        }
        return _btoa(strs.join(''));
    };
/**
 * converts a Uint8Array to a Base64 string.
 * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5
 * @returns {string} Base64 string
 */
const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const utob = (src: string) => unescape(encodeURIComponent(src));
// reverting good old fationed regexp
const cb_utob = (c) => {
    if (c.length < 2) {
        var cc = c.charCodeAt(0);
        return cc < 0x80 ? c
            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))
                + _fromCC(0x80 | (cc & 0x3f)))
                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))
                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
                    + _fromCC(0x80 | (cc & 0x3f)));
    }
    else {
        var cc = 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))
            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))
            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))
            + _fromCC(0x80 | (cc & 0x3f)));
    }
};
const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
const utob = (u) => u.replace(re_utob, cb_utob);
//
const _encode = _hasBuffer
    ? (s) => Buffer.from(s, 'utf8').toString('base64')
    : _TE
        ? (s) => _fromUint8Array(_TE.encode(s))
        : (s) => _btoa(utob(s));
/**
 * converts a UTF-8-encoded string to a Base64 string.
 * @param {boolean} [urlsafe] if `true` make the result URL-safe
 * @returns {string} Base64 string
 */
const encode = (src, urlsafe = false) => urlsafe
    ? _mkUriSafe(_encode(src))
    : _encode(src);
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.
 * @returns {string} Base64 string
 */
const encodeURI$1 = (src) => encode(src, true);
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
const cb_btou = (cccc) => {
    switch (cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
            return (_fromCC((offset >>> 10) + 0xD800)
                + _fromCC((offset & 0x3FF) + 0xDC00));
        case 3:
            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2)));
        default:
            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1)));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
const btou = (b) => b.replace(re_btou, cb_btou);
/**
 * polyfill version of `atob`
 */
const atobPolyfill = (asc) => {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc))
        throw new TypeError('malformed base64.');
    asc += '=='.slice(2 - (asc.length & 3));
    let u24, bin = '', r1, r2;
    for (let i = 0; i < asc.length;) {
        u24 = b64tab[asc.charAt(i++)] << 18
            | b64tab[asc.charAt(i++)] << 12
            | (r1 = b64tab[asc.charAt(i++)]) << 6
            | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
const _atob = typeof atob === 'function' ? (asc) => atob(_tidyB64(asc))
    : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')
        : atobPolyfill;
//
const _toUint8Array = _hasBuffer
    ? (a) => _U8Afrom(Buffer.from(a, 'base64'))
    : (a) => _U8Afrom(_atob(a).split('').map(c => c.charCodeAt(0)));
/**
 * converts a Base64 string to a Uint8Array.
 */
const toUint8Array = (a) => _toUint8Array(_unURI(a));
//
const _decode = _hasBuffer
    ? (a) => Buffer.from(a, 'base64').toString('utf8')
    : _TD
        ? (a) => _TD.decode(_toUint8Array(a))
        : (a) => btou(_atob(a));
const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
const decode = (src) => _decode(_unURI(src));
/**
 * check if a value is a valid Base64 string
 * @param {String} src a value to check
  */
const isValid = (src) => {
    if (typeof src !== 'string')
        return false;
    const s = src.replace(/\s+/g, '').replace(/={0,2}$/, '');
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
//
const _noEnum = (v) => {
    return {
        value: v, enumerable: false, writable: true, configurable: true
    };
};
/**
 * extend String.prototype with relevant methods
 */
const extendString = function () {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add('fromBase64', function () { return decode(this); });
    _add('toBase64', function (urlsafe) { return encode(this, urlsafe); });
    _add('toBase64URI', function () { return encode(this, true); });
    _add('toBase64URL', function () { return encode(this, true); });
    _add('toUint8Array', function () { return toUint8Array(this); });
};
/**
 * extend Uint8Array.prototype with relevant methods
 */
const extendUint8Array = function () {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });
    _add('toBase64URI', function () { return fromUint8Array(this, true); });
    _add('toBase64URL', function () { return fromUint8Array(this, true); });
};
/**
 * extend Builtin prototypes with relevant methods
 */
const extendBuiltins = () => {
    extendString();
    extendUint8Array();
};
const gBase64 = {
    version: version$1,
    VERSION: VERSION,
    atob: _atob,
    atobPolyfill: atobPolyfill,
    btoa: _btoa,
    btoaPolyfill: btoaPolyfill,
    fromBase64: decode,
    toBase64: encode,
    encode: encode,
    encodeURI: encodeURI$1,
    encodeURL: encodeURI$1,
    utob: utob,
    btou: btou,
    decode: decode,
    isValid: isValid,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins
};

const $$Astro$q = createAstro("https://dev.opencode.ai");
const $$Head$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Head$1;
  const { head } = Astro2.locals.starlightRoute;
  return renderTemplate`${head.map(({ tag: Tag, attrs, content }) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs }, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`)}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Head.astro", void 0);

const $$Astro$p = createAstro("https://dev.opencode.ai");
const $$Head = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$Head;
  const base = "/docs".slice(1);
  const slug = Astro2.url.pathname.replace(/^\//, "").replace(/\/$/, "");
  const {
    entry: {
      data: { title, description }
    }
  } = Astro2.locals.starlightRoute;
  const isDocs = slug.startsWith("docs");
  let encodedTitle = "";
  let ogImage = `${config.url}/social-share.png`;
  let truncatedDesc = "";
  if (isDocs) {
    encodedTitle = encodeURIComponent(
      gBase64.encode(
        // Convert to ASCII
        encodeURIComponent(
          // Truncate to fit S3's max key size
          title.substring(0, 700)
        )
      )
    );
    if (description) {
      truncatedDesc = encodeURIComponent(description.substring(0, 400));
    }
    ogImage = `${config.socialCard}/opencode-docs/${encodedTitle}.png?desc=${truncatedDesc}`;
  }
  return renderTemplate`${slug === "" && renderTemplate`<title>${title} | AI coding agent built for the terminal</title>`}${renderComponent($$result, "Default", $$Head$1, { ...Astro2.props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}${!slug.startsWith(`${base}/s`) && renderTemplate`<meta property="og:image"${addAttribute(ogImage, "content")}>
  <meta property="twitter:image"${addAttribute(ogImage, "content")}>`}`;
}, "/home/josh/projects/sst/opencode/packages/web/src/components/Head.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$Astro$o = createAstro("https://dev.opencode.ai");
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Search;
  const pagefindTranslations = {
    placeholder: Astro2.locals.t("search.label"),
    ...Object.fromEntries(
      Object.entries(Astro2.locals.t.all()).filter(([key]) => key.startsWith("pagefind.")).map(([key, value]) => [key.replace("pagefind.", ""), value])
    )
  };
  const dataAttributes = { "data-translations": JSON.stringify(pagefindTranslations) };
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", "  <script>\n	(() => {\n		const openBtn = document.querySelector('button[data-open-modal]');\n		const shortcut = openBtn?.querySelector('kbd');\n		if (!openBtn || !(shortcut instanceof HTMLElement)) return;\n		const platformKey = shortcut.querySelector('kbd');\n		if (platformKey && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {\n			platformKey.textContent = '⌘';\n			openBtn.setAttribute('aria-keyshortcuts', 'Meta+K');\n		}\n		shortcut.style.display = '';\n	})();\n</script> ", "  "])), renderComponent($$result, "site-search", "site-search", { "class": (Astro2.props.class ?? "") + " astro-co4yvglm", ...dataAttributes }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-open-modal disabled${addAttribute(Astro2.locals.t("search.label"), "aria-label")} aria-keyshortcuts="Control+K" class="astro-co4yvglm"> ${renderComponent($$result, "Icon", $$Icon, { "name": "magnifier", "class": "astro-co4yvglm" })} <span class="sl-hidden md:sl-block astro-co4yvglm" aria-hidden="true">${Astro2.locals.t("search.label")}</span> <kbd class="sl-hidden md:sl-flex astro-co4yvglm" style="display: none;"> <kbd class="astro-co4yvglm">${Astro2.locals.t("search.ctrlKey")}</kbd><kbd class="astro-co4yvglm">K</kbd> </kbd> </button> <dialog style="padding:0"${addAttribute(Astro2.locals.t("search.label"), "aria-label")} class="astro-co4yvglm"> <div class="dialog-frame sl-flex astro-co4yvglm">  <button data-close-modal class="sl-flex md:sl-hidden astro-co4yvglm"> ${Astro2.locals.t("search.cancelLabel")} </button> ${renderTemplate`<div class="search-container astro-co4yvglm"> <div id="starlight__search" class="astro-co4yvglm"></div> </div>`} </div> </dialog> ` }), renderScript($$result, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Search.astro?astro&type=script&index=0&lang.ts"));
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Search.astro", void 0);

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const dark = createSvgComponent({"meta":{"src":"/docs/_astro/logo-dark.DOStV66V.svg","width":234,"height":42,"format":"svg"},"attributes":{"width":"234","height":"42","viewBox":"0 0 234 42","fill":"none"},"children":"\n<path d=\"M18 30H6V18H18V30Z\" fill=\"#4B4646\" />\n<path d=\"M18 12H6V30H18V12ZM24 36H0V6H24V36Z\" fill=\"#B7B1B1\" />\n<path d=\"M48 30H36V18H48V30Z\" fill=\"#4B4646\" />\n<path d=\"M36 30H48V12H36V30ZM54 36H36V42H30V6H54V36Z\" fill=\"#B7B1B1\" />\n<path d=\"M84 24V30H66V24H84Z\" fill=\"#4B4646\" />\n<path d=\"M84 24H66V30H84V36H60V6H84V24ZM66 18H78V12H66V18Z\" fill=\"#B7B1B1\" />\n<path d=\"M108 36H96V18H108V36Z\" fill=\"#4B4646\" />\n<path d=\"M108 12H96V36H90V6H108V12ZM114 36H108V12H114V36Z\" fill=\"#B7B1B1\" />\n<path d=\"M144 30H126V18H144V30Z\" fill=\"#4B4646\" />\n<path d=\"M144 12H126V30H144V36H120V6H144V12Z\" fill=\"#F1ECEC\" />\n<path d=\"M168 30H156V18H168V30Z\" fill=\"#4B4646\" />\n<path d=\"M168 12H156V30H168V12ZM174 36H150V6H174V36Z\" fill=\"#F1ECEC\" />\n<path d=\"M198 30H186V18H198V30Z\" fill=\"#4B4646\" />\n<path d=\"M198 12H186V30H198V12ZM204 36H180V6H198V0H204V36Z\" fill=\"#F1ECEC\" />\n<path d=\"M234 24V30H216V24H234Z\" fill=\"#4B4646\" />\n<path d=\"M216 12V18H228V12H216ZM234 24H216V30H234V36H210V6H234V24Z\" fill=\"#F1ECEC\" />\n"});

const light = createSvgComponent({"meta":{"src":"/docs/_astro/logo-light.B0yzR0O5.svg","width":234,"height":42,"format":"svg"},"attributes":{"width":"234","height":"42","viewBox":"0 0 234 42","fill":"none"},"children":"\n<path d=\"M18 30H6V18H18V30Z\" fill=\"#CFCECD\" />\n<path d=\"M18 12H6V30H18V12ZM24 36H0V6H24V36Z\" fill=\"#656363\" />\n<path d=\"M48 30H36V18H48V30Z\" fill=\"#CFCECD\" />\n<path d=\"M36 30H48V12H36V30ZM54 36H36V42H30V6H54V36Z\" fill=\"#656363\" />\n<path d=\"M84 24V30H66V24H84Z\" fill=\"#CFCECD\" />\n<path d=\"M84 24H66V30H84V36H60V6H84V24ZM66 18H78V12H66V18Z\" fill=\"#656363\" />\n<path d=\"M108 36H96V18H108V36Z\" fill=\"#CFCECD\" />\n<path d=\"M108 12H96V36H90V6H108V12ZM114 36H108V12H114V36Z\" fill=\"#656363\" />\n<path d=\"M144 30H126V18H144V30Z\" fill=\"#CFCECD\" />\n<path d=\"M144 12H126V30H144V36H120V6H144V12Z\" fill=\"#211E1E\" />\n<path d=\"M168 30H156V18H168V30Z\" fill=\"#CFCECD\" />\n<path d=\"M168 12H156V30H168V12ZM174 36H150V6H174V36Z\" fill=\"#211E1E\" />\n<path d=\"M198 30H186V18H198V30Z\" fill=\"#CFCECD\" />\n<path d=\"M198 12H186V30H198V12ZM204 36H180V6H198V0H204V36Z\" fill=\"#211E1E\" />\n<path d=\"M234 24V30H216V24H234Z\" fill=\"#CFCECD\" />\n<path d=\"M216 12V18H228V12H216ZM234 24H216V30H234V36H210V6H234V24Z\" fill=\"#211E1E\" />\n"});

const logos = { dark, light };

const $$Astro$n = createAstro("https://dev.opencode.ai");
const $$SiteTitle$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$SiteTitle$1;
  const { siteTitle, siteTitleHref } = Astro2.locals.starlightRoute;
  return renderTemplate`${maybeRenderHead()}<a href="/" class="site-title sl-flex astro-idrpryed"> ${starlightConfig.logo && logos.dark && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-idrpryed" }, { "default": ($$result2) => renderTemplate` <img${addAttribute([{ "light:sl-hidden print:hidden": !("src" in starlightConfig.logo) }, "astro-idrpryed"], "class:list")}${addAttribute(starlightConfig.logo.alt, "alt")}${addAttribute(logos.dark.src, "src")}${addAttribute(logos.dark.width, "width")}${addAttribute(logos.dark.height, "height")}> ${!("src" in starlightConfig.logo) && renderTemplate`<img class="dark:sl-hidden print:block astro-idrpryed"${addAttribute(starlightConfig.logo.alt, "alt")}${addAttribute(logos.light?.src, "src")}${addAttribute(logos.light?.width, "width")}${addAttribute(logos.light?.height, "height")}>`}` })}`} <span${addAttribute([{ "sr-only": starlightConfig.logo?.replacesTitle }, "astro-idrpryed"], "class:list")} translate="no"> ${siteTitle} </span> </a> `;
}, "/home/josh/projects/sst/opencode/packages/web/src/components/SiteTitle.astro", void 0);

const $$HeaderLinks = createComponent(($$result, $$props, $$slots) => {
  const { headerLinks } = globalThis.toolbeamDocsThemeConfig ?? {};
  return renderTemplate`${headerLinks?.map(({ name, url }) => renderTemplate`${maybeRenderHead()}<a class="links astro-fqd3drw2"${addAttribute(url, "href")}>${name}</a>`)}`;
}, "/home/josh/projects/sst/opencode/node_modules/toolbeam-docs-theme/src/components/HeaderLinks.astro", void 0);

const $$Astro$m = createAstro("https://dev.opencode.ai");
const $$Header$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Header$1;
  const shouldRenderSearch = starlightConfig.pagefind || starlightConfig.components.Search !== "@astrojs/starlight/components/Search.astro";
  const links = starlightConfig.social || [];
  return renderTemplate`${maybeRenderHead()}<div class="header sl-flex astro-huejejlc"> <div class="title-wrapper sl-flex astro-huejejlc"> ${renderComponent($$result, "SiteTitle", $$SiteTitle$1, { ...Astro2.props, "class": "astro-huejejlc" })} </div> <div class="middle-group sl-flex astro-huejejlc"> ${renderComponent($$result, "HeaderLinks", $$HeaderLinks, { ...Astro2.props, "class": "astro-huejejlc" })} </div> <div class="sl-hidden md:sl-flex right-group astro-huejejlc"> ${links.length > 0 && renderTemplate`<div class="sl-flex social-icons astro-huejejlc"> ${links.map(({ href, icon }) => renderTemplate`<a${addAttribute(href, "href")} rel="me" target="_blank" class="astro-huejejlc"> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "size": "1rem", "class": "astro-huejejlc" })} </a>`)} </div>`} ${shouldRenderSearch && renderTemplate`${renderComponent($$result, "Search", $$Search, { ...Astro2.props, "class": "astro-huejejlc" })}`} </div> </div> `;
}, "/home/josh/projects/sst/opencode/node_modules/toolbeam-docs-theme/src/overrides/Header.astro", void 0);

const $$Astro$l = createAstro("https://dev.opencode.ai");
const $$SiteTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$SiteTitle;
  const { siteTitle, siteTitleHref } = Astro2.locals.starlightRoute;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(siteTitleHref, "href")} class="site-title sl-flex astro-33ispya6"> ${starlightConfig.logo && logos.dark && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-33ispya6" }, { "default": ($$result2) => renderTemplate` <img${addAttribute([{ "light:sl-hidden print:hidden": !("src" in starlightConfig.logo) }, "astro-33ispya6"], "class:list")}${addAttribute(starlightConfig.logo.alt, "alt")}${addAttribute(logos.dark.src, "src")}${addAttribute(logos.dark.width, "width")}${addAttribute(logos.dark.height, "height")}> ${!("src" in starlightConfig.logo) && renderTemplate`<img class="dark:sl-hidden print:block astro-33ispya6"${addAttribute(starlightConfig.logo.alt, "alt")}${addAttribute(logos.light?.src, "src")}${addAttribute(logos.light?.width, "width")}${addAttribute(logos.light?.height, "height")}>`}` })}`} <span${addAttribute([{ "sr-only": starlightConfig.logo?.replacesTitle }, "astro-33ispya6"], "class:list")} translate="no"> ${siteTitle} </span> </a> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/SiteTitle.astro", void 0);

const $$Astro$k = createAstro("https://dev.opencode.ai");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Header;
  const path = Astro2.url.pathname;
  const links = starlightConfig.social || [];
  const headerLinks = config.headerLinks;
  return renderTemplate`${path.startsWith("/s") ? renderTemplate`${maybeRenderHead()}<div class="header sl-flex astro-3ef6ksr2"><div class="title-wrapper sl-flex astro-3ef6ksr2">${renderComponent($$result, "SiteTitle", $$SiteTitle, { ...Astro2.props, "class": "astro-3ef6ksr2" })}</div><div class="middle-group sl-flex astro-3ef6ksr2">${headerLinks?.map(({ name, url }) => renderTemplate`<a class="links astro-3ef6ksr2"${addAttribute(url, "href")}>${name}</a>`)}</div><div class="sl-hidden md:sl-flex right-group astro-3ef6ksr2">${links.length > 0 && renderTemplate`<div class="sl-flex social-icons astro-3ef6ksr2">${links.map(({ href, icon }) => renderTemplate`<a${addAttribute(href, "href")} rel="me" target="_blank" class="astro-3ef6ksr2">${renderComponent($$result, "Icon", $$Icon, { "name": icon, "size": "1rem", "class": "astro-3ef6ksr2" })}</a>`)}</div>`}</div></div>` : renderTemplate`${renderComponent($$result, "Default", $$Header$1, { ...Astro2.props, "class": "astro-3ef6ksr2" }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/home/josh/projects/sst/opencode/packages/web/src/components/Header.astro", void 0);

const PAGE_TITLE_ID = "_top";

const $$Astro$j = createAstro("https://dev.opencode.ai");
const $$Hero$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Hero$1;
  const { data } = Astro2.locals.starlightRoute.entry;
  const { title = data.title, tagline, image, actions = [] } = data.hero || {};
  const imageAttrs = {
    loading: "eager",
    decoding: "async",
    width: 400,
    height: 400,
    alt: image?.alt || ""
  };
  let darkImage;
  let lightImage;
  let rawHtml;
  if (image) {
    if ("file" in image) {
      darkImage = image.file;
    } else if ("dark" in image) {
      darkImage = image.dark;
      lightImage = image.light;
    } else {
      rawHtml = image.html;
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="hero astro-uz6y2wra"> ${darkImage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": darkImage, ...imageAttrs, "class:list": [{ "light:sl-hidden": Boolean(lightImage) }, "astro-uz6y2wra"] })}`} ${lightImage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": lightImage, ...imageAttrs, "class": "dark:sl-hidden astro-uz6y2wra" })}`} ${rawHtml && renderTemplate`<div class="hero-html sl-flex astro-uz6y2wra">${unescapeHTML(rawHtml)}</div>`} <div class="sl-flex stack astro-uz6y2wra"> <div class="sl-flex copy astro-uz6y2wra"> <h1${addAttribute(PAGE_TITLE_ID, "id")} data-page-title class="astro-uz6y2wra">${unescapeHTML(title)}</h1> ${tagline && renderTemplate`<div class="tagline astro-uz6y2wra">${unescapeHTML(tagline)}</div>`} </div> ${actions.length > 0 && renderTemplate`<div class="sl-flex actions astro-uz6y2wra"> ${actions.map(
    ({ attrs: { class: className, ...attrs } = {}, icon, link: href, text, variant }) => renderTemplate`${renderComponent($$result, "LinkButton", $$LinkButton, { "href": href, "variant": variant, "icon": icon?.name, "class:list": [[className], "astro-uz6y2wra"], ...attrs }, { "default": ($$result2) => renderTemplate`${text}${icon?.html && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(icon.html)}` })}`}` })}`
  )} </div>`} </div> </div> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Hero.astro", void 0);

const CopyIcon = createSvgComponent({"meta":{"src":"/docs/_astro/copy.Bh8cKImQ.svg","width":32,"height":32,"format":"svg"},"attributes":{"width":"32","height":"32","viewBox":"0 0 512 512"},"children":"<rect width=\"336\" height=\"336\" x=\"128\" y=\"128\" fill=\"none\" stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"32\" rx=\"57\" ry=\"57\" /><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24\" />"});

const CheckIcon = createSvgComponent({"meta":{"src":"/docs/_astro/check.BCIIkoau.svg","width":24,"height":24,"format":"svg"},"attributes":{"viewBox":"0 0 24 24"},"children":"<path fill=\"currentColor\" d=\"M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41z\" />"});

const TuiScreenshot = new Proxy({"src":"/docs/_astro/screenshot-splash.Br7Db4P4.png","width":1952,"height":1464,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/josh/projects/sst/opencode/packages/web/src/assets/lander/screenshot-splash.png";
							}
							
							return target[name];
						}
					});

const VscodeScreenshot = new Proxy({"src":"/docs/_astro/screenshot-vscode.ErS25NLc.png","width":2690,"height":1790,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/josh/projects/sst/opencode/packages/web/src/assets/lander/screenshot-vscode.png";
							}
							
							return target[name];
						}
					});

const GithubScreenshot = new Proxy({"src":"/docs/_astro/screenshot-github.9kn9Fspv.png","width":2614,"height":1784,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/josh/projects/sst/opencode/packages/web/src/assets/lander/screenshot-github.png";
							}
							
							return target[name];
						}
					});

const $$Astro$i = createAstro("https://dev.opencode.ai");
const $$Lander = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Lander;
  const { data } = Astro2.locals.starlightRoute.entry;
  const { title = data.title, tagline, image, actions = [] } = data.hero || {};
  const imageAttrs = {
    loading: "eager",
    decoding: "async",
    width: 400,
    alt: image?.alt || ""
  };
  const github = starlightConfig.social.filter((s) => s.icon === "github")[0];
  const discord = starlightConfig.social.filter((s) => s.icon === "discord")[0];
  const command = "curl -fsSL";
  const protocol = "https://";
  const url = "opencode.ai/install";
  const bash = "| bash";
  let darkImage;
  let lightImage;
  if (image) {
    if ("file" in image) {
      darkImage = image.file;
    } else if ("dark" in image) {
      darkImage = image.dark;
      lightImage = image.light;
    } else {
      image.html;
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="hero astro-holooh5h"> <section class="top astro-holooh5h"> <div class="logo astro-holooh5h"> ${renderComponent($$result, "Image", $$Image, { "src": darkImage, ...imageAttrs, "class:list": [{ "light:sl-hidden": Boolean(lightImage) }, "astro-holooh5h"] })} ${renderComponent($$result, "Image", $$Image, { "src": lightImage, ...imageAttrs, "class": "dark:sl-hidden astro-holooh5h" })} </div> <h1 class="astro-holooh5h">The AI coding agent built for the terminal.</h1> </section> <section class="cta astro-holooh5h"> <div class="col1 astro-holooh5h"> <a href="/docs" class="astro-holooh5h">Get Started</a> </div> <div class="col2 astro-holooh5h"> <button class="command astro-holooh5h"${addAttribute(`${command} ${protocol}${url} ${bash}`, "data-command")}> <code class="astro-holooh5h"> <span class="astro-holooh5h">${command}&nbsp;</span><span class="protocol astro-holooh5h">${protocol}</span><span class="highlight astro-holooh5h">${url}</span>&nbsp;${bash} </code> <span class="copy astro-holooh5h"> ${renderComponent($$result, "CopyIcon", CopyIcon, { "class": "astro-holooh5h" })} ${renderComponent($$result, "CheckIcon", CheckIcon, { "class": "astro-holooh5h" })} </span> </button> </div> </section> <section class="content astro-holooh5h"> <ul class="astro-holooh5h"> <li class="astro-holooh5h"><b class="astro-holooh5h">Native TUI</b>: A responsive, native, themeable terminal UI.</li> <li class="astro-holooh5h"><b class="astro-holooh5h">LSP enabled</b>: Automatically loads the right LSPs for the LLM.</li> <li class="astro-holooh5h"><b class="astro-holooh5h">Multi-session</b>: Start multiple agents in parallel on the same project.</li> <li class="astro-holooh5h"><b class="astro-holooh5h">Shareable links</b>: Share a link to any sessions for reference or to debug.</li> <li class="astro-holooh5h"><b class="astro-holooh5h">Claude Pro</b>: Log in with Anthropic to use your Claude Pro or Max account.</li> <li class="astro-holooh5h"><b class="astro-holooh5h">Use any model</b>: Supports 75+ LLM providers through <a href="https://models.dev" class="astro-holooh5h">Models.dev</a>, including local models.</li> </ul> </section> <section class="alternatives astro-holooh5h"> <div class="col1 astro-holooh5h"> <h3 class="astro-holooh5h">npm</h3> <button class="command astro-holooh5h" data-command="npm install -g opencode-ai"> <code class="astro-holooh5h"> <span class="astro-holooh5h">npm install -g</span> <span class="highlight astro-holooh5h">opencode-ai</span> </code> <span class="copy astro-holooh5h"> ${renderComponent($$result, "CopyIcon", CopyIcon, { "class": "astro-holooh5h" })} ${renderComponent($$result, "CheckIcon", CheckIcon, { "class": "astro-holooh5h" })} </span> </button> </div> <div class="col2 astro-holooh5h"> <h3 class="astro-holooh5h">Bun</h3> <button class="command astro-holooh5h" data-command="bun install -g opencode-ai"> <code class="astro-holooh5h"> <span class="astro-holooh5h">bun install -g</span> <span class="highlight astro-holooh5h">opencode-ai</span> </code> <span class="copy astro-holooh5h"> ${renderComponent($$result, "CopyIcon", CopyIcon, { "class": "astro-holooh5h" })} ${renderComponent($$result, "CheckIcon", CheckIcon, { "class": "astro-holooh5h" })} </span> </button> </div> <div class="col3 astro-holooh5h"> <h3 class="astro-holooh5h">Homebrew</h3> <button class="command astro-holooh5h" data-command="brew install sst/tap/opencode"> <code class="astro-holooh5h"> <span class="astro-holooh5h">brew install</span> <span class="highlight astro-holooh5h">sst/tap/opencode</span> </code> <span class="copy astro-holooh5h"> ${renderComponent($$result, "CopyIcon", CopyIcon, { "class": "astro-holooh5h" })} ${renderComponent($$result, "CheckIcon", CheckIcon, { "class": "astro-holooh5h" })} </span> </button> </div> <div class="col4 astro-holooh5h"> <h3 class="astro-holooh5h">Paru</h3> <button class="command astro-holooh5h" data-command="paru -S opencode-bin"> <code class="astro-holooh5h"> <span class="astro-holooh5h">paru -S</span> <span class="highlight astro-holooh5h">opencode-bin</span> </code> <span class="copy astro-holooh5h"> ${renderComponent($$result, "CopyIcon", CopyIcon, { "class": "astro-holooh5h" })} ${renderComponent($$result, "CheckIcon", CheckIcon, { "class": "astro-holooh5h" })} </span> </button> </div> </section> <section class="images astro-holooh5h"> <div class="left astro-holooh5h"> <figure class="astro-holooh5h"> <figcaption class="astro-holooh5h">opencode TUI with the tokyonight theme</figcaption> <a href="/docs/cli" class="astro-holooh5h"> ${renderComponent($$result, "Image", $$Image, { "src": TuiScreenshot, "alt": "opencode TUI with the tokyonight theme", "class": "astro-holooh5h" })} </a> </figure> </div> <div class="right astro-holooh5h"> <div class="row1 astro-holooh5h"> <figure class="astro-holooh5h"> <figcaption class="astro-holooh5h">opencode in VS Code</figcaption> <a href="/docs/ide" class="astro-holooh5h"> ${renderComponent($$result, "Image", $$Image, { "src": VscodeScreenshot, "alt": "opencode in VS Code", "class": "astro-holooh5h" })} </a> </figure> </div> <div class="row2 astro-holooh5h"> <figure class="astro-holooh5h"> <figcaption class="astro-holooh5h">opencode in GitHub</figcaption> <a href="/docs/github" class="astro-holooh5h"> ${renderComponent($$result, "Image", $$Image, { "src": GithubScreenshot, "alt": "opencode in GitHub", "class": "astro-holooh5h" })} </a> </figure> </div> </div> </section> <section class="footer astro-holooh5h"> <div class="col1 astro-holooh5h"> <a${addAttribute(github.href, "href")} target="_blank" rel="noopener noreferrer" class="astro-holooh5h">GitHub</a> </div> <div class="col2 astro-holooh5h"> <a${addAttribute(discord.href, "href")} target="_blank" rel="noopener noreferrer" class="astro-holooh5h">Discord</a> </div> <div class="col3 astro-holooh5h"> <span class="astro-holooh5h">&copy;2025 <a href="https://anoma.ly" target="_blank" rel="noopener noreferrer" class="astro-holooh5h">Anomaly Innovations</a></span> </div> </section> </div>   ${renderScript($$result, "/home/josh/projects/sst/opencode/packages/web/src/components/Lander.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/josh/projects/sst/opencode/packages/web/src/components/Lander.astro", void 0);

const $$Astro$h = createAstro("https://dev.opencode.ai");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Hero;
  const { slug } = Astro2.locals.starlightRoute.entry;
  return renderTemplate`${slug === "" ? renderTemplate`${renderComponent($$result, "Lander", $$Lander, { ...Astro2.props })}` : renderTemplate`${renderComponent($$result, "Default", $$Hero$1, { ...Astro2.props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/home/josh/projects/sst/opencode/packages/web/src/components/Hero.astro", void 0);

const $$MarkdownContent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="sl-markdown-content">${renderSlot($$result, $$slots["default"])}</div>`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/MarkdownContent.astro", void 0);

const $$Astro$g = createAstro("https://dev.opencode.ai");
const $$MobileMenuToggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$MobileMenuToggle;
  return renderTemplate`${renderComponent($$result, "starlight-menu-button", "starlight-menu-button", { "class": "print:hidden astro-ifspxnmj" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button aria-expanded="false"${addAttribute(Astro2.locals.t("menuButton.accessibleLabel"), "aria-label")} aria-controls="starlight__sidebar" class="sl-flex md:sl-hidden astro-ifspxnmj"> ${renderComponent($$result, "Icon", $$Icon, { "name": "bars", "class": "open-menu astro-ifspxnmj" })} ${renderComponent($$result, "Icon", $$Icon, { "name": "close", "class": "close-menu astro-ifspxnmj" })} </button> ` })} ${renderScript($$result, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/MobileMenuToggle.astro?astro&type=script&index=0&lang.ts")}  `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/MobileMenuToggle.astro", void 0);

const $$Astro$f = createAstro("https://dev.opencode.ai");
const $$PageFrame = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$PageFrame;
  const { hasSidebar } = Astro2.locals.starlightRoute;
  return renderTemplate`${maybeRenderHead()}<div class="page sl-flex astro-ubff5v6h"> <header class="header astro-ubff5v6h">${renderSlot($$result, $$slots["header"])}</header> ${hasSidebar && renderTemplate`<nav class="sidebar print:hidden astro-ubff5v6h"${addAttribute(Astro2.locals.t("sidebarNav.accessibleLabel"), "aria-label")}> ${renderComponent($$result, "MobileMenuToggle", $$MobileMenuToggle, { "class": "astro-ubff5v6h" })} <div id="starlight__sidebar" class="sidebar-pane astro-ubff5v6h"> <div class="sidebar-content sl-flex astro-ubff5v6h"> ${renderSlot($$result, $$slots["sidebar"])} </div> </div> </nav>`} <div class="main-frame astro-ubff5v6h">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/PageFrame.astro", void 0);

const $$Astro$e = createAstro("https://dev.opencode.ai");
const $$TableOfContentsList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$TableOfContentsList;
  const { toc, isMobile = false, depth = 0 } = Astro2.props;
  const $$definedVars = defineStyleVars([{ depth }]);
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute([{ isMobile }, "astro-lmmnm2rz"], "class:list")}${addAttribute($$definedVars, "style")}> ${toc.map((heading) => renderTemplate`<li class="astro-lmmnm2rz"${addAttribute($$definedVars, "style")}> <a${addAttribute("#" + heading.slug, "href")} class="astro-lmmnm2rz"${addAttribute($$definedVars, "style")}> <span class="astro-lmmnm2rz"${addAttribute($$definedVars, "style")}>${heading.text}</span> </a> ${heading.children.length > 0 && renderTemplate`${renderComponent($$result, "Astro.self", Astro2.self, { "toc": heading.children, "depth": depth + 1, "isMobile": isMobile, "class": "astro-lmmnm2rz" })}`} </li>`)} </ul> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/TableOfContents/TableOfContentsList.astro", void 0);

const $$Astro$d = createAstro("https://dev.opencode.ai");
const $$MobileTableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$MobileTableOfContents;
  const { toc } = Astro2.locals.starlightRoute;
  return renderTemplate`${toc && renderTemplate`${renderComponent($$result, "mobile-starlight-toc", "mobile-starlight-toc", { "data-min-h": toc.minHeadingLevel, "data-max-h": toc.maxHeadingLevel, "class": "astro-koo4vns2" }, { "default": () => renderTemplate`${maybeRenderHead()}<nav aria-labelledby="starlight__on-this-page--mobile" class="astro-koo4vns2"><details id="starlight__mobile-toc" class="astro-koo4vns2"><summary id="starlight__on-this-page--mobile" class="sl-flex astro-koo4vns2"><div class="toggle sl-flex astro-koo4vns2">${Astro2.locals.t("tableOfContents.onThisPage")}${renderComponent($$result, "Icon", $$Icon, { "name": "right-caret", "class": "caret astro-koo4vns2", "size": "1rem" })}</div><span class="display-current astro-koo4vns2"></span></summary><div class="dropdown astro-koo4vns2">${renderComponent($$result, "TableOfContentsList", $$TableOfContentsList, { "toc": toc.items, "isMobile": true, "class": "astro-koo4vns2" })}</div></details></nav>` })}`}${renderScript($$result, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/MobileTableOfContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/MobileTableOfContents.astro", void 0);

const $$Astro$c = createAstro("https://dev.opencode.ai");
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { toc } = Astro2.locals.starlightRoute;
  return renderTemplate`${toc && renderTemplate`${renderComponent($$result, "starlight-toc", "starlight-toc", { "data-min-h": toc.minHeadingLevel, "data-max-h": toc.maxHeadingLevel }, { "default": () => renderTemplate`${maybeRenderHead()}<nav aria-labelledby="starlight__on-this-page"><h2 id="starlight__on-this-page">${Astro2.locals.t("tableOfContents.onThisPage")}</h2>${renderComponent($$result, "TableOfContentsList", $$TableOfContentsList, { "toc": toc.items })}</nav>` })}`}${renderScript($$result, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/TableOfContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/TableOfContents.astro", void 0);

const $$Astro$b = createAstro("https://dev.opencode.ai");
const $$PageSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$PageSidebar;
  return renderTemplate`${Astro2.locals.starlightRoute.toc && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-oyhvzoxw" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="lg:sl-hidden astro-oyhvzoxw">${renderComponent($$result2, "MobileTableOfContents", $$MobileTableOfContents, { "class": "astro-oyhvzoxw" })}</div><div class="right-sidebar-panel sl-hidden lg:sl-block astro-oyhvzoxw"><div class="sl-container astro-oyhvzoxw">${renderComponent($$result2, "TableOfContents", $$TableOfContents, { "class": "astro-oyhvzoxw" })}</div></div>` })}`}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/PageSidebar.astro", void 0);

const $$Astro$a = createAstro("https://dev.opencode.ai");
const $$PageTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$PageTitle;
  const {
    entry: {
      data: { title, description }
    }
  } = Astro2.locals.starlightRoute;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<h1 id="_top" class="astro-kp3j3rdu">${title}</h1>${description && renderTemplate`<p class="page-description astro-kp3j3rdu">${description}</p>`}` })}`;
}, "/home/josh/projects/sst/opencode/node_modules/toolbeam-docs-theme/src/overrides/PageTitle.astro", void 0);

const $$Astro$9 = createAstro("https://dev.opencode.ai");
const $$Select = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Select;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(`--sl-select-width: ${Astro2.props.width}`, "style")} class="astro-vu4o4rdj"> <span class="sr-only astro-vu4o4rdj">${Astro2.props.label}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": Astro2.props.icon, "class": "icon label-icon astro-vu4o4rdj" })} <select${addAttribute(Astro2.props.value, "value")} autocomplete="off" class="astro-vu4o4rdj"> ${Astro2.props.options.map(({ value, selected, label }) => renderTemplate`<option${addAttribute(value, "value")}${addAttribute(selected, "selected")} class="astro-vu4o4rdj">${unescapeHTML(label)}</option>`)} </select> ${renderComponent($$result, "Icon", $$Icon, { "name": "down-caret", "class": "icon caret astro-vu4o4rdj" })} </label> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Select.astro", void 0);

const $$Astro$8 = createAstro("https://dev.opencode.ai");
const $$LanguageSelect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$LanguageSelect;
  return renderTemplate`${starlightConfig.isMultilingual}${renderScript($$result, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/LanguageSelect.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/LanguageSelect.astro", void 0);

const $$SocialIcons = createComponent(($$result, $$props, $$slots) => {
  const links = starlightConfig.social || [];
  return renderTemplate`${links.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-3lx74l2q" }, { "default": ($$result2) => renderTemplate`${links.map(({ label, href, icon }) => renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} rel="me" class="sl-flex astro-3lx74l2q"><span class="sr-only astro-3lx74l2q">${label}</span>${renderComponent($$result2, "Icon", $$Icon, { "name": icon, "class": "astro-3lx74l2q" })}</a>`)}` })}`}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/SocialIcons.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$7 = createAstro("https://dev.opencode.ai");
const $$ThemeSelect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ThemeSelect;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", "  <script>\n	StarlightThemeProvider.updatePickers();\n<\/script> ", ""])), renderComponent($$result, "starlight-theme-select", "starlight-theme-select", {}, { "default": () => renderTemplate`  ${renderComponent($$result, "Select", $$Select, { "icon": "laptop", "label": Astro2.locals.t("themeSelect.accessibleLabel"), "value": "auto", "options": [
    { label: Astro2.locals.t("themeSelect.dark"), selected: false, value: "dark" },
    { label: Astro2.locals.t("themeSelect.light"), selected: false, value: "light" },
    { label: Astro2.locals.t("themeSelect.auto"), selected: true, value: "auto" }
  ], "width": "6.25em" })} ` }), renderScript($$result, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/ThemeSelect.astro?astro&type=script&index=0&lang.ts"));
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/ThemeSelect.astro", void 0);

const $$MobileMenuFooter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mobile-preferences sl-flex astro-5ylmwijb"> <div class="social-icons astro-5ylmwijb"> ${renderComponent($$result, "SocialIcons", $$SocialIcons, { "class": "astro-5ylmwijb" })} </div> ${renderComponent($$result, "ThemeSelect", $$ThemeSelect, { "class": "astro-5ylmwijb" })} ${renderComponent($$result, "LanguageSelect", $$LanguageSelect, { "class": "astro-5ylmwijb" })} </div> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/MobileMenuFooter.astro", void 0);

const base = stripTrailingSlash("/docs");
function pathWithBase(path) {
  path = stripLeadingSlash(path);
  return path ? base + "/" + path : base + "/";
}
function fileWithBase(path) {
  path = stripLeadingSlash(path);
  return path ? base + "/" + path : base;
}

const defaultFormatStrategy = {
  addBase: pathWithBase,
  handleExtension: (href) => stripHtmlExtension(href)
};
const formatStrategies = {
  file: {
    addBase: fileWithBase,
    handleExtension: (href) => ensureHtmlExtension(href)
  },
  directory: defaultFormatStrategy,
  preserve: defaultFormatStrategy
};
const trailingSlashStrategies = {
  always: ensureTrailingSlash,
  never: stripTrailingSlash,
  ignore: (href) => href
};
function formatPath$1(href, { format = "directory", trailingSlash = "ignore" }) {
  const formatStrategy = formatStrategies[format];
  const trailingSlashStrategy = trailingSlashStrategies[trailingSlash];
  href = formatStrategy.handleExtension(href);
  href = formatStrategy.addBase(href);
  if (format === "file") return href;
  href = href === "/" ? href : trailingSlashStrategy(href);
  return href;
}
function createPathFormatter(opts) {
  return (href) => formatPath$1(href, opts);
}

const formatPath = createPathFormatter({
  format: project.build.format,
  trailingSlash: project.trailingSlash
});

function slugToLocale$1(slug, config) {
  const localesConfig = config.locales ?? {};
  const baseSegment = slug?.split("/")[0];
  if (baseSegment && localesConfig[baseSegment]) return baseSegment;
  if (!localesConfig.root) return config.defaultLocale.locale;
  return void 0;
}

function slugToLocale(slug) {
  return slugToLocale$1(slug, starlightConfig);
}
function slugToLocaleData(slug) {
  const locale = slugToLocale(slug);
  return { dir: localeToDir(locale), lang: localeToLang(locale), locale };
}
function localeToLang(locale) {
  const lang = locale ? starlightConfig.locales?.[locale]?.lang : starlightConfig.locales?.root?.lang;
  const defaultLang = starlightConfig.defaultLocale?.lang || starlightConfig.defaultLocale?.locale;
  return lang || defaultLang || BuiltInDefaultLocale.lang;
}
function localeToDir(locale) {
  const dir = locale ? starlightConfig.locales?.[locale]?.dir : starlightConfig.locales?.root?.dir;
  return dir || starlightConfig.defaultLocale.dir;
}
function slugToParam(slug) {
  return slug === "index" || slug === "" ? void 0 : slug.endsWith("/index") ? slug.slice(0, -6) : slug;
}
function slugToPathname(slug) {
  const param = slugToParam(slug);
  return param ? "/" + param + "/" : "/";
}
function localizedId(id, locale) {
  const idLocale = slugToLocale(id);
  if (idLocale) {
    return id.replace(idLocale + "/", locale ? locale + "/" : "");
  } else if (locale) {
    return locale + "/" + id;
  } else {
    return id;
  }
}
function urlToSlug(url) {
  let pathname = url.pathname;
  const base = stripTrailingSlash("/docs");
  if (pathname.startsWith(base)) pathname = pathname.replace(base, "");
  const segments = pathname.split("/");
  const htmlExt = ".html";
  if (segments.at(-1) === "index.html") {
    segments.pop();
  } else if (segments.at(-1)?.endsWith(htmlExt)) {
    const last = segments.pop();
    if (last) segments.push(last.slice(0, -1 * htmlExt.length));
  }
  return segments.filter(Boolean).join("/");
}

function validateLogoImports() {
  if (starlightConfig.logo) {
    let err;
    if ("src" in starlightConfig.logo) {
      if (!logos.dark || !logos.light) {
        err = `Could not resolve logo import for "${starlightConfig.logo.src}" (logo.src)`;
      }
    } else {
      if (!logos.dark) {
        err = `Could not resolve logo import for "${starlightConfig.logo.dark}" (logo.dark)`;
      } else if (!logos.light) {
        err = `Could not resolve logo import for "${starlightConfig.logo.light}" (logo.light)`;
      }
    }
    if (err) throw new Error(err);
  }
}

validateLogoImports();
const normalizeIndexSlug = (slug) => slug === "index" ? "" : slug;
function normalizeCollectionEntry(entry) {
  const slug = normalizeIndexSlug(entry.slug ?? entry.id);
  return {
    ...entry,
    // In a collection with a loader, the `id` is a slug and should be normalized.
    id: entry.slug ? entry.id : slug,
    // In a legacy collection, the `filePath` property doesn't exist.
    filePath: entry.filePath ?? `${getCollectionPathFromRoot("docs", project)}/${entry.id}`,
    // In a collection with a loader, the `slug` property is replaced by the `id`.
    slug: normalizeIndexSlug(entry.slug ?? entry.id)
  };
}
const docs = (await getCollection("docs", ({ data }) => {
  return data.draft === false;
}) ?? []).map(normalizeCollectionEntry);
function getRoutes() {
  const routes2 = docs.map((entry) => ({
    entry,
    slug: entry.slug,
    id: entry.id,
    entryMeta: slugToLocaleData(entry.slug),
    ...slugToLocaleData(entry.slug)
  }));
  return routes2;
}
const routes = getRoutes();
function getParamRouteMapping() {
  const map = /* @__PURE__ */ new Map();
  for (const route of routes) {
    map.set(slugToParam(route.slug), route);
  }
  return map;
}
const routesBySlugParam = getParamRouteMapping();
function getRouteBySlugParam(slugParam) {
  return routesBySlugParam.get(slugParam?.replace(/\/$/, "") || void 0);
}
function getPaths() {
  return routes.map((route) => ({
    params: { slug: slugToParam(route.slug) },
    props: route
  }));
}
const paths = getPaths();
function getLocaleRoutes(locale) {
  return filterByLocale(routes, locale);
}
function filterByLocale(items, locale) {
  if (starlightConfig.locales) {
    if (locale && locale in starlightConfig.locales) {
      return items.filter((i) => i.slug === locale || i.slug.startsWith(locale + "/"));
    } else if (starlightConfig.locales.root) {
      const langKeys = Object.keys(starlightConfig.locales).filter((k) => k !== "root");
      const isLangIndex = new RegExp(`^(${langKeys.join("|")})$`);
      const isLangDir = new RegExp(`^(${langKeys.join("|")})/`);
      return items.filter((i) => !isLangIndex.test(i.slug) && !isLangDir.test(i.slug));
    }
  }
  return items;
}

const DirKey = Symbol("DirKey");
const SlugKey = Symbol("SlugKey");
const neverPathFormatter = createPathFormatter({ trailingSlash: "never" });
const docsCollectionPathFromRoot = getCollectionPathFromRoot("docs", project);
function makeDir(slug) {
  const dir = {};
  Object.defineProperty(dir, DirKey, { enumerable: false });
  Object.defineProperty(dir, SlugKey, { value: slug, enumerable: false });
  return dir;
}
function isDir(data) {
  return DirKey in data;
}
function configItemToEntry(item, currentPathname, locale, routes2) {
  if ("link" in item) {
    return linkFromSidebarLinkItem(item, locale);
  } else if ("autogenerate" in item) {
    return groupFromAutogenerateConfig(item, locale, routes2, currentPathname);
  } else if ("slug" in item) {
    return linkFromInternalSidebarLinkItem(item, locale);
  } else {
    const label = pickLang(item.translations, localeToLang(locale)) || item.label;
    return {
      type: "group",
      label,
      entries: item.items.map((i) => configItemToEntry(i, currentPathname, locale, routes2)),
      collapsed: item.collapsed,
      badge: getSidebarBadge(item.badge, locale, label)
    };
  }
}
function groupFromAutogenerateConfig(item, locale, routes2, currentPathname) {
  const { collapsed: subgroupCollapsed, directory } = item.autogenerate;
  const localeDir = locale ? locale + "/" + directory : directory;
  const dirDocs = routes2.filter((doc) => {
    const filePathFromContentDir = getRoutePathRelativeToCollectionRoot(doc, locale);
    return (
      // Match against `foo.md` or `foo/index.md`.
      stripExtension(filePathFromContentDir) === localeDir || // Match against `foo/anything/else.md`.
      filePathFromContentDir.startsWith(localeDir + "/")
    );
  });
  const tree = treeify(dirDocs, locale, localeDir);
  const label = pickLang(item.translations, localeToLang(locale)) || item.label;
  return {
    type: "group",
    label,
    entries: sidebarFromDir(tree, currentPathname, locale, subgroupCollapsed ?? item.collapsed),
    collapsed: item.collapsed,
    badge: getSidebarBadge(item.badge, locale, label)
  };
}
const isAbsolute = (link) => /^https?:\/\//.test(link);
function linkFromSidebarLinkItem(item, locale) {
  let href = item.link;
  if (!isAbsolute(href)) {
    href = ensureLeadingSlash(href);
    if (locale) href = "/" + locale + href;
  }
  const label = pickLang(item.translations, localeToLang(locale)) || item.label;
  return makeSidebarLink(href, label, getSidebarBadge(item.badge, locale, label), item.attrs);
}
function linkFromInternalSidebarLinkItem(item, locale) {
  const slug = item.slug === "index" ? "" : item.slug;
  const localizedSlug = locale ? slug ? locale + "/" + slug : locale : slug;
  const route = routes.find((entry) => localizedSlug === entry.slug);
  if (!route) {
    const hasExternalSlashes = item.slug.at(0) === "/" || item.slug.at(-1) === "/";
    if (hasExternalSlashes) {
      throw new AstroUserError(
        `The slug \`"${item.slug}"\` specified in the Starlight sidebar config must not start or end with a slash.`,
        `Please try updating \`"${item.slug}"\` to \`"${stripLeadingAndTrailingSlashes(item.slug)}"\`.`
      );
    } else {
      throw new AstroUserError(
        `The slug \`"${item.slug}"\` specified in the Starlight sidebar config does not exist.`,
        "Update the Starlight config to reference a valid entry slug in the docs content collection.\nLearn more about Astro content collection slugs at https://docs.astro.build/en/reference/modules/astro-content/#getentry"
      );
    }
  }
  const frontmatter = route.entry.data;
  const label = pickLang(item.translations, localeToLang(locale)) || item.label || frontmatter.sidebar?.label || frontmatter.title;
  const badge = item.badge ?? frontmatter.sidebar?.badge;
  const attrs = { ...frontmatter.sidebar?.attrs, ...item.attrs };
  return makeSidebarLink(
    slugToPathname(route.slug),
    label,
    getSidebarBadge(badge, locale, label),
    attrs
  );
}
function makeSidebarLink(href, label, badge, attrs) {
  if (!isAbsolute(href)) {
    href = formatPath(href);
  }
  return makeLink({ label, href, badge, attrs });
}
function makeLink({
  attrs = {},
  badge = void 0,
  ...opts
}) {
  return { type: "link", ...opts, badge, isCurrent: false, attrs };
}
function pathsMatch(pathA, pathB) {
  return neverPathFormatter(pathA) === neverPathFormatter(pathB);
}
function getBreadcrumbs(path, baseDir) {
  const pathWithoutExt = stripExtension(path);
  if (pathWithoutExt === baseDir) return [];
  baseDir = ensureTrailingSlash(baseDir);
  const relativePath = pathWithoutExt.startsWith(baseDir) ? pathWithoutExt.replace(baseDir, "") : pathWithoutExt;
  return relativePath.split("/");
}
function getRoutePathRelativeToCollectionRoot(route, locale) {
  return (        localizedId(route.entry.filePath.replace(`${docsCollectionPathFromRoot}/`, ""), locale)
  );
}
function treeify(routes2, locale, baseDir) {
  const treeRoot = makeDir(baseDir);
  routes2.filter((doc) => !doc.entry.data.sidebar.hidden).map((doc) => [getRoutePathRelativeToCollectionRoot(doc, locale), doc]).sort(([a], [b]) => b.split("/").length - a.split("/").length).forEach(([filePathFromContentDir, doc]) => {
    const parts = getBreadcrumbs(filePathFromContentDir, baseDir);
    let currentNode = treeRoot;
    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1;
      if (isLeaf && currentNode.hasOwnProperty(part)) {
        currentNode = currentNode[part];
        part = "index";
      }
      if (!isLeaf) {
        const path = currentNode[SlugKey];
        currentNode[part] ||= makeDir(stripLeadingAndTrailingSlashes(path + "/" + part));
        currentNode = currentNode[part];
      } else {
        currentNode[part] = doc;
      }
    });
  });
  return treeRoot;
}
function linkFromRoute(route) {
  return makeSidebarLink(
    slugToPathname(route.slug),
    route.entry.data.sidebar.label || route.entry.data.title,
    route.entry.data.sidebar.badge,
    route.entry.data.sidebar.attrs
  );
}
function getOrder(routeOrDir) {
  return isDir(routeOrDir) ? Math.min(...Object.values(routeOrDir).flatMap(getOrder)) : (
    // If no order value is found, set it to the largest number possible.
    routeOrDir.entry.data.sidebar.order ?? Number.MAX_VALUE
  );
}
function sortDirEntries(dir) {
  const collator = new Intl.Collator(localeToLang(void 0));
  return dir.sort(([_keyA, a], [_keyB, b]) => {
    const [aOrder, bOrder] = [getOrder(a), getOrder(b)];
    if (aOrder !== bOrder) return aOrder < bOrder ? -1 : 1;
    return collator.compare(isDir(a) ? a[SlugKey] : a.slug, isDir(b) ? b[SlugKey] : b.slug);
  });
}
function groupFromDir(dir, fullPath, dirName, currentPathname, locale, collapsed) {
  const entries = sortDirEntries(Object.entries(dir)).map(
    ([key, dirOrRoute]) => dirToItem(dirOrRoute, `${fullPath}/${key}`, key, currentPathname, locale, collapsed)
  );
  return {
    type: "group",
    label: dirName,
    entries,
    collapsed,
    badge: void 0
  };
}
function dirToItem(dirOrRoute, fullPath, dirName, currentPathname, locale, collapsed) {
  return isDir(dirOrRoute) ? groupFromDir(dirOrRoute, fullPath, dirName, currentPathname, locale, collapsed) : linkFromRoute(dirOrRoute);
}
function sidebarFromDir(tree, currentPathname, locale, collapsed) {
  return sortDirEntries(Object.entries(tree)).map(
    ([key, dirOrRoute]) => dirToItem(dirOrRoute, key, key, currentPathname, locale, collapsed)
  );
}
const intermediateSidebars = /* @__PURE__ */ new Map();
function getSidebar(pathname, locale) {
  let intermediateSidebar = intermediateSidebars.get(locale);
  if (!intermediateSidebar) {
    intermediateSidebar = getIntermediateSidebarFromConfig(starlightConfig.sidebar, pathname, locale);
    intermediateSidebars.set(locale, intermediateSidebar);
  }
  return getSidebarFromIntermediateSidebar(intermediateSidebar, pathname);
}
function getSidebarFromConfig(sidebarConfig, pathname, locale) {
  const intermediateSidebar = getIntermediateSidebarFromConfig(sidebarConfig, pathname, locale);
  return getSidebarFromIntermediateSidebar(intermediateSidebar, pathname);
}
function getIntermediateSidebarFromConfig(sidebarConfig, pathname, locale) {
  const routes2 = getLocaleRoutes(locale);
  if (sidebarConfig) {
    return sidebarConfig.map((group) => configItemToEntry(group, pathname, locale, routes2));
  } else {
    const tree = treeify(routes2, locale, locale || "");
    return sidebarFromDir(tree, pathname, locale, false);
  }
}
function getSidebarFromIntermediateSidebar(intermediateSidebar, pathname) {
  const sidebar = structuredClone(intermediateSidebar);
  setIntermediateSidebarCurrentEntry(sidebar, pathname);
  return sidebar;
}
function setIntermediateSidebarCurrentEntry(intermediateSidebar, pathname) {
  for (const entry of intermediateSidebar) {
    if (entry.type === "link" && pathsMatch(encodeURI(entry.href), pathname)) {
      entry.isCurrent = true;
      return true;
    }
    if (entry.type === "group" && setIntermediateSidebarCurrentEntry(entry.entries, pathname)) {
      return true;
    }
  }
  return false;
}
function getSidebarHash(sidebar) {
  let hash = 0;
  const sidebarIdentity = recursivelyBuildSidebarIdentity(sidebar);
  for (let i = 0; i < sidebarIdentity.length; i++) {
    const char = sidebarIdentity.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}
function recursivelyBuildSidebarIdentity(sidebar) {
  return sidebar.flatMap(
    (entry) => entry.type === "group" ? entry.label + recursivelyBuildSidebarIdentity(entry.entries) : entry.label + entry.href
  ).join("");
}
function flattenSidebar(sidebar) {
  return sidebar.flatMap(
    (entry) => entry.type === "group" ? flattenSidebar(entry.entries) : entry
  );
}
function getPrevNextLinks(sidebar, paginationEnabled, config2) {
  const entries = flattenSidebar(sidebar);
  const currentIndex = entries.findIndex((entry) => entry.isCurrent);
  const prev = applyPrevNextLinkConfig(entries[currentIndex - 1], paginationEnabled, config2.prev);
  const next = applyPrevNextLinkConfig(
    currentIndex > -1 ? entries[currentIndex + 1] : void 0,
    paginationEnabled,
    config2.next
  );
  return { prev, next };
}
function applyPrevNextLinkConfig(link, paginationEnabled, config2) {
  if (config2 === false) return void 0;
  else if (config2 === true) return link;
  else if (typeof config2 === "string" && link) {
    return { ...link, label: config2 };
  } else if (typeof config2 === "object") {
    if (link) {
      return {
        ...link,
        label: config2.label ?? link.label,
        href: config2.link ?? link.href,
        // Explicitly remove sidebar link attributes for prev/next links.
        attrs: {}
      };
    } else if (config2.link && config2.label) {
      return makeLink({ href: config2.link, label: config2.label });
    }
  }
  return paginationEnabled ? link : void 0;
}
function getSidebarBadge(config2, locale, itemLabel) {
  if (!config2) return;
  if (typeof config2 === "string") {
    return { variant: "default", text: config2 };
  }
  return { ...config2, text: getSidebarBadgeText(config2.text, locale, itemLabel) };
}
function getSidebarBadgeText(text, locale, itemLabel) {
  if (typeof text === "string") return text;
  const defaultLang = starlightConfig.defaultLocale?.lang || starlightConfig.defaultLocale?.locale || BuiltInDefaultLocale.lang;
  const defaultText = text[defaultLang];
  if (!defaultText) {
    throw new AstroUserError(
      `The badge text for "${itemLabel}" must have a key for the default language "${defaultLang}".`,
      "Update the Starlight config to include a badge text for the default language.\nLearn more about sidebar badges internationalization at https://starlight.astro.build/guides/sidebar/#internationalization-with-badges"
    );
  }
  return pickLang(text, localeToLang(locale)) || defaultText;
}

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$6 = createAstro("https://dev.opencode.ai");
const $$SidebarPersister = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$SidebarPersister;
  const hash = getSidebarHash(Astro2.locals.starlightRoute.sidebar);
  return renderTemplate`${renderComponent($$result, "sl-sidebar-state-persist", "sl-sidebar-state-persist", { "data-hash": hash, "class": "astro-m3cpjljy" }, { "default": () => renderTemplate(_a$1 || (_a$1 = __template$1([` <script aria-hidden="true">
		(() => {
			try {
				if (!matchMedia('(min-width: 50em)').matches) return;
				/** @type {HTMLElement | null} */
				const target = document.querySelector('sl-sidebar-state-persist');
				const state = JSON.parse(sessionStorage.getItem('sl-sidebar-state') || '0');
				if (!target || !state || target.dataset.hash !== state.hash) return;
				window._starlightScrollRestore = state.scroll;
				customElements.define(
					'sl-sidebar-restore',
					class SidebarRestore extends HTMLElement {
						connectedCallback() {
							try {
								const idx = parseInt(this.dataset.index || '');
								const details = this.closest('details');
								if (details && typeof state.open[idx] === 'boolean') details.open = state.open[idx];
							} catch {}
						}
					}
				);
			} catch {}
		})();
	<\/script> `, ` <script aria-hidden="true">
		(() => {
			const scroller = document.getElementById('starlight__sidebar');
			if (!window._starlightScrollRestore || !scroller) return;
			scroller.scrollTop = window._starlightScrollRestore;
			delete window._starlightScrollRestore;
		})();
	<\/script> `])), renderSlot($$result, $$slots["default"])) })} `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/SidebarPersister.astro", void 0);

const $$Astro$5 = createAstro("https://dev.opencode.ai");
const $$SidebarRestorePoint = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$SidebarRestorePoint;
  const currentGroupIndexSymbol = Symbol.for("starlight-sidebar-group-index");
  const locals = Astro2.locals;
  const index = locals[currentGroupIndexSymbol] || 0;
  locals[currentGroupIndexSymbol] = index + 1;
  return renderTemplate`${renderComponent($$result, "sl-sidebar-restore", "sl-sidebar-restore", { "data-index": index })}`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/SidebarRestorePoint.astro", void 0);

const $$Astro$4 = createAstro("https://dev.opencode.ai");
const $$SidebarSublist = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$SidebarSublist;
  const { sublist, nested } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<ul${addAttribute([{ "top-level": !nested }, "astro-4cs6nhal"], "class:list")}> ${sublist.map((entry) => renderTemplate`<li class="astro-4cs6nhal"> ${entry.type === "link" ? renderTemplate`<a${addAttribute(entry.href, "href")}${addAttribute(entry.isCurrent && "page", "aria-current")}${addAttribute([[{ large: !nested }, entry.attrs.class], "astro-4cs6nhal"], "class:list")}${spreadAttributes(entry.attrs)}> <span class="astro-4cs6nhal">${entry.label}</span> ${entry.badge && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": entry.badge.variant, "class": (entry.badge.class ?? "") + " astro-4cs6nhal", "text": entry.badge.text })}`} </a>` : renderTemplate`<details${addAttribute(flattenSidebar(entry.entries).some((i) => i.isCurrent) || !entry.collapsed, "open")} class="astro-4cs6nhal"> ${renderComponent($$result, "SidebarRestorePoint", $$SidebarRestorePoint, { "class": "astro-4cs6nhal" })} <summary class="astro-4cs6nhal"> <div class="group-label astro-4cs6nhal"> <span class="large astro-4cs6nhal">${entry.label}</span> ${entry.badge && renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": entry.badge.variant, "class": (entry.badge.class ?? "") + " astro-4cs6nhal", "text": entry.badge.text })}`} </div> ${renderComponent($$result, "Icon", $$Icon, { "name": "right-caret", "class": "caret astro-4cs6nhal", "size": "1.25rem" })} </summary> ${renderComponent($$result, "Astro.self", Astro2.self, { "sublist": entry.entries, "nested": true, "class": "astro-4cs6nhal" })} </details>`} </li>`)} </ul> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/SidebarSublist.astro", void 0);

const $$Astro$3 = createAstro("https://dev.opencode.ai");
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { sidebar } = Astro2.locals.starlightRoute;
  return renderTemplate`${renderComponent($$result, "SidebarPersister", $$SidebarPersister, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SidebarSublist", $$SidebarSublist, { "sublist": sidebar })} ` })} ${maybeRenderHead()}<div class="md:sl-hidden"> ${renderComponent($$result, "MobileMenuFooter", $$MobileMenuFooter, {})} </div>`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Sidebar.astro", void 0);

const $$Astro$2 = createAstro("https://dev.opencode.ai");
const $$SkipLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SkipLink;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`#${PAGE_TITLE_ID}`, "href")} class="astro-wgc3lg2c">${Astro2.locals.t("skipLink.label")}</a> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/SkipLink.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$ThemeProvider = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["<script>\n	window.StarlightThemeProvider = (() => {\n		const storedTheme =\n			typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');\n		const theme =\n			storedTheme ||\n			(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n		document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';\n		return {\n			updatePickers(theme = storedTheme || 'auto') {\n				document.querySelectorAll('starlight-theme-select').forEach((picker) => {\n					const select = picker.querySelector('select');\n					if (select) select.value = theme;\n					/** @type {HTMLTemplateElement | null} */\n					const tmpl = document.querySelector(`#theme-icons`);\n					const newIcon = tmpl && tmpl.content.querySelector('.' + theme);\n					if (newIcon) {\n						const oldIcon = picker.querySelector('svg.label-icon');\n						if (oldIcon) {\n							oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);\n						}\n					}\n				});\n			},\n		};\n	})();\n<\/script><template id=\"theme-icons\">", "", "", "</template>"], ["<script>\n	window.StarlightThemeProvider = (() => {\n		const storedTheme =\n			typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');\n		const theme =\n			storedTheme ||\n			(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n		document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';\n		return {\n			updatePickers(theme = storedTheme || 'auto') {\n				document.querySelectorAll('starlight-theme-select').forEach((picker) => {\n					const select = picker.querySelector('select');\n					if (select) select.value = theme;\n					/** @type {HTMLTemplateElement | null} */\n					const tmpl = document.querySelector(\\`#theme-icons\\`);\n					const newIcon = tmpl && tmpl.content.querySelector('.' + theme);\n					if (newIcon) {\n						const oldIcon = picker.querySelector('svg.label-icon');\n						if (oldIcon) {\n							oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);\n						}\n					}\n				});\n			},\n		};\n	})();\n<\/script><template id=\"theme-icons\">", "", "", "</template>"])), renderComponent($$result, "Icon", $$Icon, { "name": "sun", "class": "light" }), renderComponent($$result, "Icon", $$Icon, { "name": "moon", "class": "dark" }), renderComponent($$result, "Icon", $$Icon, { "name": "laptop", "class": "auto" }));
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/ThemeProvider.astro", void 0);

const $$Astro$1 = createAstro("https://dev.opencode.ai");
const $$TwoColumnContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TwoColumnContent;
  return renderTemplate`${maybeRenderHead()}<div class="lg:sl-flex astro-grxahszl"> ${Astro2.locals.starlightRoute.toc && renderTemplate`<aside class="right-sidebar-container print:hidden astro-grxahszl"> <div class="right-sidebar astro-grxahszl"> ${renderSlot($$result, $$slots["right-sidebar"])} </div> </aside>`} <div class="main-pane astro-grxahszl">${renderSlot($$result, $$slots["default"])}</div> </div> `;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/TwoColumnContent.astro", void 0);

const $$Astro = createAstro("https://dev.opencode.ai");
const $$Page = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Page;
  const { starlightRoute } = Astro2.locals;
  const pagefindEnabled = starlightRoute.entry.slug !== "404" && !starlightRoute.entry.slug.endsWith("/404") && starlightRoute.entry.data.pagefind !== false;
  const htmlDataAttributes = { "data-theme": "dark" };
  if (Boolean(starlightRoute.toc)) htmlDataAttributes["data-has-toc"] = "";
  if (starlightRoute.hasSidebar) htmlDataAttributes["data-has-sidebar"] = "";
  if (Boolean(starlightRoute.entry.data.hero)) htmlDataAttributes["data-has-hero"] = "";
  const mainDataAttributes = {};
  if (pagefindEnabled) mainDataAttributes["data-pagefind-body"] = "";
  return renderTemplate`<html${addAttribute(starlightRoute.lang, "lang")}${addAttribute(starlightRoute.dir, "dir")}${spreadAttributes(htmlDataAttributes, void 0, { "class": "astro-3453j7es" })}> <head>${renderComponent($$result, "Head", $$Head, { "class": "astro-3453j7es" })}${renderComponent($$result, "ThemeProvider", $$ThemeProvider, { "class": "astro-3453j7es" })}<link rel="stylesheet"${addAttribute(printHref, "href")} media="print">${renderHead()}</head> <body class="astro-3453j7es"> ${renderComponent($$result, "SkipLink", $$SkipLink, { "class": "astro-3453j7es" })} ${renderComponent($$result, "PageFrame", $$PageFrame, { "class": "astro-3453j7es" }, { "default": ($$result2) => renderTemplate`  ${renderScript($$result2, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Page.astro?astro&type=script&index=0&lang.ts")} ${renderComponent($$result2, "TwoColumnContent", $$TwoColumnContent, { "class": "astro-3453j7es" }, { "default": ($$result3) => renderTemplate`  <main${spreadAttributes(mainDataAttributes, void 0, { "class": "astro-3453j7es" })}${addAttribute(starlightRoute.entryMeta.lang, "lang")}${addAttribute(starlightRoute.entryMeta.dir, "dir")}>  ${renderComponent($$result3, "Banner", $$Banner, { "class": "astro-3453j7es" })} ${starlightRoute.entry.data.hero ? renderTemplate`${renderComponent($$result3, "ContentPanel", $$ContentPanel, { "class": "astro-3453j7es" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Hero", $$Hero, { "class": "astro-3453j7es" })} ${renderComponent($$result4, "MarkdownContent", $$MarkdownContent, { "class": "astro-3453j7es" }, { "default": ($$result5) => renderTemplate` ${renderSlot($$result5, $$slots["default"])} ` })} ${renderComponent($$result4, "Footer", $$Footer, { "class": "astro-3453j7es" })} ` })}` : renderTemplate`${renderComponent($$result3, "Fragment", Fragment, { "class": "astro-3453j7es" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "ContentPanel", $$ContentPanel, { "class": "astro-3453j7es" }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "PageTitle", $$PageTitle, { "class": "astro-3453j7es" })} ${starlightRoute.entry.data.draft && renderTemplate`${renderComponent($$result5, "DraftContentNotice", $$DraftContentNotice, { "class": "astro-3453j7es" })}`}${starlightRoute.isFallback && renderTemplate`${renderComponent($$result5, "FallbackContentNotice", $$FallbackContentNotice, { "class": "astro-3453j7es" })}`}` })} ${renderComponent($$result4, "ContentPanel", $$ContentPanel, { "class": "astro-3453j7es" }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "MarkdownContent", $$MarkdownContent, { "class": "astro-3453j7es" }, { "default": ($$result6) => renderTemplate` ${renderSlot($$result6, $$slots["default"])} ` })} ${renderComponent($$result5, "Footer", $$Footer, { "class": "astro-3453j7es" })} ` })} ` })}`} </main> `, "right-sidebar": ($$result3) => renderTemplate`${renderComponent($$result3, "PageSidebar", $$PageSidebar, { "slot": "right-sidebar", "class": "astro-3453j7es" })}` })} `, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "class": "astro-3453j7es" })}`, "sidebar": ($$result2) => renderTemplate`${starlightRoute.hasSidebar && renderTemplate`${renderComponent($$result2, "Sidebar", $$Sidebar, { "slot": "sidebar", "class": "astro-3453j7es" })}`}` })} </body></html>`;
}, "/home/josh/projects/sst/opencode/node_modules/@astrojs/starlight/components/Page.astro", void 0);

function generateToC(headings, { minHeadingLevel, maxHeadingLevel, title }) {
  headings = headings.filter(({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel);
  const toc = [{ depth: 2, slug: PAGE_TITLE_ID, text: title, children: [] }];
  for (const heading of headings) injectChild(toc, { ...heading, children: [] });
  return toc;
}
function injectChild(items, item) {
  const lastItem = items.at(-1);
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    return injectChild(lastItem.children, item);
  }
}

const makeAPI = (data) => {
  const trackedDocsFiles = new Map(data);
  return {
    getNewestCommitDate: (file) => {
      const timestamp = trackedDocsFiles.get(file);
      if (!timestamp) throw new Error(`Failed to retrieve the git history for file "${file}"`);
      return new Date(timestamp);
    }
  };
};

const api = makeAPI([["src/content/docs/zen.mdx",1760550780000],["src/content/docs/mcp-servers.mdx",1760474639000],["src/content/docs/custom-tools.mdx",1760393960000],["src/content/docs/models.mdx",1760322931000],["src/content/docs/providers.mdx",1760299292000],["src/content/docs/plugins.mdx",1760030504000],["src/content/docs/agents.mdx",1760030391000],["src/content/docs/config.mdx",1760030391000],["src/content/docs/tools.mdx",1760030391000],["src/content/docs/permissions.mdx",1759940022000],["src/content/docs/troubleshooting.mdx",1759855837000],["src/content/docs/sdk.mdx",1759662029000],["src/content/docs/lsp.mdx",1759595289000],["src/content/docs/cli.mdx",1759513616000],["src/content/docs/commands.mdx",1759513616000],["src/content/docs/enterprise.mdx",1759513616000],["src/content/docs/formatters.mdx",1759513616000],["src/content/docs/ide.mdx",1759513616000],["src/content/docs/index.mdx",1759513616000],["src/content/docs/keybinds.mdx",1759513616000],["src/content/docs/server.mdx",1759513616000],["src/content/docs/share.mdx",1759513616000],["src/content/docs/themes.mdx",1759513616000],["src/content/docs/tui.mdx",1759513616000],["src/content/docs/gitlab.mdx",1757476147000],["src/content/docs/docs/index.mdx",1756870248000],["src/content/docs/github.mdx",1756870248000],["src/content/docs/modes.mdx",1756870248000],["src/content/docs/rules.mdx",1756870248000],["src/content/docs/docs/sdk.mdx",1756866332000],["src/content/docs/docs/enterprise.mdx",1756848515000],["src/content/docs/docs/providers.mdx",1756848515000],["src/content/docs/docs/zen.mdx",1756848515000],["src/content/docs/docs/troubleshooting.mdx",1756827064000],["src/content/docs/docs/plugins.mdx",1756762552000],["src/content/docs/docs/models.mdx",1756305711000],["src/content/docs/docs/mcp-servers.mdx",1756243843000],["src/content/docs/docs/commands.mdx",1756239053000],["src/content/docs/docs/config.mdx",1756239053000],["src/content/docs/docs/tui.mdx",1756239053000],["src/content/docs/docs/agents.mdx",1755978722000],["src/content/docs/docs/lsp.mdx",1755976942000],["src/content/docs/docs/gitlab.mdx",1755890042000],["src/content/docs/docs/github.mdx",1755885296000],["src/content/docs/docs/server.mdx",1755713582000],["src/content/docs/docs/keybinds.mdx",1755643142000],["src/content/docs/docs/cli.mdx",1755641496000],["src/content/docs/docs/permissions.mdx",1755013179000],["src/content/docs/docs/formatters.mdx",1754912926000],["src/content/docs/docs/modes.mdx",1754607114000],["src/content/docs/docs/lsp-servers.mdx",1754082213000],["src/content/docs/docs/ide.mdx",1753646085000],["src/content/docs/docs/using-in-ide.mdx",1753217204000],["src/content/docs/docs/share.mdx",1752700105000],["src/content/docs/docs/rules.mdx",1752494797000],["src/content/docs/docs/themes.mdx",1752006605000],["src/content/docs/docs/shortcuts.mdx",1750364891000]]);const getNewestCommitDate = api.getNewestCommitDate;

const version = "0.34.3";

const HeadConfigSchema = () => arrayType(
  objectType({
    /** Name of the HTML tag to add to `<head>`, e.g. `'meta'`, `'link'`, or `'script'`. */
    tag: enumType(["title", "base", "link", "style", "meta", "script", "noscript", "template"]),
    /** Attributes to set on the tag, e.g. `{ rel: 'stylesheet', href: '/custom.css' }`. */
    attrs: recordType(unionType([stringType(), booleanType(), undefinedType()])).optional(),
    /** Content to place inside the tag (optional). */
    content: stringType().optional()
  })
).default([]);

const canonicalTrailingSlashStrategies = {
  always: ensureTrailingSlash,
  never: stripTrailingSlash,
  ignore: ensureTrailingSlash
};
function formatCanonical(href, opts) {
  return canonicalTrailingSlashStrategies[opts.trailingSlash](href);
}

const HeadSchema = HeadConfigSchema();
function getHead({ entry, lang }, context, siteTitle) {
  const { data } = entry;
  const canonical = context.site ? new URL(context.url.pathname, context.site) : void 0;
  const canonicalHref = canonical?.href ? formatCanonical(canonical.href, {
    trailingSlash: project.trailingSlash
  }) : void 0;
  const description = data.description || starlightConfig.description;
  const headDefaults = [
    { tag: "meta", attrs: { charset: "utf-8" } },
    {
      tag: "meta",
      attrs: { name: "viewport", content: "width=device-width, initial-scale=1" }
    },
    { tag: "title", content: `${data.title} ${starlightConfig.titleDelimiter} ${siteTitle}` },
    { tag: "link", attrs: { rel: "canonical", href: canonicalHref } },
    { tag: "meta", attrs: { name: "generator", content: context.generator } },
    {
      tag: "meta",
      attrs: { name: "generator", content: `Starlight v${version}` }
    },
    // Favicon
    {
      tag: "link",
      attrs: {
        rel: "shortcut icon",
        href: fileWithBase(starlightConfig.favicon.href),
        type: starlightConfig.favicon.type
      }
    },
    // OpenGraph Tags
    { tag: "meta", attrs: { property: "og:title", content: data.title } },
    { tag: "meta", attrs: { property: "og:type", content: "article" } },
    { tag: "meta", attrs: { property: "og:url", content: canonicalHref } },
    { tag: "meta", attrs: { property: "og:locale", content: lang } },
    { tag: "meta", attrs: { property: "og:description", content: description } },
    { tag: "meta", attrs: { property: "og:site_name", content: siteTitle } },
    // Twitter Tags
    {
      tag: "meta",
      attrs: { name: "twitter:card", content: "summary_large_image" }
    }
  ];
  if (description)
    headDefaults.push({
      tag: "meta",
      attrs: { name: "description", content: description }
    });
  if (context.site) {
    headDefaults.push({
      tag: "link",
      attrs: {
        rel: "sitemap",
        href: fileWithBase("/sitemap-index.xml")
      }
    });
  }
  const twitterLink = starlightConfig.social?.find(({ icon }) => icon === "twitter" || icon === "x.com");
  if (twitterLink) {
    headDefaults.push({
      tag: "meta",
      attrs: {
        name: "twitter:site",
        content: new URL(twitterLink.href).pathname.replace("/", "@")
      }
    });
  }
  return createHead(headDefaults, starlightConfig.head, data.head);
}
function createHead(defaults, ...heads) {
  let head = HeadSchema.parse(defaults);
  for (const next of heads) {
    head = mergeHead(head, next);
  }
  return sortHead(head);
}
function hasTag(head, entry) {
  switch (entry.tag) {
    case "title":
      return head.some(({ tag }) => tag === "title");
    case "meta":
      return hasOneOf(head, entry, ["name", "property", "http-equiv"]);
    case "link":
      return head.some(
        ({ attrs }) => entry.attrs?.rel === "canonical" && attrs?.rel === "canonical"
      );
    default:
      return false;
  }
}
function hasOneOf(head, entry, keys) {
  const attr = getAttr(keys, entry);
  if (!attr) return false;
  const [key, val] = attr;
  return head.some(({ tag, attrs }) => tag === entry.tag && attrs?.[key] === val);
}
function getAttr(keys, entry) {
  let attr;
  for (const key of keys) {
    const val = entry.attrs?.[key];
    if (val) {
      attr = [key, val];
      break;
    }
  }
  return attr;
}
function mergeHead(oldHead, newHead) {
  return [...oldHead.filter((tag) => !hasTag(newHead, tag)), ...newHead];
}
function sortHead(head) {
  return head.sort((a, b) => {
    const aImportance = getImportance(a);
    const bImportance = getImportance(b);
    return aImportance > bImportance ? -1 : bImportance > aImportance ? 1 : 0;
  });
}
function getImportance(entry) {
  if (entry.tag === "meta" && entry.attrs && ("charset" in entry.attrs || "http-equiv" in entry.attrs || entry.attrs.name === "viewport")) {
    return 100;
  }
  if (entry.tag === "title") return 90;
  if (entry.tag !== "meta") {
    if (entry.tag === "link" && entry.attrs && "rel" in entry.attrs && entry.attrs.rel === "shortcut icon") {
      return 70;
    }
    return 80;
  }
  return 0;
}

async function getRoute(context) {
  return "slug" in context.params && getRouteBySlugParam(context.params.slug) || await get404Route(context.locals);
}
async function useRouteData(context, route, { Content, headings }) {
  const routeData = generateRouteData({ props: { ...route, headings }, context });
  return { ...routeData, Content };
}
function generateRouteData({
  props,
  context
}) {
  const { entry, locale, lang } = props;
  const sidebar = getSidebar(context.url.pathname, locale);
  const siteTitle = getSiteTitle(lang);
  return {
    ...props,
    siteTitle,
    siteTitleHref: getSiteTitleHref(locale),
    sidebar,
    hasSidebar: entry.data.template !== "splash",
    pagination: getPrevNextLinks(sidebar, starlightConfig.pagination, entry.data),
    toc: getToC(props),
    lastUpdated: getLastUpdated(props),
    editUrl: getEditUrl(props),
    head: getHead(props, context, siteTitle)
  };
}
function getToC({ entry, lang, headings }) {
  const tocConfig = entry.data.template === "splash" ? false : entry.data.tableOfContents !== void 0 ? entry.data.tableOfContents : starlightConfig.tableOfContents;
  if (!tocConfig) return;
  const t = useTranslations(lang);
  return {
    ...tocConfig,
    items: generateToC(headings, { ...tocConfig, title: t("tableOfContents.overview") })
  };
}
function getLastUpdated({ entry }) {
  const { lastUpdated: frontmatterLastUpdated } = entry.data;
  const { lastUpdated: configLastUpdated } = starlightConfig;
  if (frontmatterLastUpdated ?? configLastUpdated) {
    try {
      return frontmatterLastUpdated instanceof Date ? frontmatterLastUpdated : getNewestCommitDate(entry.filePath);
    } catch {
      return void 0;
    }
  }
  return void 0;
}
function getEditUrl({ entry }) {
  const { editUrl } = entry.data;
  if (editUrl === false) return;
  let url;
  if (typeof editUrl === "string") {
    url = editUrl;
  } else {
    url = ensureTrailingSlash(starlightConfig.editLink.baseUrl) + entry.filePath;
  }
  return url ? new URL(url) : void 0;
}
function getSiteTitle(lang) {
  const defaultLang = starlightConfig.defaultLocale.lang;
  if (lang && starlightConfig.title[lang]) {
    return starlightConfig.title[lang];
  }
  return starlightConfig.title[defaultLang];
}
function getSiteTitleHref(locale) {
  return formatPath(locale || "/");
}
async function get404Route(locals) {
  const { lang = BuiltInDefaultLocale.lang, dir = BuiltInDefaultLocale.dir } = starlightConfig.defaultLocale || {};
  let locale = starlightConfig.defaultLocale?.locale;
  if (locale === "root") locale = void 0;
  const entryMeta = { dir, lang, locale };
  const fallbackEntry = {
    slug: "404",
    id: "404",
    body: "",
    collection: "docs",
    data: {
      title: "404",
      template: "splash",
      editUrl: false,
      head: [],
      hero: { tagline: locals.t("404.text"), actions: [] },
      pagefind: false,
      sidebar: { hidden: false, attrs: {} },
      draft: false
    },
    filePath: `${getCollectionPathFromRoot("docs", project)}/404.md`
  };
  const userEntry = await getEntry("docs", "404");
  const entry = userEntry ? normalizeCollectionEntry(userEntry) : fallbackEntry;
  return { ...entryMeta, entryMeta, entry, id: entry.id, slug: entry.slug };
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	return x;
}

const routeMiddleware = [
];

async function attachRouteDataAndRunMiddleware(context, routeData) {
  context.locals.starlightRoute = klona(routeData);
  const runner = new MiddlewareRunner(context, routeMiddleware);
  await runner.run();
}
class MiddlewareRunnerStep {
  #callback;
  constructor(callback) {
    this.#callback = callback;
  }
  async run(context, next) {
    if (this.#callback) {
      await this.#callback(context, next);
      this.#callback = null;
    }
  }
}
class MiddlewareRunner {
  #context;
  #steps;
  constructor(context, stack = []) {
    this.#context = context;
    this.#steps = stack.map((callback) => new MiddlewareRunnerStep(callback));
  }
  async #stepThrough(steps) {
    let currentStep;
    while (steps.length > 0) {
      [currentStep, ...steps] = steps;
      await currentStep.run(this.#context, async () => this.#stepThrough(steps));
    }
  }
  async run() {
    await this.#stepThrough(this.#steps);
  }
}

export { $$Page as $, HeadConfigSchema as H, attachRouteDataAndRunMiddleware as a, urlToSlug as b, slugToLocaleData as c, getSidebarFromConfig as d, getSidebar as e, getSiteTitle as f, getRoute as g, getToC as h, getSiteTitleHref as i, getPrevNextLinks as j, getHead as k, gBase64 as l, paths as p, slugToLocale$1 as s, useRouteData as u };
