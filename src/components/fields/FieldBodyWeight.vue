<script setup lang="ts">
import { ref } from 'vue'
import type { AnyDBRecord } from '@/types/database'
import { MeasurementInput } from '@/models/Measurement'
import { bodyWeightSchema } from '@/models/MeasurementResult'
import useActionStore from '@/stores/action'
import useParentIdWatcher from '@/composables/useParentIdWatcher'

const actionStore = useActionStore()

const isVisible = ref(false)

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  if (parentRecord?.measurementInput === MeasurementInput.BODY_WEIGHT) {
    actionStore.record.bodyWeight = undefined
    delete actionStore.record.percent
    delete actionStore.record.inches
    delete actionStore.record.number
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.BODY_WEIGHT }}</div>

    <!-- TODO - Hint with last value -->
    <QInput
      v-model.number="actionStore.record.bodyWeight"
      :rules="[(val: number) => bodyWeightSchema.safeParse(val).success || 'Must be between 1 and 1000']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>
</template>
