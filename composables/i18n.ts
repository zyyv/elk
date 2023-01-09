import type { MaybeComputedRef, MaybeRef, UseTimeAgoOptions } from '@vueuse/core'
import { locale } from '~~/config/i18n'

const formatter = Intl.NumberFormat()

export function formattedNumber(num: number, useFormatter: Intl.NumberFormat = formatter) {
  return useFormatter.format(num)
}

const numberFormats = {
  percentage: {
    style: 'percent',
    maximumFractionDigits: 1,
  },
  smallCounting: {
    style: 'decimal',
    maximumFractionDigits: 0,
  },
  bigCounting: {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 0,
  },
} as const

function format(number: MaybeRef<number>, format: keyof typeof numberFormats) {
  return new Intl.NumberFormat(locale.value, numberFormats[format]).format(unref(number))
}

export function useHumanReadableNumber() {
  return {
    formatHumanReadableNumber: (num: MaybeRef<number>) => format(num, unref(num) < 10000 ? 'smallCounting' : 'bigCounting'),
    formatNumber: (num: MaybeRef<number>) => format(num, 'smallCounting'),
    formatPercentage: (num: MaybeRef<number>) => format(num, 'percentage'),
    forSR: (num: MaybeRef<number>) => unref(num) > 10000,
  }
}

export function useFormattedDateTime(value: MaybeComputedRef<string | number | Date | undefined | null>,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long', timeStyle: 'medium' }) {
  const formatter = $computed(() => Intl.DateTimeFormat(locale.value, options))
  return computed(() => {
    const v = resolveUnref(value)
    return v ? formatter.format(new Date(v)) : ''
  })
}

export function useTimeAgoOptions(short = false): UseTimeAgoOptions<false> {
  const { $t } = useFluent()
  const prefix = short ? 'short_' : ''

  const fn = (n: number, past: boolean, key: string) => {
    return $t(`time_ago_options_${prefix}${key}_${past ? 'past' : 'future'}`, { n })
  }

  return {
    rounding: 'floor',
    showSecond: !short,
    updateInterval: short ? 60000 : 1000,
    messages: {
      justNow: $t('time_ago_options_just_now'),
      // just return the value
      past: n => n,
      // just return the value
      future: n => n,
      second: (n, p) => fn(n, p, 'second'),
      minute: (n, p) => fn(n, p, 'minute'),
      hour: (n, p) => fn(n, p, 'hour'),
      day: (n, p) => fn(n, p, 'day'),
      week: (n, p) => fn(n, p, 'week'),
      month: (n, p) => fn(n, p, 'month'),
      year: (n, p) => fn(n, p, 'year'),
      invalid: '',
    },
    fullDateFormatter(date) {
      const options: Intl.DateTimeFormatOptions = short
        ? {
            dateStyle: 'short',
            timeStyle: 'short',
          }
        : {
            dateStyle: 'long',
            timeStyle: 'medium',
          }

      const intl = new Intl.DateTimeFormat(locale.value, options)

      return intl.format(date)
    },
  }
}
