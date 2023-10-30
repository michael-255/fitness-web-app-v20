<script setup lang="ts">
import useDialogs from '@/composables/useDialogs'
import useLogger from '@/composables/useLogger'
import { textAreaSchema } from '@/models/_Parent'
import { ExerciseInput, type Exercise } from '@/models/Exercise'
import type { ExerciseResult } from '@/models/ExerciseResult'
import { numberSchema } from '@/models/MeasurementResult'
import DB from '@/services/Database'
import { DBField, DBTable, type AnyDBRecord } from '@/types/database'
import { Icon, Limit } from '@/types/general'
import { extend } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps<{
  parentExercise: Exercise // For displaying exercise info
  exerciseResult: ExerciseResult // For updating the real active exercise record
}>()

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useDialogs()

const parentExercise: Ref<AnyDBRecord> = ref(props.parentExercise)
const exerciseResult: Ref<AnyDBRecord> = ref(props.exerciseResult)
const previousExerciseResults: Ref<AnyDBRecord[]> = ref([])
const setTracker: Ref<null[]> = ref([])

onMounted(async () => {
  previousExerciseResults.value = await DB.getPreviousExerciseResults(
    props.parentExercise.id as string
  )

  const exerciseInputs: ExerciseInput[] = props.parentExercise.exerciseInputs || []

  exerciseInputs.forEach((input) => {
    if (Object.values(ExerciseInput).includes(input)) {
      updateSetTracker(exerciseResult.value?.[DB.getFieldForInput(input)])
    }
  })
})

function updateSetTracker(matchedArray: any[]) {
  setTracker.value = new Array(matchedArray?.length || 0).fill(null)
}

function addSet() {
  if (setTracker.value.length > 0 && setTracker.value.length < Limit.MAX_SETS) {
    const exerciseInputs: ExerciseInput[] = props.parentExercise.exerciseInputs || []

    exerciseInputs.forEach((input) => {
      if (Object.values(ExerciseInput).includes(input)) {
        exerciseResult.value?.[DB.getFieldForInput(input)].push(null)
        updateSetTracker(exerciseResult.value?.[DB.getFieldForInput(input)])
      }
    })

    updateExerciseResult()
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
          const exerciseInputs: ExerciseInput[] = props.parentExercise.exerciseInputs || []

          exerciseInputs.forEach((input) => {
            if (Object.values(ExerciseInput).includes(input)) {
              exerciseResult.value?.[DB.getFieldForInput(input)].pop()
              updateSetTracker(exerciseResult.value?.[DB.getFieldForInput(input)])
            }
          })

          updateExerciseResult()
        }
      } catch (error) {
        log.error('Failed to remove last set', error)
      }
    }
  )
}

async function updateExerciseResult() {
  return await DB.putActiveRecord(DBTable.EXERCISE_RESULTS, extend(true, {}, exerciseResult.value))
}

async function updateNote() {
  exerciseResult.value.note = exerciseResult.value.note?.trim()
  return await updateExerciseResult()
}

function getHint(field: DBField, setIndex: number) {
  if (field === DBField.WEIGHT) {
    return getWeightHint(setIndex)
  } else {
    const previous = parentExercise.value?.previousChild
    return previous?.[field]?.[setIndex] ? `${previous[field][setIndex]}` : 'No previous value'
  }
}

function getWeightHint(setIndex: number) {
  const previousResults = previousExerciseResults.value

  let firstStr = 'No previous value'
  let incrementStr = ''

  // Produces the weight increments for the last few times the exercise was performed
  for (let i = 0; i < 6; i++) {
    const currentWeight = previousResults[i]?.weightLbs?.[setIndex] ?? 0

    if (currentWeight !== undefined) {
      if (i === 0) {
        firstStr = `${currentWeight}`
      } else {
        const previousWeight = previousResults[i - 1]?.weightLbs?.[setIndex] ?? 0
        incrementStr += `${previousWeight - currentWeight}`

        if (i < 6 - 1) {
          incrementStr += ', '
        }
      }
    }
  }

  if (incrementStr.endsWith(', ')) {
    incrementStr = incrementStr.slice(0, -2)
  }

  return incrementStr ? `${firstStr} ← ${incrementStr}` : firstStr
}

function viewPreviousExerciseNote(note: string) {
  dismissDialog('Previous Exercise Note', note, Icon.NOTE)
}
</script>

<template>
  <QCard>
    <QCardSection>
      <p class="text-h6">{{ parentExercise.name }}</p>

      <div class="row q-mb-sm">
        <div class="col">{{ parentExercise.desc }}</div>

        <div v-if="parentExercise?.multipleSets" class="column reverse">
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

        <div class="absolute-top-right q-ma-xs">
          <QBtn
            v-if="parentExercise?.previousChild?.note"
            flat
            round
            :icon="Icon.NOTE"
            color="info"
            @click="viewPreviousExerciseNote(parentExercise.previousChild.note)"
          />
        </div>
      </div>

      <div v-if="setTracker.length > 0">
        <div v-for="(_, setIndex) in setTracker" :key="setIndex" class="row q-mb-md">
          <QBadge
            v-if="parentExercise?.multipleSets"
            size="lg"
            color="secondary"
            class="text-bold text-body1 q-mr-sm"
          >
            {{ setIndex + 1 }}
          </QBadge>
          <div class="col">
            <div class="row q-mt-xs">
              <QInput
                v-for="(input, i) in parentExercise?.exerciseInputs"
                :key="i"
                stack-label
                class="col-6 q-mb-xs"
                type="number"
                step="0.01"
                filled
                square
                dense
                v-model.number="exerciseResult[DB.getFieldForInput(input)][setIndex]"
                :rules="[(val: number) => numberSchema.safeParse(val).success || 'Required']"
                :label="input"
                :hint="getHint(DB.getFieldForInput(input), setIndex)"
                @blur="updateExerciseResult()"
              />
            </div>
          </div>
        </div>
      </div>

      <QInput
        :label="`${parentExercise.name} notes`"
        v-model="exerciseResult.note"
        :rules="[(val: string) => textAreaSchema.safeParse(val).success || `Note cannot exceed ${Limit.MAX_TEXT_AREA} characters`]"
        :maxlength="Limit.MAX_TEXT_AREA"
        type="textarea"
        lazy-rules
        autogrow
        counter
        dense
        outlined
        color="primary"
        @blur="updateNote()"
      >
        <template v-slot:prepend>
          <QIcon :name="Icon.NOTE" />
        </template>

        <template v-slot:append>
          <QIcon
            v-if="exerciseResult.note !== ''"
            :name="Icon.CANCEL"
            @click="exerciseResult.note = ''"
            class="cursor-pointer"
          />
        </template>
      </QInput>
    </QCardSection>
  </QCard>
</template>
