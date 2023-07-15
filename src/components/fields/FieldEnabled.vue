<script setup lang="ts">
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: boolean) {
  return val ? 'Yes' : 'No'
}
</script>

<template>
  <div class="text-weight-bold text-body1">Enabled</div>

  <div v-if="inspecting">{{ inspectFormat(actionStore.record.enabled) }}</div>

  <div v-else>
    <p>Whether the record is enabled and shows up on the Dashboard and in other lists.</p>
    <QToggle v-model="actionStore.record.enabled" />
  </div>
</template>
