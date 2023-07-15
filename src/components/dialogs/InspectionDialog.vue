<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { Icon } from '@/types/general'
import { onUnmounted } from 'vue'
import { Log } from '@/models/Log'
import {
  InternalTable,
  type AnyDBRecord,
  type DBField,
  type DBTable,
  type InternalField,
} from '@/types/database'
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

// Setup action store record with all the record values
Object.keys(props.record).map((key) => {
  // Includes InternalField to support inspecting Logs
  actionStore.record[key as DBField | InternalField] = props.record[key as DBField | InternalField]
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
