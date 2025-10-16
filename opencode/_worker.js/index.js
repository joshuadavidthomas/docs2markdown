globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/server_DggLNk9U.mjs';
import { manifest } from './manifest_DULGfd-h.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/s/_id_.astro.mjs');
const _page3 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["../../node_modules/@astrojs/starlight/routes/static/404.astro", _page1],
    ["src/pages/s/[id].astro", _page2],
    ["../../node_modules/@astrojs/starlight/routes/static/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
