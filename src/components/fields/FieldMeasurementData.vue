<script setup lang="ts">
import { MeasurementInput } from '@/models/Measurement'
import {
  bodyWeightSchema,
  inchesSchema,
  numberSchema,
  percentSchema,
} from '@/models/MeasurementResult'
import type { AnyDBRecord } from '@/types/database'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  actionStore.measurementInput = parentRecord?.measurementInput

  if (Object.values(MeasurementInput).includes(parentRecord?.measurementInput)) {
    switch (parentRecord.measurementInput) {
      case MeasurementInput.BODY_WEIGHT:
        actionStore.record.measurementData = {
          bodyWeight: actionStore.record.measurementData?.bodyWeight ?? undefined,
        }
        break
      case MeasurementInput.PERCENT:
        actionStore.record.measurementData = {
          percent: actionStore.record.measurementData?.percent ?? undefined,
        }
        break
      case MeasurementInput.INCHES:
        actionStore.record.measurementData = {
          inches: actionStore.record.measurementData?.inches ?? undefined,
        }
        break
      case MeasurementInput.NUMBER:
        actionStore.record.measurementData = {
          number: actionStore.record.measurementData?.number ?? undefined,
        }
        break
      default:
        throw new Error(`Invalid measurement input: ${parentRecord.measurementInput}`)
    }
  }
})

function inspectBodyWeight(val: number) {
  return val ? `${val} lbs` : '-'
}

function inspectPercent(val: number) {
  return val ? `${val}%` : '-'
}

function inspectInches(val: number) {
  return val ? `${val} in` : '-'
}

function inspectNumber(val: number) {
  return val ? `${val}` : '-'
}

// TODO - Inputs need the hint value from the last entry
</script>

<template>
  <div v-if="actionStore.measurementInput === MeasurementInput.BODY_WEIGHT">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.BODY_WEIGHT }}</div>

    <div v-if="inspecting">
      {{ inspectBodyWeight(actionStore.record.measurementData.bodyWeight) }}
    </div>

    <QInput
      v-else
      v-model.number="actionStore.record.measurementData.bodyWeight"
      :rules="[(val: number) => bodyWeightSchema.safeParse(val).success || 'Must be between 1 and 1000']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>

  <div v-else-if="actionStore.measurementInput === MeasurementInput.PERCENT">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.PERCENT }}</div>

    <div v-if="inspecting">{{ inspectPercent(actionStore.record.measurementData.percent) }}</div>

    <QInput
      v-else
      v-model.number="actionStore.record.measurementData.percent"
      :rules="[(val: number) => percentSchema.safeParse(val).success || 'Must be between 1 and 100']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>

  <div v-else-if="actionStore.measurementInput === MeasurementInput.INCHES">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.INCHES }}</div>

    <div v-if="inspecting">{{ inspectInches(actionStore.record.measurementData.inches) }}</div>

    <QInput
      v-else
      v-model.number="actionStore.record.measurementData.inches"
      :rules="[(val: number) => inchesSchema.safeParse(val).success || 'Must be between 1 and 500']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>

  <div v-else-if="actionStore.measurementInput === MeasurementInput.NUMBER">
    <div class="text-weight-bold text-body1">{{ MeasurementInput.NUMBER }}</div>

    <div v-if="inspecting">{{ inspectNumber(actionStore.record.measurementData.number) }}</div>

    <QInput
      v-else
      v-model.number="actionStore.record.measurementData.number"
      :rules="[(val: number) => numberSchema.safeParse(val).success || 'Must be a valid number']"
      type="number"
      lazy-rules
      dense
      outlined
      color="primary"
    />
  </div>
</template>
