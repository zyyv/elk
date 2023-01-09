import { locale, locales } from '~/config/i18n'

export function setupPageHeader() {
  const { $t } = useFluent()
  const buildInfo = useBuildInfo()

  const localeMap = locales.reduce((acc, l) => {
    acc[l.code!] = l.dir ?? 'auto'
    return acc
  }, {} as Record<string, 'rtl' | 'ltr' | 'auto'>)

  useHeadFixed({
    htmlAttrs: {
      lang: () => locale.value,
      dir: () => localeMap[locale.value] ?? 'auto',
    },
    titleTemplate: (title) => {
      let titleTemplate = title ? `${title} | ` : ''
      titleTemplate += $t('app_name')
      if (buildInfo.env !== 'release')
        titleTemplate += ` (${buildInfo.env})`
      return titleTemplate
    },
    link: process.client && useRuntimeConfig().public.pwaEnabled
      ? () => [{
          key: 'webmanifest',
          rel: 'manifest',
          href: `/manifest-${locale.value}.webmanifest`,
        }]
      : [],
  })
}
