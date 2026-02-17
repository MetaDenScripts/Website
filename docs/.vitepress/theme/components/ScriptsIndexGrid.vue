<script setup lang="ts">
import scriptsIndex from "../../../scripts/_meta/scripts-index.json";
import type { ScriptIndexItem, SectionType } from "../../../../src/lib/content-model";

interface SectionLink {
  key: SectionType;
  label: string;
}

const sectionLinks: SectionLink[] = [
  { key: "readme", label: "README" },
  { key: "api", label: "API" },
  { key: "config-examples", label: "Config" },
  { key: "changelog", label: "Changelog" }
];

const scripts = [...(scriptsIndex.scripts as ScriptIndexItem[])].sort(
  (left, right) => left.order - right.order || left.name.localeCompare(right.name)
);

function toRoute(path: string): string {
  return `/${path.replace(/\.md$/, "")}`;
}
</script>

<template>
  <MissingSectionNotice v-if="scripts.length === 0" section="scripts" />

  <ul v-else class="script-card-grid" role="list">
    <li v-for="script in scripts" :key="script.id" class="script-card">
      <article :aria-labelledby="`script-${script.id}`">
        <h2 :id="`script-${script.id}`">
          <a :href="toRoute(script.sections.readme)">{{ script.name }}</a>
        </h2>
        <p>{{ script.summary }}</p>

        <ul class="script-card-sections" role="list">
          <li v-for="section in sectionLinks" :key="section.key">
            <a :href="toRoute(script.sections[section.key])">{{ section.label }}</a>
          </li>
        </ul>
      </article>
    </li>
  </ul>
</template>
