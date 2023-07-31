<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { AnyDBRecord } from '@/types/database'
import { MeasurementInput } from '@/models/Measurement'
import { inchesSchema } from '@/models/MeasurementResult'
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

  if (parentRecord?.measurementInput === MeasurementInput.INCHES) {
    if (route.name === RouteName.CREATE) {
      delete actionStore.record.bodyWeight
      delete actionStore.record.percent
      actionStore.record.inches = undefined
      delete actionStore.record.number
    }
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})

function getHint() {
  if (route.name === RouteName.EDIT) {
    return previous.value?.inches ? `Currently ${previous.value.inches} in` : 'No previous value'
  } else {
    return previous.value?.inches ? `Previously ${previous.value.inches} in` : 'No previous value'
  }
}
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.INCHES }}</div>

    <QInput
      v-model.number="actionStore.record.inches"
      :rules="[(val: number) => inchesSchema.safeParse(val).success || 'Must be between 1 and 500']"
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
