<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { AppHeaderColor } from '@/constants/global'
import { Icon, RouteName } from '@/types/general'
import { getDurationFromMilliseconds } from '@/utils/common'
import { useInterval } from '@vueuse/core'
import useDialogs from '@/composables/useDialogs'
import useLogger from '@/composables/useLogger'
import DB from '@/services/Database'

const { log } = useLogger()
const { dismissDialog } = useDialogs()

const counter = useInterval(1000)
const title = ref('')
const createdTimestamp = ref(Date.now())
const note = ref('')
const elapsedTime = ref('')

onMounted(async () => {
  try {
    const { parentWorkout, workoutResult } = await DB.getActiveWorkout()

    // Parent fields for display
    if (parentWorkout) {
      if (parentWorkout.name) {
        title.value = parentWorkout.name
      }

      if (parentWorkout?.previousChild?.note) {
        note.value = parentWorkout.previousChild.note
      }
    }

    // Child fields for display
    if (workoutResult) {
      if (workoutResult.createdTimestamp) {
        createdTimestamp.value = workoutResult.createdTimestamp
      }
    }
  } catch (error) {
    log.error('Errors with active workout layout', error)
  }
})

function viewPreviousWorkoutNote() {
  dismissDialog('Previous Workout Note', note.value, Icon.NOTE)
}

watch(counter, () => {
  elapsedTime.value = getDurationFromMilliseconds(Date.now() - createdTimestamp.value) || ''
})
</script>

<template>
  <QLayout view="hHh LpR fFf">
    <QHeader elevated :class="`bg-${AppHeaderColor}`">
      <QToolbar>
        <QToolbarTitle class="q-ml-xs">{{ title }}</QToolbarTitle>
        <QBtn
          v-if="note"
          flat
          round
          :icon="Icon.NOTE"
          class="q-mr-xs"
          @click="viewPreviousWorkoutNote()"
        />
        <QBtn flat round :icon="Icon.BACK" :to="{ name: RouteName.DASHBOARD }" />
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <RouterView v-slot="{ Component, route }">
        <transition name="global-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </QPageContainer>

    <QFooter elevated class="bg-primary">
      <QToolbar>
        <QSpace />
        <QIcon :name="Icon.STOPWATCH" size="sm" class="q-mr-sm" />
        <div class="text-h6">{{ elapsedTime }}</div>
        <QSpace />
      </QToolbar>
    </QFooter>
  </QLayout>
</template>
