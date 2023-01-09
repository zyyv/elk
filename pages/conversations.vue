<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => $t('nav_conversations'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/conversations" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:at-line />
        <span>{{ $t('nav_conversations') }}</span>
      </NuxtLink>
    </template>

    <TimelineConversations v-if="isMastoInitialised" />
  </MainContent>
</template>
