<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { exerciseResultIdsSchema } from '@/models/WorkoutResult'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<{ value: string; label: string; disable: boolean }[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record.exerciseResultIds = actionStore.record.exerciseResultIds ?? []
    options.value = await DB.getExerciseResultIdOptions()
  } catch (error) {
    log.error('Error with exercise result ids field', error)
  }
})
</script>

<template>
  <div class="text-weight-bold text-body1">Exercise Results</div>

  <p>Ids of all completed exercises associated with this workout.</p>

  <QSelect
    v-model="actionStore.record.exerciseResultIds"
    :rules="[(val: string[]) => exerciseResultIdsSchema.safeParse(val).success || 'Invalid']"
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
