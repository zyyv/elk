<script setup lang="ts">
import type { mastodon } from 'masto'

const { status } = defineProps<{
  status: mastodon.v1.Status
  inline: boolean
}>()

const editedAt = computed(() => status.editedAt)
const formatted = useFormattedDateTime(editedAt)
</script>

<template>
  <template v-if="editedAt">
    <CommonTooltip v-if="inline" :content="$t('status_edited', { date: formatted })">
      &#160;
      <time
        :title="editedAt"
        :datetime="editedAt"
        font-bold underline decoration-dashed
        text-secondary
      >&#160;*&#160;</time>
    </CommonTooltip>

    <CommonDropdown v-else>
      <slot />

      <template #popper>
        <div text-sm p2>
          <div text-center mb1>
            {{ $t('status_edited', { date: formatted }) }}
          </div>
          <StatusEditHistory :status="status" />
        </div>
      </template>
    </CommonDropdown>
  </template>
</template>
