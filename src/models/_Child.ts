import { DBField } from '@/types/database'
import { Entity, entitySchema, idSchema } from '@/models/_Entity'
import { textAreaSchema } from '@/models/_Parent'
import type { QTableColumn } from 'quasar'
import { truncateString } from '@/utils/common'
import type { z } from 'zod'

export const childSchema = entitySchema.extend({
  [DBField.PARENT_ID]: idSchema,
  [DBField.NOTE]: textAreaSchema,
})

const childOptionalSchema = childSchema.deepPartial()
type ChildParams = z.infer<typeof childOptionalSchema>

export class Child extends Entity {
  [DBField.PARENT_ID]?: string;
  [DBField.NOTE]?: string

  constructor({ id, createdTimestamp, activated, parentId, note }: ChildParams) {
    super({ id, createdTimestamp, activated })
    this.parentId = parentId
    this.note = note
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Entity.getTableColumns(),
      {
        name: DBField.PARENT_ID,
        label: 'Parent Id*',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.PARENT_ID],
        format: (val: string) => truncateString(val, 8, '*'),
      },
      {
        name: DBField.NOTE,
        label: 'Note',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.NOTE],
        format: (val: string) => truncateString(val, 50, '*'),
      },
    ]
  }
}
