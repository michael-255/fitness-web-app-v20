<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { Duration, Icon } from '@/types/general'
import type { ParentTable } from '@/types/database'
import ErrorStates from '@/components/ErrorStates.vue'
import useUIStore from '@/stores/ui'
import DB from '@/services/Database'

const props = defineProps<{
  id: string
  parentTable: ParentTable
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const uiStore = useUIStore()

const inputRef: Ref<any> = ref(null)
const options: Ref<string[]> = ref([
  Duration[Duration['One Week']],
  Duration[Duration['One Month']],
  Duration[Duration['Three Months']],
  Duration[Duration['Six Months']],
  Duration[Duration['One Year']],
  Duration[Duration['All Time']],
])
const chartComponents = DB.getChartComponents(props.parentTable)
const title = DB.getLabel(props.parentTable, 'singular')

function chartTimeRule(time: string) {
  return time !== undefined && time !== null && time !== ''
}
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
      <QIcon :name="Icon.CHARTS" size="sm" class="q-mx-sm" />
      <QToolbarTitle>Charts</QToolbarTitle>
      <QBtn flat round :icon="Icon.CLOSE" @click="onDialogOK" />
    </QToolbar>

    <QCard class="q-dialog-plugin">
      <QCardSection v-if="chartComponents.length > 0">
        <p class="text-h5">{{ title }}</p>

        <p>Select how far back you want the charts to display.</p>

        <QSelect
          v-model="uiStore.chartTime"
          ref="inputRef"
          label="Chart Time"
          :options="options"
          :rules="[(chartTime: string) => chartTimeRule(chartTime) || 'Required']"
          emit-value
          map-options
          options-dense
          dense
          outlined
          color="primary"
          @blur="!!inputRef?.value?.validate()"
        />

        <div v-for="(chart, i) in chartComponents" :key="i" class="q-mb-md">
          <component :is="chart" :id="id" :parentTable="parentTable" />
        </div>
      </QCardSection>

      <ErrorStates v-else error="no-data" />
    </QCard>
  </QDialog>
</template>
