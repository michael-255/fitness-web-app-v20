import Dexie, { liveQuery, type Table } from 'dexie'
import { Dark, uid } from 'quasar'
import { Duration } from '@/types/general'
import { AppDatabaseVersion, AppName } from '@/constants/global'
import {
  type ParentTable,
  type ChildTable,
  type AnyDBRecord,
  DBTable,
  DBField,
  InternalTable,
  InternalField,
  type BackupData,
} from '@/types/database'
import { Setting, SettingKey, settingSchema, type SettingValue } from '@/models/Setting'
import { Log, LogLevel, logSchema, type LogDetails } from '@/models/Log'
import type { z } from 'zod'
import { truncateString } from '@/utils/common'
import { Workout, workoutSchema } from '@/models/Workout'
import { WorkoutResult, workoutResultSchema } from '@/models/WorkoutResult'
import { Exercise, ExerciseInput, exerciseSchema } from '@/models/Exercise'
import { ExerciseResult, exerciseResultSchema } from '@/models/ExerciseResult'
import { Measurement, measurementSchema } from '@/models/Measurement'
import { MeasurementResult, measurementResultSchema } from '@/models/MeasurementResult'

class Database extends Dexie {
  // Required for easier TypeScript usage
  [InternalTable.SETTINGS]!: Table<Setting>;
  [InternalTable.LOGS]!: Table<Log>;
  [DBTable.WORKOUTS]!: Table<Workout>;
  [DBTable.EXERCISES]!: Table<Exercise>;
  [DBTable.MEASUREMENTS]!: Table<Measurement>;
  [DBTable.WORKOUT_RESULTS]!: Table<WorkoutResult>;
  [DBTable.EXERCISE_RESULTS]!: Table<ExerciseResult>;
  [DBTable.MEASUREMENT_RESULTS]!: Table<MeasurementResult>

  constructor(name: string) {
    super(name)

    this.version(1).stores({
      [InternalTable.SETTINGS]: `&${InternalField.KEY}`,
      [InternalTable.LOGS]: `++${InternalField.AUTO_ID}`,
      [DBTable.WORKOUTS]: `&${DBField.ID}, ${DBField.NAME}`,
      [DBTable.EXERCISES]: `&${DBField.ID}, ${DBField.NAME}`,
      [DBTable.MEASUREMENTS]: `&${DBField.ID}, ${DBField.NAME}`,
      [DBTable.WORKOUT_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}, ${DBField.CREATED_TIMESTAMP}`,
      [DBTable.EXERCISE_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}, ${DBField.CREATED_TIMESTAMP}`,
      [DBTable.MEASUREMENT_RESULTS]: `&${DBField.ID}, ${DBField.PARENT_ID}, ${DBField.CREATED_TIMESTAMP}`,
    })

    // Required
    this[InternalTable.SETTINGS].mapToClass(Setting)
    this[InternalTable.LOGS].mapToClass(Log)
    this[DBTable.WORKOUTS].mapToClass(Workout)
    this[DBTable.EXERCISES].mapToClass(Exercise)
    this[DBTable.MEASUREMENTS].mapToClass(Measurement)
    this[DBTable.WORKOUT_RESULTS].mapToClass(WorkoutResult)
    this[DBTable.EXERCISE_RESULTS].mapToClass(ExerciseResult)
    this[DBTable.MEASUREMENT_RESULTS].mapToClass(MeasurementResult)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Data Properties                                                     //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  getParentTable(table: DBTable): ParentTable {
    return {
      [DBTable.WORKOUTS]: DBTable.WORKOUTS as ParentTable,
      [DBTable.EXERCISES]: DBTable.EXERCISES as ParentTable,
      [DBTable.MEASUREMENTS]: DBTable.MEASUREMENTS as ParentTable,
      [DBTable.WORKOUT_RESULTS]: DBTable.WORKOUTS as ParentTable,
      [DBTable.EXERCISE_RESULTS]: DBTable.EXERCISES as ParentTable,
      [DBTable.MEASUREMENT_RESULTS]: DBTable.MEASUREMENTS as ParentTable,
    }[table]
  }

