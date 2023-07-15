<script setup lang="ts">
import { getDisplayDate } from '@/utils/common'
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()

function inspectFormat(val: number) {
  return getDisplayDate(val) || '-'
}
</script>

<template>
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Created Date</div>
    <div>{{ inspectFormat(actionStore.record.timestamp) }}</div>
  </div>
</template>
