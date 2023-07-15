import { Child, childSchema } from '@/models/_Child'
import { DBField } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'

export const measurementDataFields = [
  DBField.BODY_WEIGHT,
  DBField.PERCENT,
  DBField.INCHES,
  DBField.LBS,
  DBField.NUMBER,
]

export const bodyWeightSchema = z.number().min(1).max(1000)
export const percentSchema = z.number().min(0).max(100)
export const inchesSchema = z.number().min(1).max(500)
export const numberSchema = z.number().min(Number.MIN_SAFE_INTEGER).max(Number.MAX_SAFE_INTEGER)

export const measurementDataSchema = z
  .object({
    [DBField.BODY_WEIGHT]: bodyWeightSchema,
    [DBField.PERCENT]: percentSchema,
    [DBField.INCHES]: inchesSchema,
    [DBField.NUMBER]: numberSchema,
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
