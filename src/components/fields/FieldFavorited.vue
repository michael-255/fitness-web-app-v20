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
  <div class="text-weight-bold text-body1">Favorited</div>

  <div v-if="inspecting">{{ inspectFormat(actionStore.record.favorited) }}</div>

  <div v-else>
    <p>Whether the record is favorited and is prioritized on the Dashboard.</p>
    <QToggle v-model="actionStore.record.favorited" />
  </div>
</template>
