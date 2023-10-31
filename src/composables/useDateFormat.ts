/*
 * @Author: shaohang-shy
 * @Date: 2023-06-08 14:05:32
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-06-08 14:19:41
 * @Description: DateFormat
 */

// Copy from https://vueuse.org/shared/useDateFormat/

// | Format | Output           | Description                           |
// |--------| ---------------- |---------------------------------------|
// | `YY`   | 18               | Two-digit year                        |
// | `YYYY` | 2018             | Four-digit year                       |
// | `M`    | 1-12             | The month, beginning at 1             |
// | `MM`   | 01-12            | The month, 2-digits                   |
// | `MMM`  | Jan-Dec          | The abbreviated month name            |
// | `MMMM` | January-December | The full month name                   |
// | `D`    | 1-31             | The day of the month                  |
// | `DD`   | 01-31            | The day of the month, 2-digits        |
// | `H`    | 0-23             | The hour                              |
// | `HH`   | 00-23            | The hour, 2-digits                    |
// | `h`    | 1-12             | The hour, 12-hour clock               |
// | `hh`   | 01-12            | The hour, 12-hour clock, 2-digits     |
// | `m`    | 0-59             | The minute                            |
// | `mm`   | 00-59            | The minute, 2-digits                  |
// | `s`    | 0-59             | The second                            |
// | `ss`   | 00-59            | The second, 2-digits                  |
// | `SSS`  | 000-999          | The millisecond, 3-digits             |
// | `A`    | AM PM            | The meridiem                          |
// | `AA`   | A.M. P.M.        | The meridiem, periods                 |
// | `a`    | am pm            | The meridiem, lowercase               |
// | `aa`   | a.m. p.m.        | The meridiem, lowercase and periods   |
// | `d`    | 0-6              | The day of the week, with Sunday as 0 |
// | `dd`   | S-S              | The min name of the day of the week   |
// | `ddd`  | Sun-Sat          | The short name of the day of the week |
// | `dddd` | Sunday-Saturday  | The name of the day of the week       |

import type { MaybeRefOrGetter } from '.'
import { toUnRefValue } from '.'

export type DateLike = Date | number | string | undefined

export interface UseDateFormatOptions {
  /**
   * The locale(s) to used for dd/ddd/dddd/MMM/MMMM format
   *
   * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
   */
  locales?: Intl.LocalesArgument

  /**
   * A custom function to re-modify the way to display meridiem
   *
   */
  customMeridiem?: (hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) => string
}

const REGEX_PARSE = /* #__PURE__ */ /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
const REGEX_FORMAT = /* #__PURE__ */ /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a{1,2}|A{1,2}|m{1,2}|s{1,2}|Z{1,2}|SSS/g

function defaultMeridiem(hours: number, minutes: number, isLowercase?: boolean, hasPeriod?: boolean) {
  let m = (hours < 12 ? 'AM' : 'PM')
  if (hasPeriod)
    m = m.split('').reduce((acc, curr) => acc += `${curr}.`, '')
  return isLowercase ? m.toLowerCase() : m
}

export function formatDate(date: Date, formatStr: string, options: UseDateFormatOptions = {}) {
  const years = date.getFullYear()
  const month = date.getMonth()
  const days = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  const day = date.getDay()
  const meridiem = options.customMeridiem ?? defaultMeridiem
  const matches: Record<string, () => string | number> = {
    YY: () => String(years).slice(-2),
    YYYY: () => years,
    M: () => month + 1,
    MM: () => `${month + 1}`.padStart(2, '0'),
    MMM: () => date.toLocaleDateString(options.locales, { month: 'short' }),
    MMMM: () => date.toLocaleDateString(options.locales, { month: 'long' }),
    D: () => String(days),
    DD: () => `${days}`.padStart(2, '0'),
    H: () => String(hours),
    HH: () => `${hours}`.padStart(2, '0'),
    h: () => `${hours % 12 || 12}`.padStart(1, '0'),
    hh: () => `${hours % 12 || 12}`.padStart(2, '0'),
    m: () => String(minutes),
    mm: () => `${minutes}`.padStart(2, '0'),
    s: () => String(seconds),
    ss: () => `${seconds}`.padStart(2, '0'),
    SSS: () => `${milliseconds}`.padStart(3, '0'),
    d: () => day,
    dd: () => date.toLocaleDateString(options.locales, { weekday: 'narrow' }),
    ddd: () => date.toLocaleDateString(options.locales, { weekday: 'short' }),
    dddd: () => date.toLocaleDateString(options.locales, { weekday: 'long' }),
    A: () => meridiem(hours, minutes),
    AA: () => meridiem(hours, minutes, false, true),
    a: () => meridiem(hours, minutes, true),
    aa: () => meridiem(hours, minutes, true, true),
  }
  return formatStr.replace(REGEX_FORMAT, (match, $1) => $1 || matches[match]?.() || match)
}

export function normalizeDate(date: DateLike) {
  if (date === null)
    return new Date(Number.NaN) // null is invalid
  if (date === undefined)
    return new Date()
  if (date instanceof Date)
    return new Date(date)
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE) as any
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      return new Date(d[1], m, d[3]
        || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }

  return new Date(date)
}

/**
 * Get the formatted date according to the string of tokens passed in.
 *
 * @see https://vueuse.org/useDateFormat
 * @param date - The date to format, can either be a `Date` object, a timestamp, or a string
 * @param formatStr - The combination of tokens to format the date
 * @param options - UseDateFormatOptions
 */
export function useDateFormat(date: MaybeRefOrGetter<DateLike>, formatStr: MaybeRefOrGetter<string> = 'YYYY-MM-DD HH:mm:ss', options: UseDateFormatOptions = {}) {
  return computed(() => formatDate(normalizeDate(toUnRefValue(date)), toUnRefValue(formatStr), options))
}

export type UseDateFormatReturn = ReturnType<typeof useDateFormat>
