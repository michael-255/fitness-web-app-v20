import { Child, childSchema } from '@/models/_Child'
import { DBField, type InspectionItem } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'
import { ExerciseInput } from '@/models/Exercise'

const exerciseDataFields = [
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

export const setsSchema = z.array(
  z.number().min(Number.MIN_SAFE_INTEGER).max(Number.MAX_SAFE_INTEGER)
)

// Hack to make a partial of this before using refine()
const _exerciseResultSchema = childSchema.extend({
  [DBField.REPS]: setsSchema.optional(),
  [DBField.WEIGHT]: setsSchema.optional(),
  [DBField.DISTANCE]: setsSchema.optional(),
  [DBField.DURATION]: setsSchema.optional(),
  [DBField.WATTS]: setsSchema.optional(),
  [DBField.SPEED]: setsSchema.optional(),
  [DBField.RESISTANCE]: setsSchema.optional(),
  [DBField.INCLINE]: setsSchema.optional(),
  [DBField.CALORIES]: setsSchema.optional(),
})

export const exerciseResultSchema = _exerciseResultSchema.refine(
  (obj) => {
    const fieldKeys = Object.keys(obj).filter((f) => exerciseDataFields.includes(f as DBField))
    const noUndefined = fieldKeys.every((val) => val !== undefined)
    return noUndefined
  },
  {
    message: 'Must have valid entries in exercise result data fields',
    path: exerciseDataFields,
  }
)

const partialExerciseResultSchema = _exerciseResultSchema.deepPartial()
type ExerciseResultParams = z.infer<typeof partialExerciseResultSchema>

export class ExerciseResult extends Child {
  [DBField.REPS]?: number[];
  [DBField.WEIGHT]?: number[];
  [DBField.DISTANCE]?: number[];
  [DBField.DURATION]?: number[];
  [DBField.WATTS]?: number[];
  [DBField.SPEED]?: number[];
  [DBField.RESISTANCE]?: number[];
  [DBField.INCLINE]?: number[];
  [DBField.CALORIES]?: number[]

  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
    reps,
    weightLbs,
    distanceMiles,
    durationMinutes,
    watts,
    speedMph,
    resistance,
    incline,
    calories,
  }: ExerciseResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
    this.reps = reps
    this.weightLbs = weightLbs
    this.distanceMiles = distanceMiles
    this.durationMinutes = durationMinutes
    this.watts = watts
    this.speedMph = speedMph
    this.resistance = resistance
    this.incline = incline
    this.calories = calories
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Exercise Result' : 'Exercise Results'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldParentId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldSets.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
    ]
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Child.getInspectionItems(),
      {
        field: DBField.REPS,
        label: ExerciseInput.REPS,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.WEIGHT,
        label: ExerciseInput.WEIGHT,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.DISTANCE,
        label: ExerciseInput.DISTANCE,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.DURATION,
        label: ExerciseInput.DURATION,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.WATTS,
        label: ExerciseInput.WATTS,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.SPEED,
        label: ExerciseInput.SPEED,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.CALORIES,
        label: ExerciseInput.CALORIES,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.RESISTANCE,
        label: ExerciseInput.RESISTANCE,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        field: DBField.INCLINE,
        label: ExerciseInput.INCLINE,
        output: 'single',
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Child.getTableColumns(),
      {
        name: DBField.REPS,
        label: ExerciseInput.REPS,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.REPS],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.WEIGHT,
        label: ExerciseInput.WEIGHT,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.WEIGHT],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.DISTANCE,
        label: ExerciseInput.DISTANCE,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.DISTANCE],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.DURATION,
        label: ExerciseInput.DURATION,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.DURATION],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.WATTS,
        label: ExerciseInput.WATTS,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.WATTS],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.SPEED,
        label: ExerciseInput.SPEED,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.SPEED],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.RESISTANCE,
        label: ExerciseInput.RESISTANCE,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.RESISTANCE],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.INCLINE,
        label: ExerciseInput.INCLINE,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.INCLINE],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
      {
        name: DBField.CALORIES,
        label: ExerciseInput.CALORIES,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.CALORIES],
        format: (val: number[] | undefined) => (val ? val.join(', ') : ''),
      },
    ]
  }
}
