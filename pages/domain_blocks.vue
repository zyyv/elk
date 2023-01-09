<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => $t('nav_blocked_domains'),
})
</script>

<template>
  <MainContent back>
    <template #title>
      <span timeline-title-style>{{ $t('nav_blocked_domains') }}</span>
    </template>

    <TimelineDomainBlocks v-if="isMastoInitialised" />
  </MainContent>
</template>
