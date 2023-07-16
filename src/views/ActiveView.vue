<script setup lang="ts">
import { Icon } from '@/types/general'
import { AppName } from '@/constants/global'
import { useMeta } from 'quasar'
import { onUnmounted, ref, type Ref } from 'vue'
import type { Workout } from '@/models/Workout'
import type { Exercise } from '@/models/Exercise'
import type { WorkoutResult } from '@/models/WorkoutResult'
import type { ExerciseResult } from '@/models/ExerciseResult'
import ResponsivePage from '@/components/ResponsivePage.vue'
import ActiveExerciseCard from '@/components/active-workout/ActiveExerciseCard.vue'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import useRouting from '@/composables/useRouting'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Active Workout` })

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useDialogs()
const { goToDashboard } = useRouting()

const isFormValid = ref(true)
const parentWorkout: Ref<Workout> = ref({})
const parentExercises: Ref<Exercise[]> = ref([])
const workoutResult: Ref<WorkoutResult> = ref({})
const exerciseResults: Ref<ExerciseResult[]> = ref([])

const activeWorkoutSubscription = DB.liveActiveWorkout().subscribe({
  next: (liveData) => {
    parentWorkout.value = liveData.parentWorkout
    parentExercises.value = liveData.parentExercises
    workoutResult.value = liveData.workoutResult
    exerciseResults.value = liveData.exerciseResults

    log.info('Live Active Workout', { ...liveData }) // TODO - Temp for building
  },
  error: (error) => log.error('Error fetching live Active Workout', error),
})

onUnmounted(() => {
  activeWorkoutSubscription.unsubscribe()
})

async function onSubmit() {
  confirmDialog(
    'Finish Workout',
    'Are you ready to finish and save this workout?',
    Icon.SAVE,
    'positive',
    async () => {
      try {
        await DB.finishWorkout()
        goToDashboard()
      } catch (error) {
        log.error('Failed to save active workout', error)
      }
    }
  )
}

function getExerciseParent(parentExerciseId: string) {
  return (parentExercises.value.find((e) => e.id === parentExerciseId) || {}) as Exercise
}

function viewPreviousWorkoutNote(note: string) {
  dismissDialog('Previous Workout Note', note, Icon.NOTE)
}
</script>

<template>
  <ResponsivePage>
    <QForm
      @submit="onSubmit"
      @validation-error="isFormValid = false"
      @validation-success="isFormValid = true"
    >
      <!-- Workout Description -->
      <QCard class="q-mt-sm q-mb-md">
        <QCardSection>
          <p class="text-h6">Workout Description</p>

          <div>{{ parentWorkout.desc }}</div>

          <div class="absolute-top-right q-ma-xs">
            <QBtn
              v-if="parentWorkout?.previousChild?.note"
              flat
              round
              :icon="Icon.NOTE"
              color="info"
              @click="viewPreviousWorkoutNote(parentWorkout.previousChild.note)"
            />
          </div>
        </QCardSection>
      </QCard>

      <!-- Workout Exercises -->
      <ActiveExerciseCard
        v-for="er in exerciseResults"
        :key="er.id"
        :parentExercise="getExerciseParent(er.parentId as string)"
        :exerciseResult="er"
        class="q-mb-md"
      />

      <!-- Submit -->
      <div class="row justify-center q-my-sm">
        <QBtn label="Finish Workout" type="submit" color="positive" :icon="Icon.SAVE" />
      </div>

      <!-- Validation Message -->
      <div v-show="!isFormValid" class="row justify-center">
        <QIcon :name="Icon.WARN" color="warning" />
        <span class="text-caption q-ml-xs text-warning">
          Correct invalid entries and try again
        </span>
      </div>
    </QForm>
  </ResponsivePage>
</template>
