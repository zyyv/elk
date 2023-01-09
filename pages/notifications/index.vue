<script setup lang="ts">
const { $t } = useFluent()
useHeadFixed({
  title: () => `${$t('tab_notifications_all')} | ${$t('nav_notifications')}`,
})
</script>

<template>
  <TimelineNotifications v-if="isMastoInitialised" />
</template>
