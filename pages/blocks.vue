<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => $t('nav_blocked_users'),
})
</script>

<template>
  <MainContent back>
    <template #title>
      <span timeline-title-style>{{ $t('nav_blocked_users') }}</span>
    </template>

    <TimelineBlocks v-if="isMastoInitialised" />
  </MainContent>
</template>
