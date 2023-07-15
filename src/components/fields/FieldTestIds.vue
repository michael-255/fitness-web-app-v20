<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { idsSchema } from '@/models/Test'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

defineProps<{
  inspecting: boolean
}>()

const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<{ value: string; label: string }[]> = ref([])

onMounted(async () => {
  try {
    options.value = await DB.getTestIdsOptions()
  } catch (error) {
    log.error('Error with test ids field', error)
  }
})
</script>

<template>
  <div class="text-weight-bold text-body1">Tests</div>

  <div v-if="inspecting">
    <li v-for="(val, i) in actionStore.record.testIds" :key="i" class="q-ml-sm">
      {{ val }}
    </li>
  </div>

  <div v-else>
    <p>Tests that are stored by the Example record.</p>

    <QSelect
      v-model="actionStore.record.testIds"
      :rules="[(val: string[]) => idsSchema.safeParse(val).success || 'Required']"
      :options="options"
      counter
      multiple
      emit-value
      map-options
      options-dense
      dense
      outlined
      color="primary"
    />
  </div>
</template>
