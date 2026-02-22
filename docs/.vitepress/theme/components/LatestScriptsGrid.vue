<script setup lang="ts">
import scriptsIndex from "../../../scripts/_meta/scripts-index.json";
import { getLatestScripts } from "../../../../src/lib/latest-scripts";
import type { ScriptIndexItem } from "../../../../src/lib/content-model";

const cards = getLatestScripts(scriptsIndex.scripts as ScriptIndexItem[], 16);
</script>

<template>
  <section aria-labelledby="latest-scripts-heading" class="latest-scripts-section">
    <h2 id="latest-scripts-heading">Latest Scripts</h2>

    <MissingSectionNotice v-if="cards.length === 0" section="latest scripts" />

    <ul v-else class="script-card-grid latest-scripts-grid" role="list">
      <li v-for="card in cards" :key="card.id" class="script-card latest-script-card">
        <article :aria-labelledby="`latest-script-${card.id}`">
          <img
            v-if="card.imageUrl"
            :src="card.imageUrl"
            :alt="`${card.name} preview image`"
            class="latest-script-card-image"
            style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px 8px 0 0; margin-bottom: 0.5rem;"
          />
          <h2 :id="`latest-script-${card.id}`" class="title">{{ card.name }}</h2>
          <p class="details">{{ card.summary }}</p>
          <div class="latest-script-card-actions">
            <a
              :href="card.storeUrl"
              target="_blank"
              rel="noreferrer noopener"
              :aria-label="`Open ${card.name} store page in a new tab`"
            >
              Buy
            </a>
            <a :href="card.docsUrl" :aria-label="`Open ${card.name} documentation`">
              Documentation
            </a>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>
