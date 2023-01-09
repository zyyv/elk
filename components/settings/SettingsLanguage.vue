<script lang="ts" setup>
import { locale, locales } from '~/config/i18n'

const setLocale = (code: string) => {
  locale.value = code
}
</script>

<template>
  <select :value="locale" @input="e => setLocale((e.target as any).value)">
    <option v-for="item in locales" :key="item.code" :value="item.code" :selected="locale === item.code">
      {{ item.name }}
    </option>
  </select>
</template>
