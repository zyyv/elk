<script setup lang="ts">
import { useFluent } from 'fluent-vue'

const { $t } = useFluent()
useHeadFixed({
  title: () => $t('nav_search'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/search" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:search-line class="rtl-flip" />
        <span>{{ $t('nav_search') }}</span>
      </NuxtLink>
    </template>

    <SearchWidget v-if="isMastoInitialised" mt3 />
  </MainContent>
</template>
