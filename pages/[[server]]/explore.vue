<script setup lang="ts">
const { $t } = useFluent()

const tabs = $computed(() => [
  {
    to: `/${currentServer.value}/explore`,
    display: $t('tab_posts'),
  },
  {
    to: `/${currentServer.value}/explore/tags`,
    display: $t('tab_hashtags'),
  },
  {
    to: `/${currentServer.value}/explore/links`,
    display: $t('tab_news'),
  },
  // This section can only be accessed after logging in
  {
    to: `/${currentServer.value}/explore/users`,
    display: $t('tab_for_you'),
    disabled: !isMastoInitialised.value || !currentUser.value,
  },
] as const)
</script>

<template>
  <MainContent>
    <template #title>
      <span timeline-title-style flex items-center gap-2 cursor-pointer @click="$scrollToTop">
        <div i-ri:hashtag />
        <span>{{ $t('nav_explore') }}</span>
      </span>
    </template>

    <template #header>
      <CommonRouteTabs replace :options="tabs" />
    </template>
    <NuxtPage v-if="isMastoInitialised" />
  </MainContent>
</template>
