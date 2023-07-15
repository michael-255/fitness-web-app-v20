import type { AnyDBRecord } from '@/types/database'
import { defineStore } from 'pinia'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    record: {} as AnyDBRecord,
  }),
})

export default useActionStore
