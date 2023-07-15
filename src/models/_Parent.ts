import { DBField, type AnyDBRecord, type InspectionItem } from '@/types/database'
import { z } from 'zod'
import { Entity, booleanSchema, entitySchema } from '@/models/_Entity'
import { Limit } from '@/types/general'
import type { QTableColumn } from 'quasar'
import { getDisplayDate, truncateString } from '@/utils/common'

export const nameSchema = z.string().min(Limit.MIN_NAME).max(Limit.MAX_NAME).trim()
export const textAreaSchema = z.string().max(Limit.MAX_TEXT_AREA).trim()
export const previousChildSchema = z.record(z.nativeEnum(DBField), z.any()).optional()

export const parentSchema = entitySchema.extend({
  [DBField.NAME]: nameSchema,
  [DBField.DESC]: textAreaSchema,
  [DBField.ENABLED]: booleanSchema,
  [DBField.FAVORITED]: booleanSchema,
  [DBField.PREVIOUS_CHILD]: previousChildSchema,
})

const parentOptionalSchema = parentSchema.deepPartial()
type ParentParams = z.infer<typeof parentOptionalSchema>

export class Parent extends Entity {
  [DBField.NAME]?: string;
  [DBField.DESC]?: string;
  [DBField.ENABLED]?: boolean;
  [DBField.FAVORITED]?: boolean;
  [DBField.PREVIOUS_CHILD]?: AnyDBRecord

  constructor({
    id,
    createdTimestamp,
    activated,
    name,
    desc,
    enabled,
    favorited,
    previousChild,
  }: ParentParams) {
    super({ id, createdTimestamp, activated })
    this.name = name
    this.desc = desc
    this.enabled = enabled
    this.favorited = favorited
    this.previousChild = previousChild
  }

  static getInspectionItems(): InspectionItem[] {
    return [
      ...Entity.getInspectionItems(),
      {
        field: DBField.NAME,
        label: 'Name',
        output: 'single',
        format: (val: string) => `${val || '-'}`,
      },
      {
        field: DBField.DESC,
        label: 'Description',
        output: 'single',
        format: (val: string) => `${val || '-'}`,
      },
      {
        field: DBField.ENABLED,
        label: 'Enabled',
        output: 'single',
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
      {
        field: DBField.FAVORITED,
        label: 'Favorited',
        output: 'single',
        format: (val: boolean) => (val ? 'Yes' : 'No'),
      },
      {
        field: DBField.PREVIOUS_CHILD,
        label: 'Last Record Date',
        output: 'single',
        format: (val: AnyDBRecord) =>
          val?.createdTimestamp ? getDisplayDate(val.createdTimestamp) : 'No previous records',
      },
    ]
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
        name: DBField.PREVIOUS_CHILD,
        label: 'Last Record Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[DBField.PREVIOUS_CHILD],
        format: (val: AnyDBRecord) =>
          val?.createdTimestamp ? getDisplayDate(val.createdTimestamp) : 'No previous records',
      },
    ]
  }
}
