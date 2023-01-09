<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => `${$t('settings_notifications_notifications_label')} | ${$t('settings_notifications_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings_notifications_notifications_label') }}</span>
      </div>
    </template>
    <h3 px6 py4 mt2 font-bold text-xl flex="~ gap-1" items-center>
      {{ $t('settings_notifications_notifications_label') }}
    </h3>
    <p text-4xl text-center>
      <span sr-only>Under construction</span> 🚧
    </p>
  </MainContent>
</template>
