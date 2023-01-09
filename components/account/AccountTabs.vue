<script setup lang="ts">
const { $t } = useFluent()
const route = useRoute()

const server = $(computedEager(() => route.params.server as string))
const account = $(computedEager(() => route.params.account as string))

const tabs = $computed(() => [
  {
    name: 'account-index',
    to: {
      name: 'account-index',
      params: { server, account },
    },
    display: $t('tab_posts'),
    icon: 'i-ri:file-list-2-line',
  },
  {
    name: 'account-replies',
    to: {
      name: 'account-replies',
      params: { server, account },
    },
    display: $t('tab_posts_with_replies'),
    icon: 'i-ri:chat-1-line',
  },
  {
    name: 'account-media',
    to: {
      name: 'account-media',
      params: { server, account },
    },
    display: $t('tab_media'),
    icon: 'i-ri:camera-2-line',
  },
] as const)
</script>

<template>
  <CommonRouteTabs force replace :options="tabs" prevent-scroll-top command border="base b" />
</template>
