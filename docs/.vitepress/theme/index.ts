import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Layout from "./Layout.vue";
import MissingSectionNotice from "./components/MissingSectionNotice.vue";
import LatestScriptsGrid from "./components/LatestScriptsGrid.vue";
import ScriptsIndexGrid from "./components/ScriptsIndexGrid.vue";
import "./custom.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("MissingSectionNotice", MissingSectionNotice);
    app.component("LatestScriptsGrid", LatestScriptsGrid);
    app.component("ScriptsIndexGrid", ScriptsIndexGrid);
  }
};

export default theme;