  getChildTable(table: DBTable): ChildTable {
    return {
      [DBTable.WORKOUTS]: DBTable.WORKOUT_RESULTS as ChildTable,
      [DBTable.EXERCISES]: DBTable.EXERCISE_RESULTS as ChildTable,
      [DBTable.MEASUREMENTS]: DBTable.MEASUREMENT_RESULTS as ChildTable,
      [DBTable.WORKOUT_RESULTS]: DBTable.WORKOUT_RESULTS as ChildTable,
      [DBTable.EXERCISE_RESULTS]: DBTable.EXERCISE_RESULTS as ChildTable,
      [DBTable.MEASUREMENT_RESULTS]: DBTable.MEASUREMENT_RESULTS as ChildTable,
    }[table]
  }

  getLabel(table: DBTable, style: 'singular' | 'plural') {
    return {
      [DBTable.WORKOUTS]: Workout.getLabel(style),
      [DBTable.EXERCISES]: Exercise.getLabel(style),
      [DBTable.MEASUREMENTS]: Measurement.getLabel(style),
      [DBTable.WORKOUT_RESULTS]: WorkoutResult.getLabel(style),
      [DBTable.EXERCISE_RESULTS]: ExerciseResult.getLabel(style),
      [DBTable.MEASUREMENT_RESULTS]: MeasurementResult.getLabel(style),
    }[table]
  }

  getFieldComponents(table: DBTable) {
    return {
      [DBTable.WORKOUTS]: Workout.getFieldComponents(),
      [DBTable.EXERCISES]: Exercise.getFieldComponents(),
      [DBTable.MEASUREMENTS]: Measurement.getFieldComponents(),
      [DBTable.WORKOUT_RESULTS]: WorkoutResult.getFieldComponents(),
      [DBTable.EXERCISE_RESULTS]: ExerciseResult.getFieldComponents(),
      [DBTable.MEASUREMENT_RESULTS]: MeasurementResult.getFieldComponents(),
    }[table]
  }

  getChartComponents(parentTable: ParentTable) {
    return {
      [DBTable.WORKOUTS]: Workout.getChartComponents(),
      [DBTable.EXERCISES]: Exercise.getChartComponents(),
      [DBTable.MEASUREMENTS]: Measurement.getChartComponents(),
    }[parentTable]
  }

  getInspectionItems(table: DBTable) {
    return {
      [DBTable.WORKOUTS]: Workout.getInspectionItems(),
      [DBTable.EXERCISES]: Exercise.getInspectionItems(),
      [DBTable.MEASUREMENTS]: Measurement.getInspectionItems(),
      [DBTable.WORKOUT_RESULTS]: WorkoutResult.getInspectionItems(),
      [DBTable.EXERCISE_RESULTS]: ExerciseResult.getInspectionItems(),
      [DBTable.MEASUREMENT_RESULTS]: MeasurementResult.getInspectionItems(),
    }[table]
  }

  getTableColumns(table: DBTable) {
    return {
      [DBTable.WORKOUTS]: Workout.getTableColumns(),
      [DBTable.EXERCISES]: Exercise.getTableColumns(),
      [DBTable.MEASUREMENTS]: Measurement.getTableColumns(),
      [DBTable.WORKOUT_RESULTS]: WorkoutResult.getTableColumns(),
      [DBTable.EXERCISE_RESULTS]: ExerciseResult.getTableColumns(),
      [DBTable.MEASUREMENT_RESULTS]: MeasurementResult.getTableColumns(),
    }[table]
  }

  getFieldForInput(exerciseInput: ExerciseInput) {
    return {
      [ExerciseInput.REPS]: DBField.REPS,
      [ExerciseInput.WEIGHT]: DBField.WEIGHT,
      [ExerciseInput.DISTANCE]: DBField.DISTANCE,
      [ExerciseInput.DURATION]: DBField.DURATION,
      [ExerciseInput.WATTS]: DBField.WATTS,
      [ExerciseInput.SPEED]: DBField.SPEED,
      [ExerciseInput.RESISTANCE]: DBField.RESISTANCE,
      [ExerciseInput.INCLINE]: DBField.INCLINE,
      [ExerciseInput.CALORIES]: DBField.CALORIES,
    }[exerciseInput]
  }

