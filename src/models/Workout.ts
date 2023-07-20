import { z } from 'zod'
import { Parent, parentSchema } from '@/models/_Parent'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { idSchema } from '@/models/_Entity'
import { DBField, type InspectionItem } from '@/types/database'

export const exerciseIdsSchema = z.array(idSchema).min(1) // Workout must have at least 1 exercise

export const workoutSchema = parentSchema.extend({
  [DBField.EXERCISE_IDS]: exerciseIdsSchema,
})

const partialWorkoutSchema = workoutSchema.deepPartial()
type WorkoutParams = z.infer<typeof partialWorkoutSchema>

export class Workout extends Parent {
  [DBField.EXERCISE_IDS]?: string[]

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previousChild,
    exerciseIds,
  }: WorkoutParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previousChild })
    this.exerciseIds = exerciseIds
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Workout' : 'Workouts'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldExerciseIds.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [defineAsyncComponent(() => import('@/components/charts/ChartWorkoutDuration.vue'))]
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Parent.getInspectionItems(),
      {
        field: DBField.EXERCISE_IDS,
        label: 'Exercises',
        output: 'list',
        format: (val: string[]) => val || [],
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Parent.getTableColumns(),
      {
        name: DBField.EXERCISE_IDS,
        label: 'Exercises',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.EXERCISE_IDS],
        format: (val: string[]) => `${val?.length ? val.length : 0}`,
      },
    ]
  }
}
