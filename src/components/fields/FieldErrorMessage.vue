<script setup lang="ts">
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: string) {
  return `${val || '-'}`
}
</script>

<template>
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Error Message</div>
    <div>{{ inspectFormat(actionStore.record.errorMessage) }}</div>
  </div>
</template>
