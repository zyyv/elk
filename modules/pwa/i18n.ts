import { FluentBundle, FluentResource } from '@fluent/bundle'
import type { FluentValue } from '@fluent/bundle'
import { readFile } from 'fs-extra'
import { resolve } from 'pathe'
import type { ManifestOptions } from 'vite-plugin-pwa'
import { getEnv } from '../../config/env'
import { defaultLocale, locales } from '../../config/i18n'

export type LocalizedWebManifest = Record<string, Partial<ManifestOptions>>

type WebManifestEntry = Pick<ManifestOptions, 'name' | 'short_name' | 'description'>
type RequiredWebManifestEntry = Required<WebManifestEntry & Pick<ManifestOptions, 'dir' | 'lang'>>

async function readBundle(locale: string): Promise<FluentBundle> {
  const messages = Buffer.from(
    await readFile(resolve(`./locales/${locale}.ftl`), 'utf-8'),
  ).toString()

  const bundle = new FluentBundle(locale)
  bundle.addResource(new FluentResource(messages))
  return bundle
}

function format(bundle: FluentBundle, key: string, values: Record<string, FluentValue>): string | undefined {
  const message = bundle.getMessage(key)
  if (!message || !message.value)
    return undefined

  return bundle.formatPattern(message.value, values)
}

export const pwaLocales = locales

export const createI18n = async (): Promise<LocalizedWebManifest> => {
  const { env } = await getEnv()
  const envName = `${env === 'release' ? '' : `(${env})`}`
  const defaultBundle = await readBundle(defaultLocale)

  const defaultManifest: Required<WebManifestEntry> = {
    name: format(defaultBundle, 'pwa_webmanifest_name', { env: envName })!,
    short_name: format(defaultBundle, 'pwa_webmanifest_short_name', { env: envName })!,
    description: format(defaultBundle, 'pwa_webmanifest_name_description', { env: envName })!,
  }

  const locales: RequiredWebManifestEntry[] = await Promise.all(
    pwaLocales
      .filter(l => l.code !== 'en-US')
      .map(async ({ code, dir = 'ltr' }) => {
        // read locale file
        const bundle = await readBundle(code)

        const app_name = format(bundle, 'app_name', { env: envName })
        const app_desc_short = format(bundle, 'app_desc_short', { env: envName })

        const entry: Partial<WebManifestEntry> = {
          name: format(bundle, 'pwa_webmanifest_name', { env: envName }),
          short_name: format(bundle, 'pwa_webmanifest_short_name', { env: envName }),
          description: format(bundle, 'pwa_webmanifest_name_description', { env: envName }),
        }

        if (!entry.name && app_name)
          entry.name = dir === 'rtl' ? `${envName} ${app_name}` : `${app_name} ${envName}`

        if (!entry.short_name && app_name)
          entry.short_name = dir === 'rtl' ? `${envName} ${app_name}` : `${app_name} ${envName}`

        if (!entry.description && app_desc_short)
          entry.description = app_desc_short

        return <RequiredWebManifestEntry>{
          ...defaultManifest,
          ...entry,
          lang: code,
          dir,
        }
      }),
  )
  locales.push({
    ...defaultManifest,
    lang: 'en-US',
    dir: 'ltr',
  })
  return locales.reduce((acc, { lang, dir, name, short_name, description }) => {
    acc[lang] = {
      scope: '/',
      id: '/',
      start_url: '/',
      display: 'standalone',
      lang,
      name,
      short_name,
      description,
      dir,
      background_color: '#ffffff',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }

    return acc
  }, {} as LocalizedWebManifest)
}
