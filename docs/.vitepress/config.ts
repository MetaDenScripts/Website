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

export default defineConfig({
  title: "MetaDen Scripts",
  description: "Engineered for immersive roleplay. Built to scale.",
  cleanUrls: true,
  ignoreDeadLinks: false,
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
