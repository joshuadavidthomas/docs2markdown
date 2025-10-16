globalThis.process ??= {}; globalThis.process.env ??= {};
const lang = Object.freeze(JSON.parse("{\"displayName\":\"CODEOWNERS\",\"name\":\"codeowners\",\"patterns\":[{\"include\":\"#comment\"},{\"include\":\"#pattern\"},{\"include\":\"#owner\"}],\"repository\":{\"comment\":{\"patterns\":[{\"begin\":\"^\\\\s*#\",\"captures\":{\"0\":{\"name\":\"punctuation.definition.comment.codeowners\"}},\"end\":\"$\",\"name\":\"comment.line.codeowners\"}]},\"owner\":{\"match\":\"\\\\S*@\\\\S+\",\"name\":\"storage.type.function.codeowners\"},\"pattern\":{\"match\":\"^\\\\s*(\\\\S+)\",\"name\":\"variable.other.codeowners\"}},\"scopeName\":\"text.codeowners\"}"));

const codeowners = [
lang
];

export { codeowners as default };
