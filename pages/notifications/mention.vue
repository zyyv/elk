<script setup lang="ts">
const { $t } = useFluent()
useHeadFixed({
  title: () => `${$t('tab_notifications_mention')} | ${$t('nav_notifications')}`,
})
</script>

<template>
  <TimelineMentions v-if="isMastoInitialised" />
</template>
