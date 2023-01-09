<script setup lang="ts">
const buildInfo = useRuntimeConfig().public.buildInfo
const timeAgoOptions = useTimeAgoOptions()

const buildTimeDate = new Date(buildInfo.time)
const buildTimeAgo = useTimeAgo(buildTimeDate, timeAgoOptions)

const colorMode = useColorMode()
function toggleDark() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <footer p4 text-sm text-secondary-light flex="~ col">
    <div flex="~ gap2" items-center mb4>
      <CommonTooltip :content="$t('nav_toggle_theme')">
        <button flex i-ri:sun-line dark-i-ri:moon-line text-lg :aria-label="$t('nav_toggle_theme')" @click="toggleDark()" />
      </CommonTooltip>
      <CommonTooltip :content="$t('nav_zen_mode')">
        <button
          flex
          text-lg
          :class="userSettings.zenMode ? 'i-ri:layout-right-2-line' : 'i-ri:layout-right-line'"
          :aria-label="$t('nav_zen_mode')"
          @click="userSettings.zenMode = !userSettings.zenMode"
        />
      </CommonTooltip>
    </div>
    <div>
      <i18n v-if="isHydrated" path="nav_built_at" :args="{ date: buildTimeDate }">
        <template #date="{ formattedDate }">
          <time :datetime="String(buildTimeDate)" :title="formattedDate">{{ buildTimeAgo }}</time>
        </template>
      </i18n>
      &middot;
      <!-- TODO click version to show changelog -->
      <span v-if="buildInfo.env === 'release'">v{{ buildInfo.version }}</span>
      <span v-else>{{ buildInfo.env }}</span>
      <template v-if="buildInfo.commit && buildInfo.branch !== 'release'">
        &middot;
        <NuxtLink
          external
          :href="`https://github.com/elk-zone/elk/commit/${buildInfo.commit}`"
          target="_blank"
          font-mono
        >
          {{ buildInfo.commit.slice(0, 7) }}
        </NuxtLink>
      </template>
    </div>
    <div>
      <NuxtLink cursor-pointer hover:underline to="/settings/about">
        {{ $t('settings_about_label') }}
      </NuxtLink>
      &middot;
      <a href="/m.webtoo.ls/@elk" target="_blank">Mastodon</a>
      &middot;
      <a href="https://chat.elk.zone" target="_blank">Discord</a>
      &middot;
      <a href="https://github.com/elk-zone" target="_blank">GitHub</a>
    </div>
  </footer>
</template>
