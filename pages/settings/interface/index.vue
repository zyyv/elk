<script setup lang="ts">
const { $t } = useFluent()

useHeadFixed({
  title: () => `${$t('settings_interface_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings_interface_label') }}</span>
      </div>
    </template>
    <div p6 flex="~ col gap6">
      <label space-y-2>
        <p font-medium>{{ $t('settings_interface_font_size') }}</p>
        <SettingsFontSize select-settings />
      </label>
      <div space-y-2>
        <p font-medium>
          {{ $t('settings_interface_color_mode') }}
        </p>
        <SettingsColorMode />
      </div>
    </div>
  </MainContent>
</template>
