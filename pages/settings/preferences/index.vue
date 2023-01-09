<script setup lang="ts">
const { $t } = useFluent()

useHeadFixed({
  title: () => `${$t('settings_preferences_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings_preferences_label') }}</span>
      </div>
    </template>
    <h3 px6 py4 mt2 font-bold text-xl flex="~ gap-1" items-center>
      <div i-ri-flask-line />
      {{ $t('settings_feature_flags_title') }}
    </h3>
    <SettingsToggleItem
      :checked="getFeatureFlag('experimentalVirtualScroller')"
      @click="toggleFeatureFlag('experimentalVirtualScroller')"
    >
      {{ $t('settings_feature_flags_virtual_scroll') }}
    </SettingsToggleItem>
    <SettingsToggleItem
      :checked="getFeatureFlag('experimentalGitHubCards')"
      @click="toggleFeatureFlag('experimentalGitHubCards')"
    >
      {{ $t('settings_feature_flags_github_cards') }}
    </SettingsToggleItem>
    <SettingsToggleItem
      :checked="getFeatureFlag('experimentalUserPicker')"
      @click="toggleFeatureFlag('experimentalUserPicker')"
    >
      {{ $t('settings_feature_flags_user_picker') }}
    </SettingsToggleItem>
  </MainContent>
</template>
