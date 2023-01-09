<script lang="ts" setup>
import { STORAGE_KEY_HIDE_EXPLORE_POSTS_TIPS } from '~~/constants'

const { $t } = useFluent()

const paginator = useMasto().v1.trends.listStatuses()

const hideNewsTips = useLocalStorage(STORAGE_KEY_HIDE_EXPLORE_POSTS_TIPS, false)

useHeadFixed({
  title: () => `${$t('tab_posts')} | ${$t('nav_explore')}`,
})
</script>

<template>
  <CommonAlert v-if="isHydrated && !hideNewsTips" @close="hideNewsTips = true">
    <p>{{ $t('tooltip_explore_posts_intro') }}</p>
  </CommonAlert>
  <!-- TODO: Tabs for trending statuses, tags, and links -->
  <TimelinePaginator :paginator="paginator" context="public" />
</template>
