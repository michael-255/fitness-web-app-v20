import { useRoute, useRouter, type Router, type RouteLocationNormalizedLoaded } from 'vue-router'
import { RouteName } from '@/types/general'
import useLogger from '@/composables/useLogger'
import { DBTable, tableSchema } from '@/types/database'
import { idSchema } from '@/models/_Entity'

export default function useRouting(): {
  route: RouteLocationNormalizedLoaded
  router: Router
  routeId?: string
  routeParentId?: string
  routeTable?: DBTable
  goToDashboard: () => void
  goToActive: () => void
  goToLogsData: () => void
  goToRecordsData: (table: DBTable) => void
  goToCreate: (table: DBTable, parentId?: string) => void
  goToEdit: (table: DBTable, id: string) => void
  goBack: () => void
} {
  const route = useRoute()
  const router = useRouter()
  const { log } = useLogger()

  // Possible route params
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const parentId = Array.isArray(route.params.parentId)
    ? route.params.parentId[0]
    : route.params.parentId
  const table = Array.isArray(route.params.table) ? route.params.table[0] : route.params.table

  // Cleaned route params
  const routeId = idSchema.safeParse(id).success ? id : undefined
  const routeParentId = idSchema.safeParse(parentId).success ? parentId : undefined
  const routeTable = tableSchema.safeParse(table).success ? (table as DBTable) : undefined

  function goToDashboard() {
    try {
      router.push({
        name: RouteName.DASHBOARD,
      })
    } catch (error) {
      log.error('Error accessing dashboard route', error)
    }
  }

  function goToActive() {
    try {
      router.push({
        name: RouteName.ACTIVE,
      })
    } catch (error) {
      log.error('Error accessing active route', error)
    }
  }

  function goToLogsData() {
    try {
      router.push({
        name: RouteName.DATA_LOGS,
      })
    } catch (error) {
      log.error('Error accessing logs data route', error)
    }
  }

  function goToRecordsData(table: DBTable) {
    try {
      router.push({
        name: RouteName.DATA_RECORDS,
        params: { table },
      })
    } catch (error) {
      log.error('Error accessing records data route', error)
    }
  }

  function goToCreate(table: DBTable, parentId?: string) {
    try {
      router.push({
        name: RouteName.CREATE,
        params: { table, parentId },
      })
    } catch (error) {
      log.error('Error accessing create route', error)
    }
  }

  function goToEdit(table: DBTable, id: string) {
    try {
      router.push({
        name: RouteName.EDIT,
        params: { table, id },
      })
    } catch (error) {
      log.error('Error accessing edit route', error)
    }
  }

  /**
   * Go back if previous route state is part of the app history, otherwise go to Dashboard.
   */
  function goBack() {
    try {
      if (router?.options?.history?.state?.back) {
        router.back()
      } else {
        router.push({ name: RouteName.DASHBOARD })
      }
    } catch (error) {
      log.error('Error accessing go back route', error)
    }
  }

  return {
    route,
    router,
    routeId,
    routeParentId,
    routeTable,
    goToDashboard,
    goToActive,
    goToLogsData,
    goToRecordsData,
    goToCreate,
    goToEdit,
    goBack,
  }
}
