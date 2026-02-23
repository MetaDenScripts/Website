import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

interface ScriptEntry {
  id: string;
  name: string;
  summary: string;
  storeUrl: string;
  addedAt: string;
  order: number;
  status: "active" | "deprecated";
  sections: Record<string, string>;
}

const configDir = path.dirname(fileURLToPath(import.meta.url));
const scriptsIndexPath = path.resolve(configDir, "../scripts/_meta/scripts-index.json");
const scriptsData = JSON.parse(fs.readFileSync(scriptsIndexPath, "utf8")) as {
  scripts: ScriptEntry[];
};

const scriptNav = [...scriptsData.scripts]
  .sort((left, right) => left.name.localeCompare(right.name))
  .map((script) => ({
    text: script.name,
    link: `/${script.sections.readme.replace(/\\.md$/, "")}`
  }));

const scriptSidebar = [...scriptsData.scripts]
  .sort((left, right) => left.name.localeCompare(right.name))
  .flatMap((script) => {
    const basePath = `/scripts/${script.id}/`;

    return [
      {
        text: script.name,
        collapsed: true,
        items: [
          { text: "README", link: `${basePath}readme` },
          { text: "API", link: `${basePath}api` },
          { text: "Config", link: `${basePath}config-examples` },
          { text: "Changelog", link: `${basePath}changelog` }
        ]
      }
    ];
  });

const siteUrl = "https://metadenscripts.com";
const socialDescription =
  "Premium FiveM scripts with clean APIs, polished UI, and scalable architecture for serious roleplay servers.";
const socialImage = `${siteUrl}/mdscripts.png`;

const buildPageUrl = (relativePath?: string) => {
  if (!relativePath) {
    return siteUrl;
  }

  const withoutExtension = relativePath.replace(/\.md$/, "");
  const normalized = withoutExtension.replace(/\/index$/, "/");
  const withLeadingSlash = normalized.startsWith("/") ? normalized : `/${normalized}`;

  return `${siteUrl}${withLeadingSlash}`;
};

export default defineConfig({
  // base: "/Website/",
  title: "MetaDen Scripts",
  description: socialDescription,
  head: [
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:image", content: socialImage }],
    ["meta", { property: "og:image:alt", content: "MetaDen Scripts logo" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: socialImage }],
    ["meta", { name: "twitter:image:alt", content: "MetaDen Scripts logo" }]
  ],
  transformHead: ({ pageData }) => {
    const pageTitle = pageData.title
      ? `${pageData.title} | MetaDen Scripts`
      : "MetaDen Scripts";
    const frontmatter = pageData.frontmatter as { description?: string } | undefined;
    const pageDescription = pageData.description || frontmatter?.description || socialDescription;
    const pageUrl = buildPageUrl(pageData.relativePath);

    return [
      ["meta", { property: "og:title", content: pageTitle }],
      ["meta", { property: "og:description", content: pageDescription }],
      ["meta", { property: "og:url", content: pageUrl }],
      ["meta", { name: "twitter:title", content: pageTitle }],
      ["meta", { name: "twitter:description", content: pageDescription }]
    ];
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    logo: "/mdscripts.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/scripts/" },
      { text: "Store", link: "https://metadenscripts.tebex.io/" },
      { text: "Discord", link: "https://discord.gg/BPADZYQA9v" },
      {
        text: "Script Index",
        items: scriptNav
      }
    ],
    sidebar: {
      "/scripts/": [
        {
          text: "Documentation",
          items: [{ text: "All Scripts", link: "/scripts/" }]
        },
        ...scriptSidebar
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/MetaDenScripts" }],
    search: {
      provider: "local"
    }
  },
  markdown: {
    lineNumbers: true,
    theme: {
      light: "one-light",
      dark: "catppuccin-mocha"
    }
  }
});
