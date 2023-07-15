import { DBField, type InspectionItem } from '@/types/database'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import { z } from 'zod'
import { Parent, parentSchema } from '@/models/_Parent'

export enum MeasurementInput {
  BODY_WEIGHT = 'Body Weight (lbs)',
  PERCENT = 'Percentage',
  INCHES = 'Inches',
  NUMBER = 'Number',
}
export const measurementInputSchema = z.nativeEnum(MeasurementInput)

export const measurementSchema = parentSchema.extend({
  [DBField.MEASUREMENT_INPUT]: measurementInputSchema,
})

const partialMeasurementSchema = measurementSchema.deepPartial()
type MeasurementParams = z.infer<typeof partialMeasurementSchema>

export class Measurement extends Parent {
  [DBField.MEASUREMENT_INPUT]?: MeasurementInput

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previous,
    measurementInput,
  }: MeasurementParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previous })
    this.measurementInput = measurementInput
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Measurement' : 'Measurements'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldMeasurementInput.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return []
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Parent.getInspectionItems(),
      {
        field: DBField.MEASUREMENT_INPUT,
        label: 'Measurement Input',
        output: 'single',
        format: (val: MeasurementInput) => `${val || '-'}`,
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Parent.getTableColumns(),
      {
        name: DBField.MEASUREMENT_INPUT,
        label: 'Measurement Input',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.MEASUREMENT_INPUT],
        format: (val: MeasurementInput) => `${val}`,
      },
    ]
  }
}
