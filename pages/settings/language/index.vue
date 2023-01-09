<script setup lang="ts">
const { $t } = useFluent()

useHeadFixed({
  title: () => `${$t('settings_language_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings_language_label') }}</span>
      </div>
    </template>
    <div p6>
      <label space-y-2>
        <p font-medium>{{ $t('settings_language_display_language') }}</p>
        <SettingsLanguage select-settings />
      </label>
    </div>
  </MainContent>
</template>
