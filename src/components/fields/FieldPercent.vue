<script setup lang="ts">
import { MeasurementInput } from '@/models/Measurement'
import { percentSchema } from '@/models/MeasurementResult'
import type { AnyDBRecord } from '@/types/database'
import { ref, type Ref } from 'vue'
import { RouteName } from '@/types/general'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'
import useRouting from '@/composables/useRouting'

const { route } = useRouting()
const actionStore = useActionStore()

const isVisible = ref(false)
const previous: Ref<AnyDBRecord> = ref({})

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  previous.value = parentRecord.previousChild

  if (parentRecord?.measurementInput === MeasurementInput.PERCENT) {
    if (route.name === RouteName.CREATE) {
      delete actionStore.record.bodyWeight
      actionStore.record.percent = undefined
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
    return previous.value?.percent ? `Currently ${previous.value.percent}%` : 'No previous value'
  } else {
    return previous.value?.percent ? `Previously ${previous.value.percent}%` : 'No previous value'
  }
}
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.PERCENT }}</div>

    <QInput
      v-model.number="actionStore.record.percent"
      :rules="[(val: number) => percentSchema.safeParse(val).success || 'Must be between 1 and 100']"
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
