import { readFile, writeFile } from 'node:fs/promises'
import { defineNuxtModule, useNuxt } from '@nuxt/kit'
import type { InclusiveLocaleKey } from '../config/i18n'
import { locales } from '../config/i18n'
import type { LocaleObject } from '#i18n'

type LocaleObjectWithRawFile = Omit<LocaleObject, 'file'> & {
  file: Buffer
  inclusiveTransform: InclusiveLocaleKey['inclusiveTransform']
}

function languageTransformation(locale: LocaleObjectWithRawFile) {
  return locale.inclusiveTransform!(locale.file.toString())
}

export default defineNuxtModule({
  meta: { name: 'legacy-language' },
  setup() {
    const nuxt = useNuxt()
    nuxt.hook('nitro:init', (nitro) => {
      const dir = `${nitro.options.output.dir}/public`
      nitro.hooks.hook('compiled', async () => {
        // spot language which needs dot-syntax free alternative
        const inclusiveSyntaxLanguages = locales.filter(locale => locale.adoptInclusiveWriting && !!locale.inclusiveTransform && locale.file && locale.code).map(async locale => ({
          ...locale,
          file: await readFile(`locales/${locale.file!}`),
        }))

        const localesFiles = await Promise.all(inclusiveSyntaxLanguages) as LocaleObjectWithRawFile[]
        const transformedFiles = localesFiles
          .map(locale => ({ ...locale, file: languageTransformation(locale) }))
          .map(async (locale) => {
            // @ts-expect-error locales with raw file need right types
            await writeFile(`${dir}/${locale.code}-ninc.json`, locale.file)
          })

        Promise.all(transformedFiles)
      })
    })
  },
})
