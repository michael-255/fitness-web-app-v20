<script setup lang="ts">
import { Icon } from '@/types/general'
import { useMeta } from 'quasar'
import { ref, type Ref, onUnmounted, onMounted } from 'vue'
import { AppName } from '@/constants/global'
import { SettingKey } from '@/models/Setting'
import { DBTable } from '@/types/database'
import { Workout } from '@/models/Workout'
import { Exercise } from '@/models/Exercise'
import { Measurement } from '@/models/Measurement'
import ResponsivePage from '@/components/ResponsivePage.vue'
import WelcomeOverlay from '@/components/WelcomeOverlay.vue'
import useUIStore from '@/stores/ui'
import useLogger from '@/composables/useLogger'
import DashboardRecordCardList from '@/components/dashboard/DashboardRecordCardList.vue'
import useDefaults from '@/composables/useDefaults'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Dashboard` })

const uiStore = useUIStore()
const { log } = useLogger()
const { confirmDialog } = useDialogs()
const {
  onAddBarbellStrengthWorkouts,
  onAddAuxiliaryStrengthWorkouts,
  onAddStretchRoutine,
  onAddStandardMeasurements,
} = useDefaults()

const dashboardOptions = [
  {
    value: DBTable.WORKOUTS,
    label: Workout.getLabel('plural'),
    icon: Icon.WORKOUTS,
  },
  {
    value: DBTable.EXERCISES,
    label: Exercise.getLabel('plural'),
    icon: Icon.EXERCISES,
  },
  {
    value: DBTable.MEASUREMENTS,
    label: Measurement.getLabel('plural'),
    icon: Icon.MEASUREMENTS,
  },
]
const showDescriptions = ref(false)
const workouts: Ref<Workout[]> = ref([])
const exercises: Ref<Exercise[]> = ref([])
const measurements: Ref<Measurement[]> = ref([])

const workoutsSubscription = DB.liveDashboardData<Workout>(DBTable.WORKOUTS).subscribe({
  next: (liveData) => (workouts.value = liveData),
  error: (error) => log.error('Error fetching live Workouts', error),
})

const exercisesSubscription = DB.liveDashboardData<Exercise>(DBTable.EXERCISES).subscribe({
  next: (liveData) => (exercises.value = liveData),
  error: (error) => log.error('Error fetching live Exercises', error),
})

const measurementsSubscription = DB.liveDashboardData<Measurement>(DBTable.MEASUREMENTS).subscribe({
  next: (liveData) => (measurements.value = liveData),
  error: (error) => log.error('Error fetching live Measurements', error),
})

onMounted(async () => {
  showDescriptions.value = Boolean(await DB.getSettingValue(SettingKey.DASHBOARD_DESCRIPTIONS))
})

onUnmounted(() => {
  workoutsSubscription.unsubscribe()
  exercisesSubscription.unsubscribe()
  measurementsSubscription.unsubscribe()
})

function onDefaultWorkouts() {
  confirmDialog(
    'Load Default Workouts',
    'Cycle through, and confirm each default workout you would like to load into the database.',
    Icon.DEFAULTS,
    'info',
    async () => {
      try {
        onAddBarbellStrengthWorkouts()
        onAddAuxiliaryStrengthWorkouts()
        onAddStretchRoutine()
      } catch (error) {
        log.error('Defaults failed', error)
      }
    }
  )
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.DASHBOARD" bannerTitle="Dashboard">
    <WelcomeOverlay />

    <section class="q-mb-md">
      <p class="text-center text-body1">
        {{ dashboardOptions.find((i) => i.value === uiStore.dashboardSelection)?.label }}
      </p>

      <div class="row justify-center">
        <QBtn
          v-for="(option, i) in dashboardOptions"
          :key="i"
          round
          size="lg"
          class="q-mb-xs q-mx-xs"
          :icon="option.icon"
          :color="uiStore.dashboardSelection === option.value ? 'info' : 'grey'"
          @click="uiStore.dashboardSelection = option.value"
        />
      </div>
    </section>

    <section>
      <DashboardRecordCardList
        v-show="uiStore.dashboardSelection === DBTable.WORKOUTS"
        :parentTable="DBTable.WORKOUTS"
        :records="workouts"
        :showDescriptions="showDescriptions"
        :defaultsFunc="onDefaultWorkouts"
      />
      <DashboardRecordCardList
        v-show="uiStore.dashboardSelection === DBTable.EXERCISES"
        :parentTable="DBTable.EXERCISES"
        :records="exercises"
        :showDescriptions="showDescriptions"
        :defaultsFunc="undefined"
      />
      <DashboardRecordCardList
        v-show="uiStore.dashboardSelection === DBTable.MEASUREMENTS"
        :parentTable="DBTable.MEASUREMENTS"
        :records="measurements"
        :showDescriptions="showDescriptions"
        :defaultsFunc="onAddStandardMeasurements"
      />
    </section>
  </ResponsivePage>
</template>
