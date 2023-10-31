/*
 * @Author: shaohang-shy
 * @Date: 2023-06-08 15:21:33
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-10-31 10:34:06
 * @Description: useInterfal
 */
// Copy from useuse

import type { Fn, MaybeRefOrGetter, Pausable } from '.'
import { isClient, tryOnScopeDispose } from '.'

export interface UseIntervalFnOptions {
  /**
   * Start the timer immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Execute the callback immediate after calling this function
   *
   * @default false
   */
  immediateCallback?: boolean
}

/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useIntervalFn(cb: Fn, interval: MaybeRefOrGetter<number> = 1000, options: UseIntervalFnOptions = {}): Pausable {
  const {
    immediate = true,
    immediateCallback = false,
  } = options

  let timer: ReturnType<typeof setInterval> | null = null
  const isActive = ref(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.value = false
    clean()
  }

  function resume() {
    const intervalValue = toUnRefValue(interval)
    if (intervalValue <= 0)
      return
    isActive.value = true
    if (immediateCallback)
      cb()
    clean()
    timer = setInterval(cb, intervalValue)
  }

  if (immediate && isClient)
    resume()

  if (isRef(interval) || typeof interval === 'function') {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume()
    })
    tryOnScopeDispose(stopWatch)
  }

  tryOnScopeDispose(pause)

  return {
    isActive,
    pause,
    resume,
  }
}
