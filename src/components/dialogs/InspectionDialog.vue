<script setup lang="ts">
import { extend, useDialogPluginComponent } from 'quasar'
import { Icon } from '@/types/general'
import { onMounted, onUnmounted } from 'vue'
import { Log } from '@/models/Log'
import { InternalTable, type AnyDBRecord, DBTable } from '@/types/database'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

const props = defineProps<{
  record: AnyDBRecord
  table: DBTable | InternalTable.LOGS
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const actionStore = useActionStore()

const fieldComponents =
  props.table === InternalTable.LOGS ? Log.getFieldComponents() : DB.getFieldComponents(props.table)
const title =
  props.table === InternalTable.LOGS
    ? Log.getLabel('singular')
    : DB.getLabel(props.table, 'singular')

onMounted(async () => {
  extend(true, actionStore.record, props.record) // Copy record values to action store

  // Load measurement input into action store
  if (props.table === DBTable.MEASUREMENT_RESULTS) {
    const measurement = await DB.getRecord(DBTable.MEASUREMENTS, props.record.parentId)

    if (measurement) {
      actionStore.measurementInput = measurement.measurementInput
    }
  }
})

onUnmounted(() => {
  actionStore.$reset()
})
</script>

<template>
  <QDialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    maximized
    @hide="onDialogHide"
  >
    <QToolbar class="bg-info text-white" style="max-height: 50px">
      <QIcon :name="Icon.INSPECT" size="sm" class="q-mx-sm" />
      <QToolbarTitle>Inspect</QToolbarTitle>
      <QBtn flat round :icon="Icon.CLOSE" @click="onDialogOK" />
    </QToolbar>

    <QCard class="q-dialog-plugin">
      <QCardSection>
        <p class="text-h5">{{ title }}</p>

        <div v-for="(field, i) in fieldComponents" :key="i" class="q-mb-md">
          <component :is="field" :inspecting="true" />
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
