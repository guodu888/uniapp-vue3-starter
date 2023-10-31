/*
 * @Author: shaohang-shy
 * @Date: 2023-05-09 14:04:11
 * @LastEditors: shaohang-shy
 * @LastEditTime: 2023-10-31 10:33:53
 * @Description:
 */

/**
 * Maybe it's a ref, or a plain value, or a getter function
 */
export type MaybeRefOrGetter<T> = T | Ref<T> | ComputedRef<T> | (() => T)

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

/**
 * Void function
 */
export type Fn = () => void

export interface Pausable {
  /**
   * A ref indicate whether a pausable instance is active
   */
  isActive: Readonly<Ref<boolean>>

  /**
   * Temporary pause the effect from executing
   */
  pause: Fn

  /**
   * Resume the effects
   */
  resume: Fn
}

/**
 * Get the value of value/ref/getter.
 */
export function toUnRefValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function'
    ? (r as AnyFn)()
    : unref(r)
}

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}

export const isClient = typeof window !== 'undefined'
