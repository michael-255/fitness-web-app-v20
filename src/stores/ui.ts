import { defineStore } from 'pinia'
import { Duration } from '@/types/general'
import { DBTable } from '@/types/database'

const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
    dashboardSelection: Object.values(DBTable)[0], // First table in the list
    chartTime: Duration[Duration['Three Months']] as keyof typeof Duration,
  }),
})

export default useUIStore
