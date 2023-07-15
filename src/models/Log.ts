import { InternalField } from '@/types/database'
import { createdTimestampSchema } from '@/models/_Entity'
import type { QTableColumn } from 'quasar'
import { getDisplayDate, truncateString } from '@/utils/common'
import { z } from 'zod'
import { defineAsyncComponent } from 'vue'

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export const logDetailsSchema = z.record(z.any()).optional()
export type LogDetails = z.infer<typeof logDetailsSchema>

export const logSchema = z.object({
  [InternalField.AUTO_ID]: z.any().optional(), // Dexie handles the auto incrementing id
  [InternalField.TIMESTAMP]: createdTimestampSchema,
  [InternalField.LOG_LEVEL]: z.nativeEnum(LogLevel),
  [InternalField.LABEL]: z.string().trim(),
  [InternalField.DETAILS]: logDetailsSchema,
  [InternalField.ERROR_MESSAGE]: z.string().trim().optional(),
  [InternalField.STACK_TRACE]: z.string().trim().optional(),
})

export class Log {
  [InternalField.AUTO_ID]?: any; // Dexie handles the auto incrementing id
  [InternalField.TIMESTAMP]!: number;
  [InternalField.LOG_LEVEL]!: LogLevel;
  [InternalField.LABEL]!: string;
  [InternalField.DETAILS]?: LogDetails;
  [InternalField.ERROR_MESSAGE]?: string;
  [InternalField.STACK_TRACE]?: string

  constructor(logLevel: LogLevel, label: string, details: LogDetails) {
    this.timestamp = Date.now()
    this.logLevel = logLevel
    this.label = label

    if (details && typeof details === 'object') {
      if ('message' in details || 'stack' in details) {
        // An object with a message or stack property is a JS Error
        this.errorMessage = details.message
        this.stackTrace = details.stack
        this.details = undefined
      } else {
        // Should be safe to store most other objects into the details property
        // Details only used with non-error logs
        this.details = details
      }
    }
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Log' : 'Logs'
  }

  static getFieldComponents(): ReturnType<typeof defineAsyncComponent>[] {
    return [
      defineAsyncComponent(() => import('@/components/fields/FieldAutoId.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldCreatedTimestamp.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldLogLevel.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldLogLabel.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldDetails.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldErrorMessage.vue')),
      defineAsyncComponent(() => import('@/components/fields/FieldStackTrace.vue')),
    ]
  }

  static getTableColumns(): QTableColumn[] {
    return [
      {
        name: 'hiddenAutoId', // Needed in QTable row props
        label: '',
        align: 'left',
        sortable: false,
        required: true,
        field: (row: any) => row[InternalField.AUTO_ID],
        format: (val: string) => `${val}`,
        style: 'display: none', // Hide column in QTable
      },
      {
        name: InternalField.AUTO_ID,
        label: 'Auto Id',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[InternalField.AUTO_ID],
        format: (val: number) => `${val}`,
      },
      {
        name: InternalField.LOG_LEVEL,
        label: 'Log Level',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[InternalField.LOG_LEVEL],
        format: (val: LogLevel) => `${val}`,
      },
      {
        name: InternalField.TIMESTAMP,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[InternalField.TIMESTAMP],
        format: (val: number) => getDisplayDate(val),
      },
      {
        name: InternalField.LABEL,
        label: 'Label',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[InternalField.LABEL],
        format: (val: string) => truncateString(val, 50, '...'),
      },
      {
        name: InternalField.DETAILS,
        label: 'Details',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[InternalField.DETAILS],
        format: (val: LogDetails) => truncateString(JSON.stringify(val), 50, '...'),
      },
      {
        name: InternalField.ERROR_MESSAGE,
        label: 'Error Message',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[InternalField.ERROR_MESSAGE],
        format: (val: string) => truncateString(val, 50, '...'),
      },
      {
        name: InternalField.STACK_TRACE,
        label: 'Stack Trace',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[InternalField.STACK_TRACE],
        format: (val: string) => truncateString(val, 50, '...'),
      },
    ]
  }
}
