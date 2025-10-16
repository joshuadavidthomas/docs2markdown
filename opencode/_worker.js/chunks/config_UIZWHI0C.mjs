globalThis.process ??= {}; globalThis.process.env ??= {};
const astroConfig = {"base":"/docs","root":"file:///home/josh/projects/sst/opencode/packages/web/","srcDir":"file:///home/josh/projects/sst/opencode/packages/web/src/","build":{"assets":"_astro"},"markdown":{"shikiConfig":{"langs":[]}}};
const ecIntegrationOptions = {"themes":["github-light","github-dark"]};
let ecConfigFileOptions = {};
try {
	ecConfigFileOptions = (await import('./ec-config_gJjX24ia.mjs')).default;
} catch (e) {
	console.error('*** Failed to load Expressive Code config file "file:///home/josh/projects/sst/opencode/packages/web/ec.config.mjs". You can ignore this message if you just renamed/removed the file.\n\n(Full error message: "' + (e?.message || e) + '")\n');
}

export { astroConfig, ecConfigFileOptions, ecIntegrationOptions };
