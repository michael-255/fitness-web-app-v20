<script setup lang="ts">
import { ref } from 'vue'
import type { AnyDBRecord } from '@/types/database'
import { MeasurementInput } from '@/models/Measurement'
import { inchesSchema } from '@/models/MeasurementResult'
import useActionStore from '@/stores/action'
import useParentIdWatcher from '@/composables/useParentIdWatcher'

const actionStore = useActionStore()

const isVisible = ref(false)

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  if (parentRecord?.measurementInput === MeasurementInput.INCHES) {
    delete actionStore.record.bodyWeight
    delete actionStore.record.percent
    actionStore.record.inches = undefined
    delete actionStore.record.number
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.INCHES }}</div>

    <!-- TODO - Hint with last value -->
    <QInput
      v-model.number="actionStore.record.inches"
      :rules="[(val: number) => inchesSchema.safeParse(val).success || 'Must be between 1 and 500']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>
</template>
