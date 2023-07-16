import { Child, childSchema } from '@/models/_Child'
import { DBField, type InspectionItem } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'
import { createdTimestampSchema, idSchema } from '@/models/_Entity'
import { getDisplayDate } from '@/utils/common'

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
      defineAsyncComponent(() => import('@/components/fields/FieldExerciseResultIds.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFinishedTimestamp.vue')),
    ]
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Child.getInspectionItems(),
      {
        field: DBField.EXERCISE_RESULT_IDS,
        label: 'Exercise Results',
        output: 'list',
        format: (val: string[]) => val || [],
      },
      {
        field: DBField.FINISHED_TIMESTAMP,
        label: 'Finished Date',
        output: 'single',
        format: (val: number | undefined) => (val ? getDisplayDate(val) : '-'),
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Child.getTableColumns(),
      {
        name: DBField.EXERCISE_RESULT_IDS,
        label: 'Exercise Results',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.EXERCISE_RESULT_IDS],
        format: (val: string[]) => `${val?.length ? val.length : 0}`,
      },
      {
        name: DBField.FINISHED_TIMESTAMP,
        label: 'Finished Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.FINISHED_TIMESTAMP],
        format: (val: number | undefined) => (val ? getDisplayDate(val) : ''),
      },
    ]
  }
}
