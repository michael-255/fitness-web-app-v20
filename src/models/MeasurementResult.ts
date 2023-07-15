import { Child, childSchema } from '@/models/_Child'
import { DBField } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'
import { MeasurementInput } from './Measurement'

export const measurementDataFields = [
  DBField.BODY_WEIGHT,
  DBField.PERCENT,
  DBField.INCHES,
  DBField.NUMBER,
]

export const bodyWeightSchema = z.number().min(1).max(1000)
export const percentSchema = z.number().min(0).max(100)
export const inchesSchema = z.number().min(1).max(500)
export const numberSchema = z.number().min(Number.MIN_SAFE_INTEGER).max(Number.MAX_SAFE_INTEGER)

export const measurementDataSchema = z
  .object({
    [DBField.BODY_WEIGHT]: bodyWeightSchema.optional(),
    [DBField.PERCENT]: percentSchema.optional(),
    [DBField.INCHES]: inchesSchema.optional(),
    [DBField.NUMBER]: numberSchema.optional(),
  })
  .refine(
    (obj) => {
      const fieldArray = Object.keys(obj).filter((f) =>
        measurementDataFields.includes(f as DBField)
      )
      const noUndefined = fieldArray.every((val) => val !== undefined)
      const noWrongCount = fieldArray.length === 1
      return noUndefined && noWrongCount
    },
    {
      message: 'Must have exactly one valid measurement result data field',
      path: measurementDataFields,
    }
  )
export type MeasurementData = z.infer<typeof measurementDataSchema>

export const measurementResultSchema = childSchema.extend({
  [DBField.MEASUREMENT_DATA]: measurementDataSchema,
})

const partialMeasurementResultSchema = measurementResultSchema.deepPartial()
type MeasurementResultParams = z.infer<typeof partialMeasurementResultSchema>

export class MeasurementResult extends Child {
  [DBField.MEASUREMENT_DATA]?: MeasurementData

  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
    measurementData,
  }: MeasurementResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
    this.measurementData = measurementData
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Measurement Result' : 'Measurement Results'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldParentId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldMeasurementData.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldActivated.vue')),
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Child.getTableColumns(),
      {
        name: DBField.MEASUREMENT_DATA,
        label: MeasurementInput.BODY_WEIGHT,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.MEASUREMENT_DATA],
        format: (val: Record<DBField, number | undefined>) => {
          if (Object.keys(val).length > 0 && val?.bodyWeight) {
            return `${val.bodyWeight} lbs`
          } else {
            return ''
          }
        },
      },
      {
        name: DBField.MEASUREMENT_DATA,
        label: MeasurementInput.PERCENT,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.MEASUREMENT_DATA],
        format: (val: Record<DBField, number | undefined>) => {
          if (Object.keys(val).length > 0 && val?.percent) {
            return `${val.percent}%`
          } else {
            return ''
          }
        },
      },
      {
        name: DBField.MEASUREMENT_DATA,
        label: MeasurementInput.INCHES,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.MEASUREMENT_DATA],
        format: (val: Record<DBField, number | undefined>) => {
          if (Object.keys(val).length > 0 && val?.inches) {
            return `${val.inches} in`
          } else {
            return ''
          }
        },
      },
      {
        name: DBField.MEASUREMENT_DATA,
        label: MeasurementInput.NUMBER,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.MEASUREMENT_DATA],
        format: (val: Record<DBField, number | undefined>) => {
          if (Object.keys(val).length > 0 && val?.number) {
            return `${val.number}`
          } else {
            return ''
          }
        },
      },
    ]
  }
}
