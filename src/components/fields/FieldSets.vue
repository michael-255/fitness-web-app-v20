<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { Icon, Limit, RouteName } from '@/types/general'
import type { AnyDBRecord, DBField } from '@/types/database'
import { ExerciseInput } from '@/models/Exercise'
import { numberSchema } from '@/models/MeasurementResult'
import useActionStore from '@/stores/action'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import useRouting from '@/composables/useRouting'
import DB from '@/services/Database'

const { log } = useLogger()
const { confirmDialog } = useDialogs()
const { route } = useRouting()
const actionStore = useActionStore()

const parentExerciseInputs: Ref<ExerciseInput[]> = ref([])
const parentMultipleSets: Ref<boolean> = ref(false)
const setTracker = ref([null])
const isVisible: Ref<boolean> = ref(false)
const previous: Ref<AnyDBRecord> = ref({})

useParentIdWatcher((parentRecord: AnyDBRecord) => {
  parentExerciseInputs.value = parentRecord?.exerciseInputs
  parentMultipleSets.value = parentRecord?.multipleSets
  previous.value = parentRecord.previousChild

  if (route.name === RouteName.CREATE) {
    Object.values(ExerciseInput).forEach((input) => {
      if (parentExerciseInputs.value.includes(input)) {
        actionStore.record[DB.getFieldForInput(input)] = [null]
      } else {
        delete actionStore.record[DB.getFieldForInput(input)]
      }
    })
  } else if (route.name === RouteName.EDIT) {
    Object.values(ExerciseInput).forEach((input) => {
      if (parentExerciseInputs.value.includes(input)) {
        updateSetTracker(actionStore.record[DB.getFieldForInput(input)])
      } else {
        delete actionStore.record[DB.getFieldForInput(input)]
      }
    })
  }

  if (parentExerciseInputs.value.length > 0) {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
})

function updateSetTracker(matchedArray: any[]) {
  setTracker.value = new Array(matchedArray?.length || 0).fill(null)
}

function addSet() {
  if (setTracker.value.length > 0 && setTracker.value.length < Limit.MAX_SETS) {
    parentExerciseInputs.value.forEach((input) => {
      if (Object.values(ExerciseInput).includes(input)) {
        actionStore.record[DB.getFieldForInput(input)].push(null)
        updateSetTracker(actionStore.record[DB.getFieldForInput(input)])
      }
    })
  }
}

function removeSet() {
  confirmDialog(
    'Remove Last Set',
    'Are you sure you want to remove the last set?',
    Icon.REMOVE_SET,
    'warning',
    async () => {
      try {
        if (setTracker.value.length > 1) {
          parentExerciseInputs.value.forEach((input) => {
            if (Object.values(ExerciseInput).includes(input)) {
              actionStore.record[DB.getFieldForInput(input)].pop()
              updateSetTracker(actionStore.record[DB.getFieldForInput(input)])
            }
          })
        }
      } catch (error) {
        log.error('Failed to remove last set', error)
      }
    }
  )
}

function getHint(field: DBField, index: number) {
  if (route.name === RouteName.EDIT) {
    return previous.value?.[field]?.[index]
      ? `Currently ${previous.value[field][index]}`
      : 'No previous value'
  } else {
    return previous.value?.[field]?.[index]
      ? `Previous ${previous.value[field][index]}`
      : 'No previous value'
  }
}
</script>

<template>
  <div v-if="isVisible">
    <div class="text-weight-bold text-body1">Exercise Sets</div>

    <div class="row q-mb-sm">
      <div class="col">
        Sets organize the inputs you choose for this exercise into numbered groups that also display
        how you previously performed. Multiple sets must be enabled to add more than one set.
      </div>

      <div v-if="parentMultipleSets" class="column reverse">
        <div>
          <QBtn
            :disable="setTracker.length >= Limit.MAX_SETS"
            color="positive"
            class="q-ml-sm"
            round
            :icon="Icon.ADD"
            @click="addSet()"
          />
          <QBtn
            :disable="setTracker.length <= 1"
            color="negative"
            class="q-ml-sm"
            round
            :icon="Icon.REMOVE"
            @click="removeSet()"
          />
        </div>
      </div>
    </div>

    <div v-for="(_, setIndex) in setTracker" :key="setIndex" class="row q-mb-md">
      <QBadge
        v-if="parentMultipleSets"
        size="lg"
        color="secondary"
        class="text-bold text-body1 q-mr-sm"
      >
        {{ setIndex + 1 }}
      </QBadge>
      <div class="col">
        <div class="row q-mt-xs">
          <QInput
            v-for="(input, i) in parentExerciseInputs"
            :key="i"
            stack-label
            class="col-6 q-mb-xs"
            type="number"
            step="0.01"
            filled
            square
            dense
            v-model.number="actionStore.record[DB.getFieldForInput(input)][setIndex]"
            :rules="[(val: number) => numberSchema.safeParse(val).success || 'Required']"
            :label="input"
            :hint="getHint(DB.getFieldForInput(input), setIndex)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
