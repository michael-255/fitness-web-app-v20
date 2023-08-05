import { Child, childSchema } from '@/models/_Child'
import { DBField, type InspectionItem } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'
import { MeasurementInput } from '@/models/Measurement'

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

// Hack to make a partial of this before using refine()
const _measurementResultSchema = childSchema.extend({
  [DBField.BODY_WEIGHT]: bodyWeightSchema.optional(),
  [DBField.PERCENT]: percentSchema.optional(),
  [DBField.INCHES]: inchesSchema.optional(),
  [DBField.NUMBER]: numberSchema.optional(),
})

export const measurementResultSchema = _measurementResultSchema.refine(
  (obj) => {
    const fieldArray = Object.keys(obj).filter((f) => measurementDataFields.includes(f as DBField))
    const noUndefined = fieldArray.every((val) => val !== undefined)
    const noWrongCount = fieldArray.length === 1
    return noUndefined && noWrongCount
  },
  {
    message: 'Must have exactly one valid measurement result data field',
    path: measurementDataFields,
  }
)

const partialMeasurementResultSchema = _measurementResultSchema.deepPartial()
type MeasurementResultParams = z.infer<typeof partialMeasurementResultSchema>

export class MeasurementResult extends Child {
  [DBField.BODY_WEIGHT]?: number;
  [DBField.PERCENT]?: number;
  [DBField.INCHES]?: number;
  [DBField.NUMBER]?: number

  constructor({
    id,
    createdTimestamp,
    activated,
    parentId,
    note,
    bodyWeight,
    percent,
    inches,
    number,
  }: MeasurementResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
    this.bodyWeight = bodyWeight
    this.percent = percent
    this.inches = inches
    this.number = number
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Measurement Result' : 'Measurement Results'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldParentId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldBodyWeight.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldPercent.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldInches.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNumber.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldNote.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
    ]
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Child.getInspectionItems(),
      {
        field: DBField.BODY_WEIGHT,
        label: MeasurementInput.BODY_WEIGHT,
        output: 'single',
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))} lbs` : '-'),
      },
      {
        field: DBField.PERCENT,
        label: MeasurementInput.PERCENT,
        output: 'single',
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))}%` : '-'),
      },
      {
        field: DBField.INCHES,
        label: MeasurementInput.INCHES,
        output: 'single',
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))} in` : '-'),
      },
      {
        field: DBField.NUMBER,
        label: MeasurementInput.NUMBER,
        output: 'single',
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))}` : '-'),
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Child.getTableColumns(),
      {
        name: DBField.BODY_WEIGHT,
        label: MeasurementInput.BODY_WEIGHT,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.BODY_WEIGHT],
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))} lbs` : ''),
      },
      {
        name: DBField.PERCENT,
        label: MeasurementInput.PERCENT,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.PERCENT],
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))}%` : ''),
      },
      {
        name: DBField.INCHES,
        label: MeasurementInput.INCHES,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.INCHES],
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))} in` : ''),
      },
      {
        name: DBField.NUMBER,
        label: MeasurementInput.NUMBER,
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.NUMBER],
        format: (val: number | undefined) => (val ? `${Number(val.toFixed(2))}` : ''),
      },
    ]
  }
}
