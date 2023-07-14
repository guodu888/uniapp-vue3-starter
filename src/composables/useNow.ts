/*
 * @Author: shaohang-shy
 * @Date: 2023-06-08 15:24:41
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-06-08 15:35:09
 * @Description: useNow
 */
// Copy from https://vueuse.org/useNow

import { useIntervalFn } from './useInterval'
import type { Pausable } from '.'

export interface UseNowOptions<Controls extends boolean> {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls

  /**
   * Update interval, or use requestAnimationFrame
   *
   * @default requestAnimationFrame
   */
  interval?: number
}

/**
 * Reactive current Date instance.
 *
 * @see https://vueuse.org/useNow
 * @param options
 */
export function useNow(options?: UseNowOptions<false>): Ref<Date>
export function useNow(options: UseNowOptions<true>): { now: Ref<Date> } & Pausable
export function useNow(options: UseNowOptions<boolean> = {}) {
  const {
    controls: exposeControls = false,
    interval = 1_000,
  } = options

  const now = ref(new Date())

  const update = () => now.value = new Date()

  const controls: Pausable = useIntervalFn(update, interval, { immediate: true })

  if (exposeControls) {
    return {
      now,
      ...controls,
    }
  }
  else {
    return now
  }
}

export type UseNowReturn = ReturnType<typeof useNow>
