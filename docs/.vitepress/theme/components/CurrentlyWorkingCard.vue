<script setup lang="ts">
import teaserData from "../../../scripts/_meta/currently-working.json";

type WorkingTeaser = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

const teaser = teaserData?.teaser as WorkingTeaser | undefined;
const hasTeaser = Boolean(teaser?.title && teaser?.description);
</script>

<template>
  <section
    aria-labelledby="currently-working-heading"
    class="currently-working-section"
  >
    <h2 id="currently-working-heading">Currently working on</h2>

    <MissingSectionNotice
      v-if="!hasTeaser"
      section="currently working on"
    />

    <article v-else class="currently-working-card script-card">
      <div
        v-if="teaser?.imageUrl"
        class="currently-working-image"
      >
        <img
          :src="teaser.imageUrl"
          :alt="teaser.imageAlt || 'Teaser preview image'"
          loading="lazy"
        />
      </div>
      <div v-else class="currently-working-image placeholder" aria-hidden="true">
        <span>Teaser artwork coming soon</span>
      </div>

      <div class="currently-working-content">
        <h3 class="currently-working-title">{{ teaser?.title }}</h3>
        <p class="currently-working-description">{{ teaser?.description }}</p>
      </div>
    </article>
  </section>
</template>