  getDefaultActionRecord(table: DBTable) {
    return {
      [DBTable.WORKOUTS]: new Workout({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        name: '',
        desc: '',
        enabled: true,
        favorited: false,
        previousChild: undefined,
        exerciseIds: [],
      }),
      [DBTable.EXERCISES]: new Exercise({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        name: '',
        desc: '',
        enabled: true,
        favorited: false,
        previousChild: undefined,
        exerciseInputs: [],
        multipleSets: true,
      }),
      [DBTable.MEASUREMENTS]: new Measurement({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        name: '',
        desc: '',
        enabled: true,
        favorited: false,
        previousChild: undefined,
        measurementInput: undefined,
      }),
      [DBTable.WORKOUT_RESULTS]: new WorkoutResult({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        parentId: undefined,
        note: '',
        finishedTimestamp: undefined,
        exerciseResultIds: [],
      }),
      [DBTable.EXERCISE_RESULTS]: new ExerciseResult({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        parentId: undefined,
        note: '',
        reps: undefined,
        weightLbs: undefined,
        distanceMiles: undefined,
        durationMinutes: undefined,
        watts: undefined,
        speedMph: undefined,
        resistance: undefined,
        incline: undefined,
        calories: undefined,
      }),
      [DBTable.MEASUREMENT_RESULTS]: new MeasurementResult({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: false,
        parentId: undefined,
        note: '',
        bodyWeight: undefined,
        percent: undefined,
        inches: undefined,
        number: undefined,
      }),
    }[table]
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Settings (internal)                                                 //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getSetting(key: SettingKey) {
    return await this.table(InternalTable.SETTINGS).get(key)
  }

  async getSettingValue(key: SettingKey) {
    return (await this.table(InternalTable.SETTINGS).get(key))?.value
  }

  async initSettings() {
    const defaultSettings: Readonly<{
      [key in SettingKey]: SettingValue
    }> = {
      [SettingKey.USER_HEIGHT_INCHES]: undefined,
      [SettingKey.WELCOME_OVERLAY]: true,
      [SettingKey.DASHBOARD_DESCRIPTIONS]: true,
      [SettingKey.DARK_MODE]: true,
      [SettingKey.CONSOLE_LOGS]: false,
      [SettingKey.INFO_MESSAGES]: true,
      [SettingKey.LOG_RETENTION_DURATION]: Duration['Three Months'],
    }

    const keys = Object.values(SettingKey)

    const settings = await Promise.all(
      keys.map(async (key) => {
        const setting = await this.table(InternalTable.SETTINGS).get(key)

        if (setting) {
          return setting
        } else {
          return { key, value: defaultSettings[key] }
        }
      })
    )

    Dark.set(Boolean(settings.find((s) => s.key === SettingKey.DARK_MODE)?.value))

    await Promise.all(settings.map((s) => this.setSetting(s.key, s.value)))
  }

  async setSetting(key: SettingKey, value: SettingValue) {
    if (key === SettingKey.DARK_MODE) {
      Dark.set(Boolean(value))
    }
    return await this.table(InternalTable.SETTINGS).put(settingSchema.parse({ key, value }))
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Logs (internal)                                                     //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getLog(autoId: number) {
    return await this.table(InternalTable.LOGS).get(autoId)
  }

  async addLog(logLevel: LogLevel, logLabel: string, details?: LogDetails) {
    const log = new Log(logLevel, logLabel, details)
    return await this.table(InternalTable.LOGS).add(logSchema.parse(log))
  }

  async purgeLogs() {
    const logDuration = (
      await this.table(InternalTable.SETTINGS).get(SettingKey.LOG_RETENTION_DURATION)
    )?.value as Duration

    if (!logDuration || logDuration === Duration.Forever) {
      return 0 // No logs purged
    }

    const logs = await this.table(InternalTable.LOGS).toArray()

    // Find Logs that are older than the retention time and map them to their keys
    const removableLogs = logs
      .filter((log: Log) => {
        const logTimestamp = log.timestamp ?? 0
        const logAge = Date.now() - logTimestamp
        return logAge > logDuration
      })
      .map((log: Log) => log.autoId) // Map remaining Log ids for removal

    await this.table(InternalTable.LOGS).bulkDelete(removableLogs)

    return removableLogs.length // Number of logs deleted
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Live Queries                                                        //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  liveSettings() {
    return liveQuery(() => this.table(InternalTable.SETTINGS).toArray())
  }

  liveLogs() {
    return liveQuery(() =>
      this.table(InternalTable.LOGS).orderBy(InternalField.AUTO_ID).reverse().toArray()
    )
  }

