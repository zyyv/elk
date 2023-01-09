<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => $t('nav_favourites'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/favourites" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:heart-3-line />
        <span>{{ $t('nav_favourites') }}</span>
      </NuxtLink>
    </template>

    <TimelineFavourites v-if="isMastoInitialised" />
  </MainContent>
</template>
