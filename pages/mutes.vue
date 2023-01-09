<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => $t('nav_muted_users'),
})
</script>

<template>
  <MainContent back>
    <template #title>
      <span timeline-title-style>{{ $t('nav_muted_users') }}</span>
    </template>

    <TimelineMutes v-if="isMastoInitialised" />
  </MainContent>
</template>
