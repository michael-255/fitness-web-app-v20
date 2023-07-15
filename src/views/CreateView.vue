<script setup lang="ts">
import { Icon } from '@/types/general'
import { onMounted, onUnmounted, ref } from 'vue'
import { extend, uid, useMeta } from 'quasar'
import { AppName } from '@/constants/global'
import type { DBTable } from '@/types/database'
import ErrorStates from '@/components/ErrorStates.vue'
import ResponsivePage from '@/components/ResponsivePage.vue'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import useRouting from '@/composables/useRouting'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Create Record` })

const { routeTable, goBack } = useRouting()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const actionStore = useActionStore()

const label = DB.getLabel(routeTable as DBTable, 'singular')
const fieldComponents = DB.getFieldComponents(routeTable as DBTable)
const isFormValid = ref(true)

onMounted(async () => {
  try {
    actionStore.table = routeTable as DBTable
    actionStore.record = DB.getDefaultActionRecord(routeTable as DBTable)
  } catch (error) {
    log.error('Error loading create view', error)
  }
})

onUnmounted(() => {
  actionStore.$reset()
})

async function onSubmit() {
  confirmDialog('Create', `Create ${label} record?`, Icon.CREATE, 'positive', async () => {
    try {
      // Setup other fields before saving
      actionStore.record.id = uid()
      actionStore.record.activated = false

      await DB.addRecord(routeTable as DBTable, extend(true, {}, actionStore.record))

      log.info('Record created', {
        table: routeTable,
        id: actionStore.record.id,
      })

      goBack()
    } catch (error) {
      log.error('Create failed', error)
    }
  })
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.CREATE" :bannerTitle="`Create ${label}`">
    <QForm
      v-if="label && fieldComponents.length > 0"
      @submit="onSubmit"
      @validation-error="isFormValid = false"
      @validation-success="isFormValid = true"
    >
      <div v-for="(field, i) in fieldComponents" :key="i" class="q-mb-md">
        <component :is="field" />
      </div>

      <div v-if="!actionStore.record.activated" class="row justify-center q-my-sm">
        <QBtn label="Create" type="submit" color="positive" :icon="Icon.SAVE" />
      </div>

      <div v-else class="row justify-center q-my-sm">
        <QBtn disable label="Active" color="warning" :icon="Icon.LOCK" />
      </div>

      <div v-show="!isFormValid" class="row justify-center">
        <QIcon :name="Icon.WARN" color="warning" />
        <span class="text-caption q-ml-xs text-warning">
          Correct invalid entries and try again
        </span>
      </div>
    </QForm>

    <ErrorStates v-else error="unknown" />
  </ResponsivePage>
</template>
