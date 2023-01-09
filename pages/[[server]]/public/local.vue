<script setup lang="ts">
const { $t } = useFluent()

useHeadFixed({
  title: () => $t('title_local_timeline'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/public/local" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:group-2-line />
        <span>{{ $t('title_local_timeline') }}</span>
      </NuxtLink>
    </template>

    <TimelinePublicLocal v-if="isMastoInitialised" />
  </MainContent>
</template>
