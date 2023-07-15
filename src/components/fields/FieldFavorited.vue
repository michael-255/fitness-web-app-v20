<script setup lang="ts">
import useActionStore from '@/stores/action'

const actionStore = useActionStore()
</script>

<template>
  <div class="text-weight-bold text-body1">Favorited</div>

  <p>Whether the record is favorited and is prioritized on the Dashboard.</p>

  <QToggle v-model="actionStore.record.favorited" />
</template>
