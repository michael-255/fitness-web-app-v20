<script setup lang="ts">
import { Icon } from '@/types/general'
import { onMounted, onUnmounted, ref } from 'vue'
import { extend, useMeta } from 'quasar'
import { AppName } from '@/constants/global'
import type { DBTable } from '@/types/database'
import ErrorStates from '@/components/ErrorStates.vue'
import ResponsivePage from '@/components/ResponsivePage.vue'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'
import useRouting from '@/composables/useRouting'

useMeta({ title: `${AppName} - Edit Record` })

const { routeTable, routeId, goBack } = useRouting()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

const label = DB.getLabel(routeTable as DBTable, 'singular')
const fieldComponents = DB.getFieldComponents(routeTable as DBTable)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    // Table being used for the action
    actionStore.table = routeTable as DBTable

    // Load record to edit
    const editRecord = await DB.getRecord(routeTable as DBTable, routeId as string)

    if (editRecord) {
      extend(true, actionStore.record, editRecord) // Copy record values to action store
    } else {
      throw new Error('Record not found')
    }
  } catch (error) {
    log.error('Error loading edit view', error)
  }
})

onUnmounted(() => {
  actionStore.$reset()
})

async function onSubmit() {
  confirmDialog('Update', `Update ${label} record?`, Icon.EDIT, 'positive', async () => {
    try {
      await DB.putRecord(routeTable as DBTable, extend(true, {}, actionStore.record))

      log.info('Record updated', {
        table: routeTable,
        id: actionStore.record.id,
      })

      goBack()
    } catch (error) {
      log.error('Update failed', error)
    }
  })
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.EDIT" :bannerTitle="`Edit ${label}`">
    <div v-if="label && fieldComponents.length > 0">
      <QForm
        @submit="onSubmit"
        @validation-error="isFormValid = false"
        @validation-success="isFormValid = true"
      >
        <div v-for="(field, i) in fieldComponents" :key="i" class="q-mb-md">
          <component :is="field" />
        </div>

        <div v-if="!actionStore.record.activated" class="row justify-center q-my-sm">
          <QBtn label="Update" type="submit" color="positive" :icon="Icon.SAVE" />
        </div>
        <div v-else class="row justify-center q-my-sm">
          <QBtn disable label="Active" color="warning" :icon="Icon.LOCK" />
        </div>

        <div class="row justify-center">
          <div v-show="!isFormValid">
            <QIcon :name="Icon.WARN" color="warning" />
            <span class="text-caption q-ml-xs text-warning">
              Correct invalid entries and try again
            </span>
          </div>
        </div>
      </QForm>
    </div>

    <ErrorStates v-else error="unknown" />
  </ResponsivePage>
</template>
