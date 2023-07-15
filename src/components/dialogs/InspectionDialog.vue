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

const inspectionItems =
  props.table === InternalTable.LOGS ? Log.getInspectionItems() : DB.getInspectionItems(props.table)

const title =
  props.table === InternalTable.LOGS
    ? Log.getLabel('singular')
    : DB.getLabel(props.table, 'singular')

onMounted(async () => {
  extend(true, actionStore.record, props.record) // Copy record values to action store
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

        <div v-for="(item, i) in inspectionItems" :key="i" class="q-mb-md">
          <div v-if="actionStore.record[item.field] !== undefined">
            <div class="text-weight-bold text-body1">{{ item.label }}</div>

            <div v-if="item.output === 'single'">
              {{ item.format(actionStore.record[item.field]) }}
            </div>

            <div v-else-if="item.output === 'list'">
              <li v-for="(value, i) in actionStore.record[item.field]" :key="i" class="q-ml-sm">
                {{ item.format(value) }}
              </li>
            </div>

            <div v-else-if="item.output === 'key-values'">
              <li v-for="(value, key) in actionStore.record[item.field]" :key="key" class="q-ml-sm">
                {{ key }}: {{ value }}
              </li>
            </div>
          </div>
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
