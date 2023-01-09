<script setup lang="ts">
definePageMeta({
  middleware: ['auth', () => {
    if (!useRuntimeConfig().public.pwaEnabled)
      return navigateTo('/settings/notifications')
  }],
})

const { $t } = useFluent()

useHeadFixed({
  title: () => `${$t('settings_notifications_push_notifications_label')} | ${$t('settings_notifications_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings_notifications_push_notifications_label') }}</span>
      </div>
    </template>
    <NotificationPreferences show />
  </MainContent>
</template>
