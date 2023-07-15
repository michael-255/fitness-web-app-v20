<script setup lang="ts">
import useActionStore from '@/stores/action'

const actionStore = useActionStore()
</script>

<template>
  <div class="text-weight-bold text-body1">Enabled</div>

  <p>Whether the record is enabled and shows up on the Dashboard and in other lists.</p>

  <QToggle v-model="actionStore.record.enabled" />
</template>
