<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { AnyDBRecord } from '@/types/database'
import { MeasurementInput } from '@/models/Measurement'
import { numberSchema } from '@/models/MeasurementResult'
import useActionStore from '@/stores/action'
import useParentIdWatcher from '@/composables/useParentIdWatcher'

const actionStore = useActionStore()

const isVisible: Ref<boolean> = ref(false)

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  if (parentRecord?.measurementInput === MeasurementInput.NUMBER) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.NUMBER }}</div>

    <!-- TODO - Hint with last value -->
    <QInput
      v-model.number="actionStore.record.number"
      :rules="[(val: number) => numberSchema.safeParse(val).success || 'Must be a valid number']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>
</template>
