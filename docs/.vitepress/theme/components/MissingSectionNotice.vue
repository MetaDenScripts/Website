<script setup lang="ts">
defineProps<{
  section: string;
}>();
</script>

<template>
  <div class="vp-doc" role="status" aria-live="polite">
    <div class="custom-block warning">
      <p class="custom-block-title">Section temporarily unavailable</p>
      <p>
        The <strong>{{ section }}</strong> section has not been published yet. Please check back
        soon.
      </p>
    </div>
  </div>
</template>
