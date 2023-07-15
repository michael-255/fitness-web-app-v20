import { DBField } from '@/types/database'
import { z } from 'zod'
import { idSchema } from '@/models/_Entity'
import { Parent, parentSchema } from '@/models/_Parent'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'

export const idsSchema = z.array(idSchema)

export const exampleSchema = parentSchema.extend({
  [DBField.TEST_IDS]: idsSchema,
})

const exampleOptionalSchema = exampleSchema.deepPartial()
type ExampleParams = z.infer<typeof exampleOptionalSchema>

export class Example extends Parent {
  [DBField.TEST_IDS]?: string[]

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previous,
    testIds,
  }: ExampleParams) {
    super({ id, createdTimestamp, activated, name, desc, enabled, favorited, previous })
    this.testIds = testIds
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Example' : 'Examples'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldName.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDesc.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldTestIds.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldEnabled.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldFavorited.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldActivated.vue')),
    ]
  }

  static getChartComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [defineAsyncComponent(() => import('@/components/charts/ChartPercent.vue'))]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Parent.getTableColumns(),
      {
        name: DBField.TEST_IDS,
        label: 'Test Ids',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.TEST_IDS],
        format: (val: string[]) => `${val?.length ? val.length : 0}`,
      },
    ]
  }
}
