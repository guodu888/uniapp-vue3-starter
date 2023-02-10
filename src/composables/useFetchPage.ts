import type { FetchOptions } from '~/types/fetch'
import { Fetch } from '~/utils/fetch'

const CONFIG = {
  pageNo: 'page_no',
  pageSize: 'page_size',
  total: 'count',
  list: 'list',
}

interface FetchPageOptions {
  pageSize: number
}

export function useFetchPage<T = any>(url: string, options: Partial<Omit<FetchOptions, 'data'>> = {}, options2?: Partial<FetchPageOptions>) {
  const list = ref<T[]>([])
  const pageNo = ref(1)
  const pageSize = ref(options2?.pageSize ?? 10)
  const isLoadAll = ref(false)
  const isLoading = ref(true)
  let lastData: Record<string, string | number> | undefined

  function load(data?: Record<string, string | number>) {
    if (data)
      lastData = data
    if (isLoadAll.value)
      return
    isLoading.value = true
    if (!data)
      data = lastData
    return Fetch(url, { ...options, data: { ...data, [CONFIG.pageNo]: pageNo.value, [CONFIG.pageSize]: pageSize.value } }).then((resData) => {
      isLoading.value = false
      list.value.push(...resData[CONFIG.list])
      pageNo.value++
      // 判断有没有到结尾
      if (list.value.length >= resData[CONFIG.total])
        isLoadAll.value = true
      else isLoadAll.value = false
      return Promise.resolve()
    })
  }

  function next() {
    load()
  }
  function clear() {
    pageNo.value = 1
    list.value = []
    isLoadAll.value = false
  }

  return {
    list,
    isLoadAll,
    isLoading,
    next,
    clear,
    load,
  }
}
