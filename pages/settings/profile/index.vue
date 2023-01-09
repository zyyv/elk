<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { $t } = useFluent()

useHeadFixed({
  title: () => `${$t('settings_profile_label')} | ${$t('nav_settings')}`,
})
</script>

<template>
  <MainContent back-on-small-screen>
    <template #title>
      <div text-lg font-bold flex items-center gap-2 @click="$scrollToTop">
        <span>{{ $t('settings_profile_label') }}</span>
      </div>
    </template>

    <SettingsItem
      command large
      icon="i-ri:user-settings-line"
      :text="$t('settings_profile_appearance_label')"
      :description="$t('settings_profile_appearance_description')"
      to="/settings/profile/appearance"
    />
    <SettingsItem
      command large
      icon="i-ri:hashtag"
      :text="$t('settings_profile_featured_tags_label')"
      :description="$t('settings_profile_featured_tags_description')"
      to="/settings/profile/featured-tags"
    />
    <SettingsItem
      v-if="isHydrated && currentUser"
      command large
      icon="i-ri:settings-line"
      :text="$t('settings_account_settings_label')"
      :description="$t('settings_account_settings_description')"
      :to="`https://${currentUser!.server}/auth/edit`"
      external target="_blank"
    />
  </MainContent>
</template>
