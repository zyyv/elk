<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()
const pwaEnabled = useRuntimeConfig().public.pwaEnabled

useHeadFixed({
  title: () => `${$t('settings_notifications_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings_notifications_notifications_label') }}</span>
      </div>
    </template>

    <SettingsItem
      command
      :text="$t('settings_notifications_notifications_label')"
      to="/settings/notifications/notifications"
    />
    <SettingsItem
      command
      :disabled="!pwaEnabled"
      :text="$t('settings_notifications_push_notifications_label')"
      :description="$t('settings_notifications_push_notifications_description')"
      to="/settings/notifications/push-notifications"
    />
  </MainContent>
</template>
