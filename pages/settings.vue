<script lang="ts" setup>
definePageMeta({
  wideLayout: true,
})

const { $t } = useFluent()

useHeadFixed({
  title: () => $t('nav_settings'),
})

const route = useRoute()

const isRootPath = computedEager(() => route.name === 'settings')
</script>

<template>
  <div>
    <div min-h-screen flex>
      <div border="e base" :class="isRootPath ? 'block lg:flex-none flex-1' : 'hidden lg:block'">
        <MainContent>
          <template #title>
            <div timeline-title-style flex items-center gap-2 @click="$scrollToTop">
              <div i-ri:settings-3-line />
              <span>{{ $t('nav_settings') }}</span>
            </div>
          </template>
          <div xl:w-97 lg:w-78 w-full>
            <SettingsItem
              v-if="isHydrated && currentUser "
              command
              icon="i-ri:user-line"
              :text="$t('settings_profile_label')"
              to="/settings/profile"
            />
            <SettingsItem
              command
              icon="i-ri-compasses-2-line"
              :text="$t('settings_interface_label')"
              to="/settings/interface"
            />
            <SettingsItem
              v-if="isHydrated && currentUser"
              command
              icon="i-ri:notification-badge-line"
              :text="$t('settings_notifications_settings')"
              to="/settings/notifications"
            />
            <SettingsItem
              command
              icon="i-ri-globe-line"
              :text="$t('settings_language_label')"
              to="/settings/language"
            />
            <SettingsItem
              command
              icon="i-ri-equalizer-line"
              :text="$t('settings_preferences_label')"
              to="/settings/preferences"
            />
            <SettingsItem
              command
              icon="i-ri-group-line"
              :text="$t('settings_users_label')"
              to="/settings/users"
            />
            <SettingsItem
              command
              icon="i-ri:information-line"
              :text="$t('settings_about_label')"
              to="/settings/about"
            />
          </div>
        </MainContent>
      </div>
      <div flex-1 :class="isRootPath ? 'hidden lg:block' : 'block'">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
