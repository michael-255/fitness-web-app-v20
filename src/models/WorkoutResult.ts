import { Child, childSchema } from '@/models/_Child'
import { DBField } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'
import { createdTimestampSchema, idSchema } from '@/models/_Entity'

export const finishedTimestampSchema = createdTimestampSchema.optional()
export const exerciseResultIdsSchema = z.array(idSchema) // Could be empty

export const workoutResultSchema = childSchema.extend({
  [DBField.FINISHED_TIMESTAMP]: finishedTimestampSchema,
  [DBField.EXERCISE_RESULT_IDS]: exerciseResultIdsSchema,
})

const partialWorkoutResultSchema = workoutResultSchema.deepPartial()
type WorkoutResultParams = z.infer<typeof partialWorkoutResultSchema>

export class WorkoutResult extends Child {
  [DBField.FINISHED_TIMESTAMP]?: number;
  [DBField.EXERCISE_RESULT_IDS]?: string[]

  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
    finishedTimestamp,
    exerciseResultIds,
  }: WorkoutResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
    this.finishedTimestamp = finishedTimestamp
    this.exerciseResultIds = exerciseResultIds
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Workout Result' : 'Workout Results'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldParentId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldActivated.vue')),
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [...Child.getTableColumns()]
  }
}
