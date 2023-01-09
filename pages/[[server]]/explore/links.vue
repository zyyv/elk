<script lang="ts" setup>
import { STORAGE_KEY_HIDE_EXPLORE_NEWS_TIPS } from '~~/constants'

const { $t } = useFluent()

const paginator = useMasto().v1.trends.listLinks()

const hideNewsTips = useLocalStorage(STORAGE_KEY_HIDE_EXPLORE_NEWS_TIPS, false)

useHeadFixed({
  title: () => `${$t('tab_news')} | ${$t('nav_explore')}`,
})
</script>

<template>
  <CommonAlert v-if="isHydrated && !hideNewsTips" @close="hideNewsTips = true">
    <p>{{ $t('tooltip_explore_links_intro') }}</p>
  </CommonAlert>

  <CommonPaginator v-bind="{ paginator }">
    <template #default="{ item }">
      <StatusPreviewCard :card="item" border="!b base" rounded="!none" p="!4" small-picture-only root />
    </template>
    <template #loading>
      <StatusPreviewCardSkeleton square root border="b base" />
      <StatusPreviewCardSkeleton square root border="b base" op50 />
      <StatusPreviewCardSkeleton square root border="b base" op25 />
    </template>
  </CommonPaginator>
</template>
