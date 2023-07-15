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
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Activated</div>
    <div>{{ inspectFormat(actionStore.record.activated) }}</div>
  </div>
</template>
