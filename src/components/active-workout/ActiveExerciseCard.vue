<script setup lang="ts">
import type { Exercise } from '@/models/Exercise'
import type { ExerciseResult } from '@/models/ExerciseResult'

defineProps<{
  parentExercise: Exercise // For displaying exercise info
  exerciseResult: ExerciseResult // For updating the real active exercise record
}>()
</script>

<template>
  <QCard>
    <QCardSection>
      <div>{{ parentExercise.name }}</div>
      <div>{{ parentExercise.desc }}</div>
      <br />
      <p>{{ parentExercise }}</p>
      <p>{{ exerciseResult }}</p>
    </QCardSection>
  </QCard>
</template>
