<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { exerciseIdsSchema } from '@/models/Workout'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<{ value: string; label: string; disable: boolean }[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record.exerciseIds = actionStore.record.exerciseIds ?? []
    options.value = await DB.getExerciseIdOptions()
  } catch (error) {
    log.error('Error with exercise ids field', error)
  }
})
</script>

<template>
  <div class="text-weight-bold text-body1">Exercises</div>

  <p>Exercises associated with this workout.</p>

  <QSelect
    v-model="actionStore.record.exerciseIds"
    :rules="[(val: string[]) => exerciseIdsSchema.safeParse(val).success || 'Required']"
    :options="options"
    lazy-rules
    multiple
    counter
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  />
</template>
