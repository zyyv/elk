import { createFluentVue } from 'fluent-vue'
import { FluentBundle, FluentResource } from '@fluent/bundle'

import { defaultLocale, locale, locales } from '~/config/i18n'
import { COOKIE_KEY_LOCALE, COOKIE_MAX_AGE } from '~/constants'

import defaultMessages from '~/locales/en-US.ftl?raw'

export function getDefaultBundle(): FluentBundle {
  // TODO: Customize functions
  const bundle = new FluentBundle(defaultLocale)
  bundle.addResource(new FluentResource(defaultMessages))

  return bundle
}

export async function getBundle(locale: string): Promise<FluentBundle> {
  const { default: messages } = await import(`./locales/${locale}.ftl`)

  // TODO: Customize functions
  const bundle = new FluentBundle(locale)
  bundle.addResource(new FluentResource(messages))

  return bundle
}

const fluent = createFluentVue({
  bundles: [
    getDefaultBundle(),
  ],
})

async function setLocale(newLocale: string) {
  locale.value = newLocale

  const bundle = await getBundle(newLocale)

  // Locale changed while loading the new bundle
  if (locale.value !== newLocale)
    return

  fluent.bundles = [bundle]
}

export default defineNuxtPlugin(async (nuxt) => {
  nuxt.vueApp.use(fluent)

  const cookieLocale = useCookie(COOKIE_KEY_LOCALE, { maxAge: COOKIE_MAX_AGE })
  const isFirstVisit = cookieLocale.value == null

  if (process.client && isFirstVisit) {
    const userLang = (navigator.language || 'en-US').toLowerCase()
    const lang = locales.find(locale => userLang.startsWith(locale.code.toLowerCase()))?.code
      || locales.find(locale => userLang.startsWith(locale.code.split('-')[0]))?.code
    cookieLocale.value = lang || 'en-US'
  }

  if (cookieLocale.value && cookieLocale.value !== locale.value) {
    const fixSSRsetLocale = setLocale

    await fixSSRsetLocale(cookieLocale.value)
  }

  if (process.client) {
    watch(locale, async () => {
      cookieLocale.value = locale.value

      await setLocale(locale.value)
    })
  }
})
