<script setup lang="ts">
import DefaultTheme from "vitepress/theme";

const { Layout } = DefaultTheme;
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <Layout>
    <template #doc-before>
      <span id="main-content" tabindex="-1" aria-hidden="true"></span>
    </template>
  </Layout>
</template>
