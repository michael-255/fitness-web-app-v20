<script setup lang="ts">
import useActionStore from '@/stores/action'

defineProps<{
  inspecting: boolean
}>()

const actionStore = useActionStore()
</script>

<template>
  <div v-if="inspecting">
    <div class="text-weight-bold text-body1">Details</div>
    <li v-for="(val, key) in actionStore.record.details" :key="key" class="q-ml-sm">
      {{ key }}: {{ val }}
    </li>
  </div>
</template>
