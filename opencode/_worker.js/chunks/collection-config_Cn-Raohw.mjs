globalThis.process ??= {}; globalThis.process.env ??= {};
let userCollections;
			try {
				userCollections = (await import('./content.config_CL5oAIHI.mjs')).collections;
			} catch {}
			const collections = userCollections;

export { collections };
