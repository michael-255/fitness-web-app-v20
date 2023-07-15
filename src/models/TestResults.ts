import { Child, childSchema } from '@/models/_Child'
import type { QTableColumn } from 'quasar'
import { defineAsyncComponent } from 'vue'
import type { z } from 'zod'

export const testResultSchema = childSchema.extend({})

const testResultOptionalSchema = testResultSchema.deepPartial()
type TestResultParams = z.infer<typeof testResultOptionalSchema>

export class TestResult extends Child {
  constructor({ id, createdTimestamp, activated, parentId, note }: TestResultParams) {
    super({ id, createdTimestamp, activated, parentId, note })
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Test Result' : 'Test Results'
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
