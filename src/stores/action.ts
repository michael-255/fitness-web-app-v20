import type { AnyDBRecord, DBTable } from '@/types/database'
import { defineStore } from 'pinia'

const useActionStore = defineStore({
  id: 'action',

  state: () => ({
    table: '' as DBTable,
    record: {} as AnyDBRecord,
  }),
})

export default useActionStore
