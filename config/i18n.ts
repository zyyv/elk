import { ref } from 'vue'

interface LocaleObjectData {
  code: string
  name: string
  dir?: 'ltr' | 'rtl'
}

export const defaultLocale = 'en-US'

export const locale = ref(defaultLocale)

export const locales: LocaleObjectData[] = [
  {
    code: 'en-US',
    name: 'English (US)',
  },
  {
    code: 'en-GB',
    name: 'English (UK)',
  },
  {
    code: 'de-DE',
    name: 'Deutsch',
  },
  {
    code: 'zh-CN',
    name: '简体中文',
  },
  {
    code: 'zh-TW',
    name: '繁体中文',
  },
  {
    code: 'ja-JP',
    name: '日本語',
  },
  {
    code: 'nl-NL',
    name: 'Nederlands',
  },
  {
    code: 'es-ES',
    name: 'Español',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
  {
    code: 'uk-UA',
    name: 'Українська',
  },
  {
    code: 'cs-CZ',
    name: 'Česky',
  },
  {
    code: 'ar-EG',
    name: 'العربية',
    dir: 'rtl' as const,
  },
].sort((a, b) => a.code.localeCompare(b.code))
