<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  alias: ['/signin/callback'],
})

const { $t } = useFluent()
useHeadFixed({
  title: () => $t('nav_home'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/home" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:home-5-line />
        <span>{{ $t('nav_home') }}</span>
      </NuxtLink>
    </template>

    <TimelineHome v-if="isMastoInitialised" />
  </MainContent>
</template>
