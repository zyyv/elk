<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => $t('account_pinned'),
})
</script>

<template>
  <MainContent>
    <template #title>
      <NuxtLink to="/public/pinned" timeline-title-style flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:pushpin-line />
        <span>{{ $t('account_pinned') }}</span>
      </NuxtLink>
    </template>

    <TimelinePinned v-if="isMastoInitialised && currentUser" />
  </MainContent>
</template>
