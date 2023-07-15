<script setup lang="ts">
import { RouteName } from '@/types/general'
import useRouting from '@/composables/useRouting'
import useActionStore from '@/stores/action'

const { route } = useRouting()
const actionStore = useActionStore()
</script>

<template>
  <div class="text-weight-bold text-body1">Multiple Sets</div>

  <p>
    Whether the record allows recording multiple sets or only a single set. This is irrelevant for
    instructional records with no inputs. This cannot be updated once set during record creation.
  </p>

  <QToggle :disable="route.name === RouteName.EDIT" v-model="actionStore.record.multipleSets" />
</template>
