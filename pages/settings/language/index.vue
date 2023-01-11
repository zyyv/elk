<script setup lang="ts">
const { t, localeProperties } = useI18n()

useHeadFixed({
  title: () => `${t('settings.language.label')} | ${t('nav.settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings.language.label') }}</span>
      </div>
    </template>
    <div p6>
      <label space-y-2>
        <p font-medium>{{ $t('settings.language.display_language') }}</p>
        <SettingsLanguage select-settings />
      </label>

      <SettingsToggleItem
        v-if="localeProperties.adoptInclusiveWriting"
        :checked="getWellnessSetting('useInclusiveWriting')"
        m-t
        @click="toggleWellnessSetting('useInclusiveWriting')"
      >
        {{ $t('settings.language.inclusive') }}
      </SettingsToggleItem>
    </div>
  </MainContent>
</template>
