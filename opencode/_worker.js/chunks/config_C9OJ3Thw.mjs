globalThis.process ??= {}; globalThis.process.env ??= {};
const stage = process.env.SST_STAGE || "dev";
const config = {
  url: stage === "production" ? "https://opencode.ai" : `https://${stage}.opencode.ai`,
  console: stage === "production" ? "https://opencode.ai/auth" : `https://${stage}.opencode.ai/auth`,
  email: "contact@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/sst/opencode",
  headerLinks: [
    { name: "Home", url: "/" },
    { name: "Docs", url: "/docs/" }
  ]
};

export { config as c };
