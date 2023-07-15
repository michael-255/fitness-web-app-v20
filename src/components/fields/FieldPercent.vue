<script setup lang="ts">
import { MeasurementInput } from '@/models/Measurement'
import { percentSchema } from '@/models/MeasurementResult'
import type { AnyDBRecord } from '@/types/database'
import { ref } from 'vue'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

const isVisible = ref(false)

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  if (parentRecord?.measurementInput === MeasurementInput.PERCENT) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})

function inspectFormat(val: number) {
  return val ? `${val}%` : '-'
}
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.PERCENT }}</div>

    <div v-if="inspecting">{{ inspectFormat(actionStore.record.percent) }}</div>

    <!-- TODO - Hint with last value -->
    <QInput
      v-else
      v-model.number="actionStore.record.percent"
      :rules="[(val: number) => percentSchema.safeParse(val).success || 'Must be between 1 and 100']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>
</template>
