import { watch } from 'vue'
import type { AnyDBRecord } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

export default function useParentIdWatcher(updateFunc: (parentRecord: AnyDBRecord) => void) {
  const actionStore = useActionStore()
  const { log } = useLogger()

  /**
   * Watching action store parent id for changes.
   */
  watch(
    () => actionStore.record.parentId,
    async (newValue, oldValue) => {
      try {
        if (newValue !== oldValue) {
          if (actionStore.record.parentId && actionStore.table) {
            const record = await DB.getRecord(
              DB.getParentTable(actionStore.table),
              actionStore.record.parentId
            )

            if (record) {
              updateFunc(record) // Pass entire record to update function
            }
          }
        }
      } catch (error) {
        log.error('Error with parent id watcher', error)
      }
    },
    { immediate: true }
  )
}
