import { z } from 'zod'
import { Parent, parentSchema } from '@/models/_Parent'
import { DBField } from '@/types/database'
import { defineAsyncComponent } from 'vue'
import type { QTableColumn } from 'quasar'

export enum ExerciseInput {
  REPS = 'Reps',
  WEIGHT = 'Weight (lbs)',
  DISTANCE = 'Distance (miles)',
  DURATION = 'Duration (minutes)',
  WATTS = 'Watts',
  SPEED = 'Speed (mph)',
  RESISTANCE = 'Resistance',
  INCLINE = 'Incline',
  CALORIES = 'Calories Burned',
}
export const exerciseInputSchema = z.nativeEnum(ExerciseInput)
export const exerciseInputsSchema = z.array(exerciseInputSchema)

export const exerciseSchema = parentSchema.extend({
  [DBField.EXERCISE_INPUTS]: exerciseInputsSchema,
  [DBField.MULTIPLE_SETS]: z.boolean(),
})

const partialExerciseSchema = exerciseSchema.deepPartial()
type ExerciseParams = z.infer<typeof partialExerciseSchema>

export class Exercise extends Parent {
  [DBField.EXERCISE_INPUTS]?: ExerciseInput[];
  [DBField.MULTIPLE_SETS]?: boolean

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previous,
    exerciseInputs,
    multipleSets,
  }: ExerciseParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previous })
    this.exerciseInputs = exerciseInputs
    this.multipleSets = multipleSets
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Exercise' : 'Exercises'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldActivated.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return []
  }

  static getTableColumns(): QTableColumn[] {
    return [...Parent.getTableColumns()]
  }
}
