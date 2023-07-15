import type { Example } from '@/models/Example'
import type { ExampleResult } from '@/models/ExampleResults'
import type { Log } from '@/models/Log'
import type { Setting } from '@/models/Setting'
import type { Test } from '@/models/Test'
import type { TestResult } from '@/models/TestResults'
import { z } from 'zod'

export enum InternalTable {
  SETTINGS = 'Settings',
  LOGS = 'Logs',
}

export enum InternalField {
  // Setting
  KEY = 'key',
  VALUE = 'value',

  // Log
  AUTO_ID = 'autoId',
  TIMESTAMP = 'timestamp',
  LOG_LEVEL = 'logLevel',
  LABEL = 'label',
  DETAILS = 'details',
  ERROR_MESSAGE = 'errorMessage',
  STACK_TRACE = 'stackTrace',
}

/**
 * First table must be a Parent table for UI store dashboard selection default
 */
export enum DBTable {
  EXAMPLES = 'Examples',
  EXAMPLE_RESULTS = 'ExampleResults',
  TESTS = 'Tests',
  TEST_RESULTS = 'TestResults',
}

export type ParentTable = DBTable.EXAMPLES | DBTable.TESTS
export type ChildTable = DBTable.EXAMPLE_RESULTS | DBTable.TEST_RESULTS

export const tableSchema = z.nativeEnum(DBTable)

export enum DBField {
  // Entity
  ID = 'id',
  CREATED_TIMESTAMP = 'createdTimestamp',
  ACTIVATED = 'activated',

  // Parent
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  PREVIOUS = 'previous',

  // Child
  PARENT_ID = 'parentId',
  NOTE = 'note',

  // Example Parent
  TEST_IDS = 'testIds',

  // Example Child Data
  PERCENT = 'percent',

  // Test Parent
  // ...

  // Test Child Data
  // ...
}

export type AnyDBRecord = { [key in DBField | InternalField]?: any }

export type BackupData = {
  appName: string
  databaseVersion: number
  [DBField.CREATED_TIMESTAMP]: number
  [InternalTable.SETTINGS]: Setting[]
  [InternalTable.LOGS]: Log[]
  [DBTable.EXAMPLES]: Example[]
  [DBTable.EXAMPLE_RESULTS]: ExampleResult[]
  [DBTable.TESTS]: Test[]
  [DBTable.TEST_RESULTS]: TestResult[]
}
