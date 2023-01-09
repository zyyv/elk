<script setup lang="ts">
import type { AriaAnnounceType, AriaLive } from '~/composables/aria'
import { locale, locales } from '~/config/i18n'

const router = useRouter()
const { $t } = useFluent()
const { ariaAnnouncer, announce } = useAriaAnnouncer()

const localeMap = locales.reduce((acc, l) => {
  acc[l.code!] = l.name!
  return acc
}, {} as Record<string, string>)

let ariaLive = $ref<AriaLive>('polite')
let ariaMessage = $ref<string>('')

const onMessage = (event: AriaAnnounceType, message?: string) => {
  if (event === 'announce')
    ariaMessage = message!
  else if (event === 'mute')
    ariaLive = 'off'
  else
    ariaLive = 'polite'
}

watch(locale, (l, ol) => {
  if (ol) {
    announce($t('a11y_locale_changing', { lang: localeMap[ol] ?? ol }))
    setTimeout(() => {
      announce($t('a11y_locale_changed', { lang: localeMap[l] ?? l }))
    }, 1000)
  }
}, { immediate: true })

onMounted(() => {
  ariaAnnouncer.on(onMessage)
  router.beforeEach(() => {
    announce($t('a11y_loading_page'))
  })
  router.afterEach((to, from) => {
    from && setTimeout(() => {
      requestAnimationFrame(() => {
        const title = document.title.trim().split('|')
        announce($t('a11y_route_loaded', { title: title[0] }))
      })
    }, 512)
  })
})
</script>

<template>
  <p sr-only role="status" :aria-live="ariaLive">
    {{ ariaMessage }}
  </p>
</template>
