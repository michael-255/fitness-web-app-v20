import { DBField, type InspectionItem } from '@/types/database'
import { getDisplayDate, truncateString } from '@/utils/common'
import type { QTableColumn } from 'quasar'
import { z } from 'zod'

export const idSchema = z.string().uuid()
export const createdTimestampSchema = z.number().int()
export const booleanSchema = z.boolean()

export const entitySchema = z.object({
  [DBField.ID]: idSchema,
  [DBField.CREATED_TIMESTAMP]: createdTimestampSchema,
  [DBField.ACTIVATED]: booleanSchema.default(false),
})

const partialEntitySchema = entitySchema.deepPartial()
type EntityParams = z.infer<typeof partialEntitySchema>

export class Entity {
  [DBField.ID]?: string;
  [DBField.CREATED_TIMESTAMP]?: number;
  [DBField.ACTIVATED]?: boolean

  constructor({ id, createdTimestamp, activated }: EntityParams) {
    this.id = id
    this.createdTimestamp = createdTimestamp
    this.activated = activated
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      {
        field: DBField.ID,
        label: 'Id',
        output: 'single',
        format: (val: string) => `${val || '-'}`,
      },
      {
        field: DBField.CREATED_TIMESTAMP,
        label: 'Created Date',
        output: 'single',
        format: (val: number) => getDisplayDate(val) || '-',
      },
      {
        field: DBField.ACTIVATED,
        label: 'Activated',
        output: 'single',
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      {
        name: 'hiddenId', // Needed in QTable row props
        label: '',
        align: 'left',
        sortable: false,
        required: true,
        field: (row: any) => row[DBField.ID],
        format: (val: string) => `${val}`,
        style: 'display: none', // Hide column in QTable
      },
      {
        name: DBField.ID,
        label: 'Id*',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.ID],
        format: (val: string) => truncateString(val, 8, '*'),
      },
      {
        name: DBField.CREATED_TIMESTAMP,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.CREATED_TIMESTAMP],
        format: (val: number) => getDisplayDate(val),
      },
      {
        name: DBField.ACTIVATED,
        label: 'Activated',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.ACTIVATED],
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
    ]
  }
}
