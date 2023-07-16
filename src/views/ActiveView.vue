<script setup lang="ts">
import { Icon } from '@/types/general'
import { AppName } from '@/constants/global'
import { useMeta } from 'quasar'
import { ref } from 'vue'
import ResponsivePage from '@/components/ResponsivePage.vue'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import useRouting from '@/composables/useRouting'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Active Workout` })

const { log } = useLogger()
const { confirmDialog } = useDialogs()
const { goToDashboard } = useRouting()

const isFormValid = ref(true)

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
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INFO" bannerTitle="Active Workout">
    <QForm
      @submit="onSubmit"
      @validation-error="isFormValid = false"
      @validation-success="isFormValid = true"
    >
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
