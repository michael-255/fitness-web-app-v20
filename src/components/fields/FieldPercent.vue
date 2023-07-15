<script setup lang="ts">
import { percentSchema } from '@/models/ExampleResults'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: number) {
  return val ? `${val}%` : '-'
}
</script>

<template>
  <div class="text-weight-bold text-body1">Percentage</div>

  <div v-if="inspecting">{{ inspectFormat(actionStore.record.percent) }}</div>

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
</template>
