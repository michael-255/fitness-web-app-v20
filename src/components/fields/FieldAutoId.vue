<script setup lang="ts">
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: number) {
  return `${val || '-'}`
}
</script>

<template>
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Auto Id</div>
    <div>{{ inspectFormat(actionStore.record.autoId) }}</div>
  </div>
</template>
