<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { AnyDBRecord } from '@/types/database'
import { MeasurementInput } from '@/models/Measurement'
import { bodyWeightSchema } from '@/models/MeasurementResult'
import { RouteName } from '@/types/general'
import useActionStore from '@/stores/action'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useRouting from '@/composables/useRouting'

const { route } = useRouting()
const actionStore = useActionStore()

const isVisible = ref(false)
const previous: Ref<AnyDBRecord> = ref({})

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  previous.value = parentRecord.previousChild

  if (parentRecord?.measurementInput === MeasurementInput.BODY_WEIGHT) {
    if (route.name === RouteName.CREATE) {
      actionStore.record.bodyWeight = undefined
      delete actionStore.record.percent
      delete actionStore.record.inches
      delete actionStore.record.number
    }
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})

function getHint() {
  if (route.name === RouteName.EDIT) {
    return previous.value?.bodyWeight
      ? `Currently ${previous.value.bodyWeight} lbs`
      : 'No previous value'
  } else {
    return previous.value?.bodyWeight
      ? `Previously ${previous.value.bodyWeight} lbs`
      : 'No previous value'
  }
}
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.BODY_WEIGHT }}</div>

    <QInput
      v-model.number="actionStore.record.bodyWeight"
      :rules="[(val: number) => bodyWeightSchema.safeParse(val).success || 'Must be between 1 and 1000']"
      type="number"
      step="0.01"
      lazy-rules
      dense
      outlined
      color="primary"
      :hint="getHint()"
    />
  </div>
</template>
