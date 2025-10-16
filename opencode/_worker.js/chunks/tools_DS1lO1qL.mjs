globalThis.process ??= {}; globalThis.process.env ??= {};
async function getMod() {
						return import('./tools_DDe_u4mx.mjs');
					}
					const collectedLinks = [];
					const collectedStyles = [];
					const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts: [] };

export { defaultMod as default };
