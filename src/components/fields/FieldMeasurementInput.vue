<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { Icon, RouteName } from '@/types/general'
import { MeasurementInput, measurementInputSchema } from '@/models/Measurement'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import useRouting from '@/composables/useRouting'

const { log } = useLogger()
const { route } = useRouting()
const actionStore = useActionStore()

const options: Ref<{ value: MeasurementInput; label: MeasurementInput }[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record.measurementInput = actionStore.record.measurementInput ?? undefined

    options.value = Object.values(MeasurementInput).map((opt: MeasurementInput) => ({
      value: opt,
      label: opt,
    }))
  } catch (error) {
    log.error('Error with measurement input field', error)
  }
})
</script>

<template>
  <div class="text-weight-bold text-body1">Measurement Input</div>

  <p>
    Select a measurement input that represents the type of data you want to record on this
    measurement. This cannot be updated once set during record creation.
  </p>

  <QSelect
    :disable="route.name === RouteName.EDIT"
    v-model="actionStore.record.measurementInput"
    :rules="[(val: MeasurementInput) => measurementInputSchema.safeParse(val).success || 'Required']"
    :options="options"
    lazy-rules
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  >
    <template v-if="route.name === RouteName.EDIT" v-slot:prepend>
      <QIcon color="warning" :name="Icon.LOCK" />
    </template>
  </QSelect>
</template>
