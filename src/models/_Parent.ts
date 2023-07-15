import { DBField } from '@/types/database'
import { z } from 'zod'
import { Entity, booleanSchema, entitySchema } from '@/models/_Entity'
import { Limit } from '@/types/general'
import type { QTableColumn } from 'quasar'
import { getDisplayDate, truncateString } from '@/utils/common'

export const nameSchema = z.string().min(Limit.MIN_NAME).max(Limit.MAX_NAME).trim()
export const textAreaSchema = z.string().max(Limit.MAX_TEXT_AREA).trim()
export const previousSchema = z.record(z.nativeEnum(DBField), z.any()).optional()
export type Previous = z.infer<typeof previousSchema>

export const parentSchema = entitySchema.extend({
  [DBField.NAME]: nameSchema,
  [DBField.DESC]: textAreaSchema,
  [DBField.ENABLED]: booleanSchema,
  [DBField.FAVORITED]: booleanSchema,
  [DBField.PREVIOUS]: previousSchema,
})

const parentOptionalSchema = parentSchema.deepPartial()
type ParentParams = z.infer<typeof parentOptionalSchema>

export class Parent extends Entity {
  [DBField.NAME]?: string;
  [DBField.DESC]?: string;
  [DBField.ENABLED]?: boolean;
  [DBField.FAVORITED]?: boolean;
  [DBField.PREVIOUS]?: Previous

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previous,
  }: ParentParams) {
    super({ id, createdTimestamp, activated })
    this.name = name
    this.desc = desc
    this.enabled = enabled
    this.favorited = favorited
    this.previous = previous
  }

  static getTableColumns(): QTableColumn[] {
    return [
      ...Entity.getTableColumns(),
      {
        name: DBField.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.NAME],
        format: (val: string) => truncateString(val, 50, '...'),
      },
      {
        name: DBField.DESC,
        label: 'Description',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.DESC],
        format: (val: string) => truncateString(val, 50, '...'),
      },
      {
        name: DBField.ENABLED,
        label: 'Enabled',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.ENABLED],
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
      {
        name: DBField.FAVORITED,
        label: 'Favorited',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.FAVORITED],
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
      {
        name: DBField.PREVIOUS,
        label: 'Last Record Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.PREVIOUS],
        format: (val: Previous) =>
          val?.createdTimestamp ? getDisplayDate(val?.createdTimestamp) : 'No previous records',
      },
    ]
  }
}
