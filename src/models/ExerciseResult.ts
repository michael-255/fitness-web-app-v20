import { Child, childSchema } from '@/models/_Child'
import { DBField } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'

export const exerciseDataFields = [
  DBField.REPS,
  DBField.WEIGHT,
  DBField.DISTANCE,
  DBField.DURATION,
  DBField.WATTS,
  DBField.SPEED,
  DBField.RESISTANCE,
  DBField.INCLINE,
  DBField.CALORIES,
]

export const setResultsSchema = z.number().min(Number.MIN_SAFE_INTEGER).max(Number.MAX_SAFE_INTEGER)

export const exerciseSetsSchema = z.array(
  z
    .object({
      [DBField.REPS]: setResultsSchema.optional(),
      [DBField.WEIGHT]: setResultsSchema.optional(),
      [DBField.DISTANCE]: setResultsSchema.optional(),
      [DBField.DURATION]: setResultsSchema.optional(),
      [DBField.WATTS]: setResultsSchema.optional(),
      [DBField.SPEED]: setResultsSchema.optional(),
      [DBField.RESISTANCE]: setResultsSchema.optional(),
      [DBField.INCLINE]: setResultsSchema.optional(),
      [DBField.CALORIES]: setResultsSchema.optional(),
    })
    .refine(
      (obj) => {
        const fieldKeys = Object.keys(obj).filter((f) => exerciseDataFields.includes(f as DBField))
        const noUndefined = fieldKeys.every((val) => val !== undefined)
        const noMissingData = fieldKeys.length > 0
        return noUndefined && noMissingData
      },
      {
        message: 'Must have valid entries in exercise result data fields',
        path: exerciseDataFields,
      }
    )
)
export type ExerciseSets = z.infer<typeof exerciseSetsSchema>

export const exerciseResultSchema = childSchema.extend({
  [DBField.EXERCISE_SETS]: exerciseSetsSchema,
})

const partialExerciseResultSchema = exerciseResultSchema.deepPartial()
type ExerciseResultParams = z.infer<typeof partialExerciseResultSchema>

export class ExerciseResult extends Child {
  [DBField.EXERCISE_SETS]?: ExerciseSets

  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
    exerciseSets,
  }: ExerciseResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
    this.exerciseSets = exerciseSets
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Exercise Result' : 'Exercise Results'
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