  private _sortDashboardData<T extends AnyDBRecord>(records: T[]) {
    const active: T[] = []
    const favorites: T[] = []
    const nonFavorites: T[] = []

    records.forEach((i) => {
      if (i.activated) {
        active.push(i)
      } else if (i.favorited === true) {
        favorites.push(i)
      } else {
        nonFavorites.push(i)
      }
    })

    return [...active, ...favorites, ...nonFavorites]
  }

  liveDashboardData<T extends AnyDBRecord>(parentTable: ParentTable) {
    return liveQuery(async () => {
      return this._sortDashboardData<T>(
        await this.table(parentTable)
          .orderBy(DBField.NAME)
          .filter((i) => i.enabled === true)
          .toArray()
      )
    })
  }

  private async _getParentDataTable<T extends AnyDBRecord>(parentTable: ParentTable): Promise<T[]> {
    return await this.table(parentTable)
      .orderBy(DBField.NAME)
      .filter((i) => i.activated !== true)
      .toArray()
  }

  private async _getChildDataTable<T extends AnyDBRecord>(childTable: ChildTable): Promise<T[]> {
    return await this.table(childTable)
      .orderBy(DBField.CREATED_TIMESTAMP)
      .reverse()
      .filter((i) => i.activated !== true)
      .toArray()
  }

  liveDataTable(table: DBTable) {
    return liveQuery(async () => {
      return {
        [DBTable.WORKOUTS]: async () => this._getParentDataTable<Workout>(DBTable.WORKOUTS),
        [DBTable.WORKOUT_RESULTS]: async () =>
          this._getChildDataTable<WorkoutResult>(DBTable.WORKOUT_RESULTS),
        [DBTable.EXERCISES]: async () => this._getParentDataTable<Exercise>(DBTable.EXERCISES),
        [DBTable.EXERCISE_RESULTS]: async () =>
          this._getChildDataTable<ExerciseResult>(DBTable.EXERCISE_RESULTS),
        [DBTable.MEASUREMENTS]: async () =>
          this._getParentDataTable<Measurement>(DBTable.MEASUREMENTS),
        [DBTable.MEASUREMENT_RESULTS]: async () =>
          this._getChildDataTable<MeasurementResult>(DBTable.MEASUREMENT_RESULTS),
      }[table]()
    })
  }

  liveActiveWorkout() {
    return liveQuery(async () => {
      const { parentWorkout, parentExercises, workoutResult, exerciseResults } =
        await this.getActiveWorkout()

      return {
        parentWorkout,
        parentExercises,
        workoutResult,
        exerciseResults,
      }
    })
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Gets                                                                //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  async getRecord<T extends AnyDBRecord>(table: DBTable, id: string): Promise<T | undefined> {
    return await this.table(table).get(id)
  }

  async getAll<T extends AnyDBRecord>(table: DBTable): Promise<T[]> {
    return await this.table(table).toArray()
  }

  async getSortedChildren<T extends AnyDBRecord>(
    childTable: ChildTable,
    parentId: string
  ): Promise<T[]> {
    return (
      await this.table(childTable)
        .where(DBField.PARENT_ID)
        .equals(parentId)
        .sortBy(DBField.CREATED_TIMESTAMP)
    ).filter((w) => w.activated !== true)
  }

  private async _getLastParentChild<T extends AnyDBRecord>(
    childTable: ChildTable,
    id: string
  ): Promise<T | undefined> {
    return (
      await this.table(childTable)
        .where(DBField.PARENT_ID)
        .equals(id)
        .sortBy(DBField.CREATED_TIMESTAMP)
    ).reverse()[0]
  }

  async getLastChild(parentTable: ParentTable, id: string) {
    return await {
      [DBTable.WORKOUTS]: async () =>
        this._getLastParentChild<WorkoutResult>(DBTable.WORKOUT_RESULTS, id),
      [DBTable.EXERCISES]: async () =>
        this._getLastParentChild<ExerciseResult>(DBTable.EXERCISE_RESULTS, id),
      [DBTable.MEASUREMENTS]: async () =>
        this._getLastParentChild<MeasurementResult>(DBTable.MEASUREMENT_RESULTS, id),
    }[parentTable]()
  }

  private cleanParents<T extends AnyDBRecord>(records: T[]) {
    return records.map((r) => {
      delete r.previousChild
      delete r.activated
      return r
    })
  }

  private cleanChildren<T extends AnyDBRecord>(records: T[]) {
    return records.map((r) => {
      delete r.activated
      return r
    })
  }

