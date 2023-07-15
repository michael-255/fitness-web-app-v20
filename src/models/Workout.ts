import { z } from 'zod'
import { Parent, parentSchema } from '@/models/_Parent'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { idSchema } from '@/models/_Entity'
import { DBField } from '@/types/database'

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
    previous,
    exerciseIds,
  }: WorkoutParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previous })
    this.exerciseIds = exerciseIds
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Workout' : 'Workouts'
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
