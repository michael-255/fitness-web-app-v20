import type { Exercise } from '@/models/Exercise'
import type { ExerciseResult } from '@/models/ExerciseResult'
import type { Log } from '@/models/Log'
import type { Measurement } from '@/models/Measurement'
import type { MeasurementResult } from '@/models/MeasurementResult'
import type { Setting } from '@/models/Setting'
import type { Workout } from '@/models/Workout'
import type { WorkoutResult } from '@/models/WorkoutResult'
import { z } from 'zod'

export enum InternalTable {
  SETTINGS = 'settings',
  LOGS = 'logs',
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
  WORKOUTS = 'workouts',
  EXERCISES = 'exercises',
  MEASUREMENTS = 'measurements',
  WORKOUT_RESULTS = 'workout-results',
  EXERCISE_RESULTS = 'exercise-results',
  MEASUREMENT_RESULTS = 'measurement-results',
}

export type ParentTable = DBTable.WORKOUTS | DBTable.EXERCISES | DBTable.MEASUREMENTS
export type ChildTable =
  | DBTable.WORKOUT_RESULTS
  | DBTable.EXERCISE_RESULTS
  | DBTable.MEASUREMENT_RESULTS

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
  PREVIOUS_CHILD = 'previousChild',

  // Child
  PARENT_ID = 'parentId',
  NOTE = 'note',

  // Workout
  EXERCISE_IDS = 'exerciseIds',

  // Exercise
  EXERCISE_INPUTS = 'exerciseInputs',
  MULTIPLE_SETS = 'multipleSets',

  // Measurement
  MEASUREMENT_INPUT = 'measurementInput',

  // Workout Result
  FINISHED_TIMESTAMP = 'finishedTimestamp',
  EXERCISE_RESULT_IDS = 'exerciseResultIds',

  // Exercise Result
  REPS = 'reps',
  WEIGHT = 'weightLbs',
  DISTANCE = 'distanceMiles',
  DURATION = 'durationMinutes',
  WATTS = 'watts',
  SPEED = 'speedMph',
  RESISTANCE = 'resistance',
  INCLINE = 'incline',
  CALORIES = 'calories',

  // Measurement Result
  BODY_WEIGHT = 'bodyWeight',
  PERCENT = 'percent',
  INCHES = 'inches',
  NUMBER = 'number',
}

export type AnyDBRecord = { [key in DBField | InternalField]?: any }

export type BackupData = {
  appName: string
  databaseVersion: number
  [DBField.CREATED_TIMESTAMP]: number
  [InternalTable.SETTINGS]: Setting[]
  [InternalTable.LOGS]: Log[]
  [DBTable.WORKOUTS]: Workout[]
  [DBTable.EXERCISES]: Exercise[]
  [DBTable.MEASUREMENTS]: Measurement[]
  [DBTable.WORKOUT_RESULTS]: WorkoutResult[]
  [DBTable.EXERCISE_RESULTS]: ExerciseResult[]
  [DBTable.MEASUREMENT_RESULTS]: MeasurementResult[]
}

export type InspectionItem = {
  field: keyof AnyDBRecord
  label: string
  output: 'single' | 'list' | 'key-values'
  format: (val: any) => any
}
