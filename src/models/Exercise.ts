import { z } from 'zod'
import { Parent, parentSchema } from '@/models/_Parent'
import { DBField, type InspectionItem } from '@/types/database'
import { defineAsyncComponent } from 'vue'
import type { QTableColumn } from 'quasar'
import { truncateString } from '@/utils/common'

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
    previousChild,
    exerciseInputs,
    multipleSets,
  }: ExerciseParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previousChild })
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
      defineAsyncComponent(() => import('@/components/fields/FieldExerciseInputs.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldMultipleSets.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/charts/ChartBestWeight.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartTotalWeight.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestReps.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestDistance.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestDuration.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestWatts.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestSpeed.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestResistance.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestIncline.vue')),
      defineAsyncComponent(() => import('@/components/charts/ChartBestCalories.vue')),
    ]
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Parent.getInspectionItems(),
      {
        field: DBField.EXERCISE_INPUTS,
        label: 'Exercise Inputs',
        output: 'list',
        format: (val: ExerciseInput[]) => val || [],
      },
      {
        field: DBField.MULTIPLE_SETS,
        label: 'Multiple Sets',
        output: 'single',
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Parent.getTableColumns(),
      {
        name: DBField.EXERCISE_INPUTS,
        label: 'Exercise Inputs',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.EXERCISE_INPUTS],
        format: (val: ExerciseInput[]) => truncateString(val ? val?.join(', ') : '', 30, '...'),
      },
      {
        name: DBField.MULTIPLE_SETS,
        label: 'Favorited',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.MULTIPLE_SETS],
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
    ]
  }
}