  async getBackupData() {
    const backupData: BackupData = {
      appName: AppName,
      databaseVersion: AppDatabaseVersion,
      createdTimestamp: Date.now(),
      [InternalTable.SETTINGS]: await this.table(InternalTable.SETTINGS).toArray(),
      [InternalTable.LOGS]: await this.table(InternalTable.LOGS).toArray(),
      [DBTable.WORKOUTS]: this.cleanParents<Workout>(await this.table(DBTable.WORKOUTS).toArray()),
      [DBTable.EXERCISES]: this.cleanParents<Exercise>(
        await this.table(DBTable.EXERCISES).toArray()
      ),
      [DBTable.MEASUREMENTS]: this.cleanParents<Measurement>(
        await this.table(DBTable.MEASUREMENTS).toArray()
      ),
      [DBTable.WORKOUT_RESULTS]: this.cleanChildren<WorkoutResult>(
        await this.table(DBTable.WORKOUT_RESULTS).toArray()
      ),
      [DBTable.EXERCISE_RESULTS]: this.cleanChildren<ExerciseResult>(
        await this.table(DBTable.EXERCISE_RESULTS).toArray()
      ),
      [DBTable.MEASUREMENT_RESULTS]: this.cleanChildren<MeasurementResult>(
        await this.table(DBTable.MEASUREMENT_RESULTS).toArray()
      ),
    }

    return backupData
  }

