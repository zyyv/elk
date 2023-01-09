<script setup lang="ts">
definePageMeta({ name: 'account-replies' })

const { $t } = useFluent()
const params = useRoute().params
const handle = $(computedEager(() => params.account as string))

const account = await fetchAccountByHandle(handle)

const paginator = useMasto().v1.accounts.listStatuses(account.id, { excludeReplies: false })

if (account) {
  useHeadFixed({
    title: () => `${$t('tab_posts_with_replies')} | ${getDisplayName(account)} (@${account.acct})`,
  })
}
</script>

<template>
  <div>
    <AccountTabs />
    <TimelinePaginator :paginator="paginator" :preprocess="reorderedTimeline" context="account" :account="account" />
  </div>
</template>
