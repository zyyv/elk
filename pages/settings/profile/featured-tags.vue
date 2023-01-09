<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => `${$t('settings_profile_featured_tags_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <div i-ri:test-tube-line />
        <span>{{ $t('settings_profile_featured_tags_label') }}</span>
      </div>
    </template>
    <div text-center mt-10>
      <h1 text-4xl>
        🚧
      </h1>
      <h3 text-xl>
        {{ $t('settings_profile_featured_tags_label') }}
      </h3>
    </div>
  </MainContent>
</template>