  async getParentIdOptions(
    parentTable: ParentTable
  ): Promise<{ value: string; label: string; disable: boolean }[]> {
    const records = await this.table(parentTable).orderBy(DBField.NAME).toArray()

    return records.map((r: AnyDBRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 8, '*')})`,
      disable: r.activated,
    }))
  }

  async getExerciseIdOptions(): Promise<{ value: string; label: string; disable: boolean }[]> {
    const records = await this.table(DBTable.EXERCISES).orderBy(DBField.NAME).toArray()

    return records.map((r: AnyDBRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 8, '*')})`,
      disable: r.activated,
    }))
  }

  async getExerciseResultIdOptions(): Promise<
    { value: string; label: string; disable: boolean }[]
  > {
    const records = await this.table(DBTable.EXERCISE_RESULTS)
      .orderBy(DBField.CREATED_TIMESTAMP)
      .reverse()
      .toArray()

    return records.map((r: AnyDBRecord) => ({
      value: r.id,
      label: r.id,
      disable: r.activated,
    }))
  }

  async getActiveWorkout() {
    const parentWorkout: Workout = (await this.table(DBTable.WORKOUTS).toArray()).filter(
      (w) => w.activated === true
    )[0] // Should only be one
    const parentExercises: Exercise[] = (await this.table(DBTable.EXERCISES).toArray()).filter(
      (e) => e.activated === true
    )

    const exerciseIds = parentWorkout?.exerciseIds ?? []

    // Sort the parent exercises
    if (exerciseIds) {
      parentExercises.sort((a, b) => {
        const aIndex = exerciseIds.indexOf(a.id as string)
        const bIndex = exerciseIds.indexOf(b.id as string)
        return aIndex - bIndex
      })
    }

    const workoutResult: WorkoutResult = (
      await this.table(DBTable.WORKOUT_RESULTS).toArray()
    ).filter((wr) => wr.activated === true)[0] // Should only be one
    const exerciseResults: ExerciseResult[] = (
      await this.table(DBTable.EXERCISE_RESULTS).toArray()
    ).filter((er) => er.activated === true)

    const exerciseResultIds = workoutResult?.exerciseResultIds ?? []

    // Sort the exercise results
    if (exerciseResultIds) {
      exerciseResults.sort((a, b) => {
        const aIndex = exerciseResultIds.indexOf(a.id as string)
        const bIndex = exerciseResultIds.indexOf(b.id as string)
        return aIndex - bIndex
      })
    }

    return {
      parentWorkout,
      parentExercises,
      workoutResult,
      exerciseResults,
    }
  }

  async isActiveWorkout() {
    const { parentWorkout, parentExercises, workoutResult, exerciseResults } =
      await this.getActiveWorkout()

    return Boolean(
      parentWorkout || parentExercises.length > 0 || workoutResult || exerciseResults.length > 0
    )
  }

  async getPreviousExerciseResults(parentExerciseId: string) {
    return (
      await this.table(DBTable.EXERCISE_RESULTS)
        .where(DBField.PARENT_ID)
        .equals(parentExerciseId)
        .sortBy(DBField.CREATED_TIMESTAMP)
    )
      .filter((i) => i.activated !== true)
      .reverse()
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Creates                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  private async _addParent(
    parentTable: ParentTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(parentTable).add(schema.parse(record))
    return await this.updatePrevious(parentTable, record.id)
  }

  private async _addChild(
    childTable: ChildTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(childTable).add(schema.parse(record))
    const parentTable = this.getParentTable(childTable)
    return await this.updatePrevious(parentTable, record.parentId)
  }

  async addRecord(table: DBTable, record: AnyDBRecord) {
    return await {
      [DBTable.WORKOUTS]: async () => this._addParent(DBTable.WORKOUTS, record, workoutSchema),
      [DBTable.EXERCISES]: async () => this._addParent(DBTable.EXERCISES, record, exerciseSchema),
      [DBTable.MEASUREMENTS]: async () =>
        this._addParent(DBTable.MEASUREMENTS, record, measurementSchema),
      [DBTable.WORKOUT_RESULTS]: async () =>
        this._addChild(DBTable.WORKOUT_RESULTS, record, workoutResultSchema),
      [DBTable.EXERCISE_RESULTS]: async () =>
        this._addChild(DBTable.EXERCISE_RESULTS, record, exerciseResultSchema),
      [DBTable.MEASUREMENT_RESULTS]: async () =>
        this._addChild(DBTable.MEASUREMENT_RESULTS, record, measurementResultSchema),
    }[table]()
  }

  private async processImport(
    table: DBTable,
    records: AnyDBRecord[],
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    const validRecords: AnyDBRecord[] = []
    const skippedRecords: AnyDBRecord[] = []

    records.forEach((r) => {
      if (schema.safeParse(r).success) {
        validRecords.push(schema.parse(r))
      } else {
        skippedRecords.push(r)
      }
    })

    await this.table(table).bulkAdd(validRecords)
    const parentTable = this.getParentTable(table)
    await this.updateAllPrevious(parentTable)

    return skippedRecords
  }

  async importRecords(table: DBTable, records: AnyDBRecord[]) {
    const skippedRecords = await {
      [DBTable.WORKOUTS]: async () => this.processImport(DBTable.WORKOUTS, records, workoutSchema),
      [DBTable.EXERCISES]: async () =>
        this.processImport(DBTable.EXERCISES, records, exerciseSchema),
      [DBTable.MEASUREMENTS]: async () =>
        this.processImport(DBTable.MEASUREMENTS, records, measurementSchema),
      [DBTable.WORKOUT_RESULTS]: async () =>
        this.processImport(DBTable.WORKOUT_RESULTS, records, workoutResultSchema),
      [DBTable.EXERCISE_RESULTS]: async () =>
        this.processImport(DBTable.EXERCISE_RESULTS, records, exerciseResultSchema),
      [DBTable.MEASUREMENT_RESULTS]: async () =>
        this.processImport(DBTable.MEASUREMENT_RESULTS, records, measurementResultSchema),
    }[table]()

    if (skippedRecords.length > 0) {
      // Error for the frontend to report if any records were skipped
      throw new Error(
        `Records skipped due to validation failures (${
          skippedRecords.length
        }): ${skippedRecords.map((r) => String(r.id))}`
      )
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Updates                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  private async _putParent(
    parentTable: ParentTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(parentTable).put(schema.parse(record))
    return await this.updatePrevious(parentTable, record.id)
  }

  private async _putChild(
    childTable: ChildTable,
    record: AnyDBRecord,
    schema: z.ZodObject<any, any, any> | z.ZodEffects<any, any, any>
  ) {
    await this.table(childTable).put(schema.parse(record))
    const parentTable = this.getParentTable(childTable)
    return await this.updatePrevious(parentTable, record.parentId)
  }

  async putRecord(table: DBTable, record: AnyDBRecord) {
    return await {
      [DBTable.WORKOUTS]: async () => this._putParent(DBTable.WORKOUTS, record, workoutSchema),
      [DBTable.EXERCISES]: async () => this._putParent(DBTable.EXERCISES, record, exerciseSchema),
      [DBTable.MEASUREMENTS]: async () =>
        this._putParent(DBTable.MEASUREMENTS, record, measurementSchema),
      [DBTable.WORKOUT_RESULTS]: async () =>
        this._putChild(DBTable.WORKOUT_RESULTS, record, workoutResultSchema),
      [DBTable.EXERCISE_RESULTS]: async () =>
        this._putChild(DBTable.EXERCISE_RESULTS, record, exerciseResultSchema),
      [DBTable.MEASUREMENT_RESULTS]: async () =>
        this._putChild(DBTable.MEASUREMENT_RESULTS, record, measurementResultSchema),
    }[table]()
  }

  async updatePrevious(parentTable: ParentTable, id: string) {
    const childTable = this.getChildTable(parentTable)

    const previousChild = (
      await this.table(childTable)
        .where(DBField.PARENT_ID)
        .equals(id)
        .sortBy(DBField.CREATED_TIMESTAMP)
    )
      .filter((i) => i.activated !== true)
      .reverse()[0] as AnyDBRecord | undefined

    return await this.table(parentTable).update(id, { previousChild })
  }

  async updateAllPrevious(parentTable: ParentTable) {
    const records = await this.table(parentTable).toArray()
    return await Promise.all(records.map((i) => this.updatePrevious(parentTable, i.id)))
  }

  async toggleFavorite(parentTable: ParentTable, id: string) {
    const record = (await this.getRecord(parentTable, id)) as AnyDBRecord | undefined

    if (record && record.favorited !== undefined) {
      record.favorited = !record.favorited
      return await this.putRecord(parentTable, record)
    }
  }

  async beginWorkout(workoutId: string) {
    const parentWorkout = await this.table(DBTable.WORKOUTS).get(workoutId)
    const parentExercises = await Promise.all(
      parentWorkout.exerciseIds.map(
        async (id: string) => await this.table(DBTable.EXERCISES).get(id)
      )
    )

    // Activate parent records
    parentWorkout.activated = true
    await this.table(DBTable.WORKOUTS).put(parentWorkout)
    parentExercises.forEach((pe: Exercise) => (pe.activated = true))
    await this.table(DBTable.EXERCISES).bulkPut(parentExercises)

    // Create new child records
    const exerciseResults = parentExercises.map((pe: Exercise) => {
      return new ExerciseResult({
        id: uid(),
        createdTimestamp: Date.now(),
        activated: true,
        parentId: pe.id,
        note: '',
        reps: pe.exerciseInputs?.includes(ExerciseInput.REPS)
          ? ([null] as unknown as number[])
          : undefined,
        weightLbs: pe.exerciseInputs?.includes(ExerciseInput.WEIGHT)
          ? ([null] as unknown as number[])
          : undefined,
        distanceMiles: pe.exerciseInputs?.includes(ExerciseInput.DISTANCE)
          ? ([null] as unknown as number[])
          : undefined,
        durationMinutes: pe.exerciseInputs?.includes(ExerciseInput.DURATION)
          ? ([null] as unknown as number[])
          : undefined,
        watts: pe.exerciseInputs?.includes(ExerciseInput.WATTS)
          ? ([null] as unknown as number[])
          : undefined,
        speedMph: pe.exerciseInputs?.includes(ExerciseInput.SPEED)
          ? ([null] as unknown as number[])
          : undefined,
        resistance: pe.exerciseInputs?.includes(ExerciseInput.RESISTANCE)
          ? ([null] as unknown as number[])
          : undefined,
        incline: pe.exerciseInputs?.includes(ExerciseInput.INCLINE)
          ? ([null] as unknown as number[])
          : undefined,
        calories: pe.exerciseInputs?.includes(ExerciseInput.CALORIES)
          ? ([null] as unknown as number[])
          : undefined,
      })
    })

    const workoutResult = new WorkoutResult({
      id: uid(),
      createdTimestamp: Date.now(),
      activated: true,
      parentId: parentWorkout.id,
      note: '',
      finishedTimestamp: undefined,
      exerciseResultIds: exerciseResults.map((er: ExerciseResult) => er.id as string),
    })

    await this.table(DBTable.WORKOUT_RESULTS).put(workoutResult)
    await this.table(DBTable.EXERCISE_RESULTS).bulkPut(exerciseResults)
  }

  async finishWorkout() {
    const { parentWorkout, parentExercises, workoutResult, exerciseResults } =
      await this.getActiveWorkout()

    // Deactivate and update records
    parentWorkout.activated = false
    parentExercises.forEach((pe: Exercise) => (pe.activated = false))
    exerciseResults.forEach((er: ExerciseResult) => (er.activated = false))
    workoutResult.activated = false
    workoutResult.finishedTimestamp = Date.now()

    await Promise.all([
      this.putRecord(DBTable.WORKOUTS, parentWorkout),
      ...parentExercises.map((pe: Exercise) => this.putRecord(DBTable.EXERCISES, pe)),
      ...exerciseResults.map((er: ExerciseResult) => this.putRecord(DBTable.EXERCISE_RESULTS, er)),
      this.putRecord(DBTable.WORKOUT_RESULTS, workoutResult),
    ])
  }

  async discardWorkout() {
    const { parentWorkout, parentExercises, workoutResult, exerciseResults } =
      await this.getActiveWorkout()

    // Deactivate parent records
    if (parentWorkout) {
      parentWorkout.activated = false
      await this.putRecord(DBTable.WORKOUTS, parentWorkout)
    }

    if (parentExercises?.length > 0) {
      parentExercises.forEach((pe: Exercise) => (pe.activated = false))
      await Promise.all(
        parentExercises.map((pe: Exercise) => this.putRecord(DBTable.EXERCISES, pe))
      )
    }

    // Delete child records
    if (exerciseResults?.length > 0) {
      await Promise.all(
        exerciseResults.map((er: ExerciseResult) =>
          this.deleteRecord(DBTable.EXERCISE_RESULTS, er.id as string)
        )
      )
    }

    if (workoutResult) {
      await this.deleteRecord(DBTable.WORKOUT_RESULTS, workoutResult.id as string)
    }
  }

  /**
   * This ignores schema parsing until you try to finish the active workout.
   */
  async putActiveRecord(childTable: ChildTable, activeRecord: AnyDBRecord) {
    return await this.table(childTable).put(activeRecord)
  }

  /////////////////////////////////////////////////////////////////////////////
  //                                                                         //
  //     Deletes                                                             //
  //                                                                         //
  /////////////////////////////////////////////////////////////////////////////

  private async _deleteParent(parentTable: ParentTable, id: string) {
    await this.table(parentTable).delete(id)
    const childTable = this.getChildTable(parentTable)
    return await this.table(childTable).where(DBField.PARENT_ID).equals(id).delete()
  }

  private async _deleteChild(childTable: ChildTable, id: string, recordToDelete: AnyDBRecord) {
    await this.table(childTable).delete(id)
    const parentTable = this.getParentTable(childTable)
    return await this.updatePrevious(parentTable, recordToDelete.parentId)
  }

  async deleteRecord(table: DBTable, id: string) {
    const recordToDelete = (await this.getRecord(table, id)) as AnyDBRecord | undefined

    if (!recordToDelete) {
      throw new Error(`No record to delete in table ${table} for id ${id}`)
    }

    return await {
      [DBTable.WORKOUTS]: async () => this._deleteParent(DBTable.WORKOUTS, id),
      [DBTable.EXERCISES]: async () => this._deleteParent(DBTable.EXERCISES, id),
      [DBTable.MEASUREMENTS]: async () => this._deleteParent(DBTable.MEASUREMENTS, id),
      [DBTable.WORKOUT_RESULTS]: async () =>
        this._deleteChild(DBTable.WORKOUT_RESULTS, id, recordToDelete),
      [DBTable.EXERCISE_RESULTS]: async () =>
        this._deleteChild(DBTable.EXERCISE_RESULTS, id, recordToDelete),
      [DBTable.MEASUREMENT_RESULTS]: async () =>
        this._deleteChild(DBTable.MEASUREMENT_RESULTS, id, recordToDelete),
    }[table]()
  }

  async clearLogs() {
    return await this.table(InternalTable.LOGS).clear()
  }

  async clearSettings() {
    await this.table(InternalTable.SETTINGS).clear()
    return await this.initSettings()
  }

  async clearAll() {
    await Promise.all([
      Object.values(InternalTable).map(async (table) => await this.table(table).clear()),
      Object.values(DBTable).map(async (table) => await this.table(table).clear()),
    ])
    return await this.initSettings()
  }

  /**
   * Deletes entire database. Require app reload to reinitialize the database.
   */
  async deleteDatabase() {
    return await this.delete()
  }
}

/**
 * Use this preconfigured Database instance. Do NOT create another one!
 */
const DB = new Database(`${AppName} v${AppDatabaseVersion}`)

export default DB
