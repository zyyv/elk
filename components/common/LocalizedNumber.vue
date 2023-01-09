<script setup lang="ts">
const props = defineProps<{
  count: number
  keypath: string
}>()

defineOptions({
  inheritAttrs: false,
})

const { formatHumanReadableNumber, formatNumber, forSR } = useHumanReadableNumber()

const useSR = $computed(() => forSR(props.count))
const rawNumber = $computed(() => formatNumber(props.count))
const humanReadableNumber = $computed(() => formatHumanReadableNumber(props.count * 10000))
</script>

<template>
  <i18n :path="keypath" :args="{ count }" tag="span" class="flex">
    <template #formattedCount>
      <CommonTooltip v-if="useSR" :content="rawNumber" placement="bottom">
        <span aria-hidden="true" v-bind="$attrs">{{ humanReadableNumber }}</span>
        <span sr-only>{{ rawNumber }}</span>
      </CommonTooltip>
      <span v-else v-bind="$attrs">{{ humanReadableNumber }}</span>
    </template>
  </i18n>
</template>
