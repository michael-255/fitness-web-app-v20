<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { AnyDBRecord } from '@/types/database'
import { MeasurementInput } from '@/models/Measurement'
import { numberSchema } from '@/models/MeasurementResult'
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

  if (parentRecord?.measurementInput === MeasurementInput.NUMBER) {
    if (route.name === RouteName.CREATE) {
      delete actionStore.record.bodyWeight
      delete actionStore.record.percent
      delete actionStore.record.inches
      actionStore.record.number = undefined
    }
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})

function getHint() {
  if (route.name === RouteName.EDIT) {
    return previous.value?.number ? `Currently ${previous.value.number}` : 'No previous value'
  } else {
    return previous.value?.number ? `Previously ${previous.value.number}` : 'No previous value'
  }
}
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.NUMBER }}</div>

    <QInput
      v-model.number="actionStore.record.number"
      :rules="[(val: number) => numberSchema.safeParse(val).success || 'Must be a valid number']"
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
