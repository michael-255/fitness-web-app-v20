<script setup lang="ts">
import { exportFile } from 'quasar'
import { Duration, Icon, Limit } from '@/types/general'
import { type Ref, ref, onUnmounted } from 'vue'
import { AppName } from '@/constants/global'
import { useMeta } from 'quasar'
import { Setting, SettingKey } from '@/models/Setting'
import { DBTable, type BackupData } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useNotifications from '@/composables/useNotifications'
import useDialogs from '@/composables/useDialogs'
import useDefaults from '@/composables/useDefaults'
import ResponsivePage from '@/components/ResponsivePage.vue'
import useRouting from '@/composables/useRouting'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Settings` })

const { log } = useLogger()
const { notify } = useNotifications()
const { confirmDialog } = useDialogs()
const { onDefaultExamples, onDefaultTests } = useDefaults()
const { goToLogsData } = useRouting()

const settings: Ref<Setting[]> = ref([])
const logDurationIndex: Ref<number> = ref(0)
const importFile: Ref<any> = ref(null)
const logDurationKeys = [
  // Duration[Duration.Now], // Uncomment to test log purges
  Duration[Duration['One Week']],
  Duration[Duration['One Month']],
  Duration[Duration['Three Months']],
  Duration[Duration['Six Months']],
  Duration[Duration['One Year']],
  Duration[Duration['Forever']],
]

const subscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    settings.value = liveSettings

    const logDuration = liveSettings.find((s) => s.key === SettingKey.LOG_RETENTION_DURATION)
      ?.value as number

    logDurationIndex.value = logDurationKeys.findIndex((i) => i === Duration[logDuration])
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})

function onTestLogger() {
  log.debug('This is a Debug Log', { name: 'Debug' })
  log.info('This is an Info Log', { name: 'Info' })
  log.warn('This is a Warning Log', { name: 'Warning' })
  log.error('This is an Error Log', { name: 'Error' })
}

// Called when a file has been rejected by the input
function onRejectedFile(entries: any) {
  const fileName = entries[0]?.importFile?.name || undefined
  log.warn(`Cannot import"${fileName}`, entries)
}

function onImportFile() {
  confirmDialog(
    'Import',
    `Import backup data from ${importFile?.value?.name} and attempt to load records into the database from it? Please note that Logs are NOT imported.`,
    Icon.INFO,
    'info',
    async () => {
      try {
        const backupData = JSON.parse(await importFile.value.text()) as BackupData

        log.silentDebug('backupData:', backupData)

        if (backupData.appName !== AppName) {
          throw new Error(`Cannot import data from the app ${backupData.appName}`)
        }

        // Import settings first in case errors stop type importing below
        if (backupData.Settings.length > 0) {
          await Promise.all(
            backupData.Settings.filter((setting) =>
              Object.values(SettingKey).includes(setting.key)
            ).map(async (setting) => await DB.setSetting(setting.key, setting.value))
          )
        }

        // Logs are never imported
        await Promise.all([
          Object.values(DBTable).map(
            async (table) => await DB.importRecords(table, backupData[table])
          ),
        ])

        importFile.value = null // Clear input
        log.info('Successfully imported available data')
      } catch (error) {
        log.error('Error during import', error)
      }
    }
  )
}

function onExportRecords() {
  const appNameSlug = AppName.toLowerCase().split(' ').join('-')
  const date = new Date().toISOString().split('T')[0]
  const filename = `export-${appNameSlug}-${date}.json`

  confirmDialog(
    'Export',
    `Export all data into the file "${filename}" as a backup?`,
    Icon.INFO,
    'info',
    async () => {
      try {
        const backupData = await DB.getBackupData()

        log.silentDebug('backupData:', backupData)

        const fileStatus = exportFile(filename, JSON.stringify(backupData), {
          encoding: 'UTF-8',
          mimeType: 'application/json',
        })

        if (fileStatus === true) {
          log.info('File downloaded successfully', { filename })
        } else {
          throw new Error('Browser denied file download')
        }
      } catch (error) {
        log.error('Export failed', error)
      }
    }
  )
}

async function onChangeLogRetention(logDurationIndex: number) {
  try {
    const logDurationKey = logDurationKeys[logDurationIndex]
    const logDuration = Duration[logDurationKey as keyof typeof Duration]

    await DB.setSetting(SettingKey.LOG_RETENTION_DURATION, logDuration)

    log.info('Updated log retention duration', {
      logDurationKey,
      logDuration,
      index: logDurationIndex,
    })
  } catch (error) {
    log.error('Log retention duration update failed', error)
  }
}

async function onResetSettings() {
  confirmDialog(
    'Reset Settings',
    'Would you like to reset your app Settings to the defaults? This does not impact your data.',
    Icon.REFRESH,
    'primary',
    async () => {
      try {
        await DB.clearSettings()
        log.info('Successfully reset settings')
      } catch (error) {
        log.error('Error reseting settings', error)
      }
    }
  )
}

async function onDeleteLogs() {
  confirmDialog(
    `Delete Logs`,
    `Permanetly delete all Logs from the database?`,
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.clearLogs()
        log.info('Successfully deleted logs data')
      } catch (error) {
        log.error(`Error deleting Logs`, error)
      }
    }
  )
}

async function onDeleteAll() {
  confirmDialog(
    'Delete All',
    'Permanetly delete all data from the database?',
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.clearAll()
        log.info('All data successfully deleted')
      } catch (error) {
        log.error('Error deleting all data', error)
      }
    }
  )
}

async function onDeleteDatabase() {
  confirmDialog(
    'Delete Database',
    'Delete the underlining database? All data will be lost. You must reload the website after this action to reinitialize the database.',
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.deleteDatabase()
        notify('Reload the website now', Icon.WARN, 'warning')
      } catch (error) {
        log.error('Database deletion failed', error)
      }
    }
  )
}

function getSettingValue(key: SettingKey) {
  return settings.value.find((s) => s.key === key)?.value
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.SETTINGS" bannerTitle="Settings">
    <section class="q-mb-xl">
      <p class="text-h6">Options</p>

      <div class="q-mb-md">
        <p>Reset your app Settings to the defaults without impacting any of your data.</p>
        <QBtn label="Reset Settings" color="primary" @click="onResetSettings()" />
      </div>

      <div class="q-mb-md">
        <p>
          Welcome overlay provides helpful instructions on basic app usage on the Dashboard page.
        </p>
        <QToggle
          label="Show Welcome Overlay"
          :model-value="getSettingValue(SettingKey.WELCOME_OVERLAY)"
          @update:model-value="DB.setSetting(SettingKey.WELCOME_OVERLAY, $event)"
        />
      </div>

      <div class="q-mb-md">
        <p>Show descriptions for records displayed on the Dashboard page.</p>
        <QToggle
          label="Show Dashboard Descriptions"
          :model-value="getSettingValue(SettingKey.DASHBOARD_DESCRIPTIONS)"
          @update:model-value="DB.setSetting(SettingKey.DASHBOARD_DESCRIPTIONS, $event)"
        />
      </div>

      <div>
        <p>Dark mode allows you to switch between a light or dark theme for the app.</p>
        <QToggle
          label="Dark Mode"
          :model-value="getSettingValue(SettingKey.DARK_MODE)"
          @update:model-value="DB.setSetting(SettingKey.DARK_MODE, $event)"
        />
      </div>
    </section>

    <section class="q-mb-xl">
      <p class="text-h6">Defaults</p>

      <div>
        <p>Load default demostration records into the database. This action can be repeated.</p>

        <div class="q-mb-md">
          <QBtn label="Examples" color="primary" @click="onDefaultExamples()" />
        </div>

        <div>
          <QBtn label="Tests" color="primary" @click="onDefaultTests()" />
        </div>
      </div>
    </section>

    <section class="q-mb-xl">
      <p class="text-h6">Data Management</p>

      <div class="q-mb-md">
        <p>
          Import data into the database from a JSON file. The app expects the data in the file to be
          structured the same as the exported version.
        </p>
        <QFile
          v-model="importFile"
          dense
          outlined
          counter
          bottom-slots
          label="File Select"
          :max-file-size="Limit.MAX_FILE_SIZE"
          accept="application/json"
          @rejected="onRejectedFile"
        >
          <template v-slot:before>
            <QBtn :disable="!importFile" label="Import" color="primary" @click="onImportFile()" />
          </template>
          <template v-slot:append>
            <QIcon
              v-if="importFile"
              :name="Icon.CLOSE"
              class="cursor-pointer"
              @click.stop="importFile = null"
            />
          </template>
        </QFile>
      </div>

      <div class="q-mb-md">
        <p>
          Export your data as a JSON file. Do this on a regularly basis so you have a backup of your
          data.
        </p>
        <QBtn label="Export" color="primary" @click="onExportRecords()" />
      </div>
    </section>

    <section class="q-mb-xl">
      <p class="text-h6">Logging</p>

      <div class="q-mb-md">
        <p>View the app logs to troubleshoot issues.</p>
        <QBtn label="Access Logs" color="primary" @click="goToLogsData()" />
      </div>

      <div class="q-mb-md">
        <p>
          Validate that the logging settings below are working as expected by generating some test
          logs.
        </p>
        <QBtn label="Test Logger" color="primary" @click="onTestLogger()" />
      </div>

      <div class="q-mb-md">
        <p>Show Console Logs will display all log messages in the browser console.</p>
        <QToggle
          label="Show Console Logs"
          :model-value="getSettingValue(SettingKey.CONSOLE_LOGS)"
          @update:model-value="DB.setSetting(SettingKey.CONSOLE_LOGS, $event)"
        />
      </div>

      <div class="q-mb-md">
        <p>Show Info Messages will display info level notifications.</p>
        <QToggle
          label="Show Info Messages"
          :model-value="getSettingValue(SettingKey.INFO_MESSAGES)"
          @update:model-value="DB.setSetting(SettingKey.INFO_MESSAGES, $event)"
        />
      </div>

      <div class="q-mb-md">
        <p>
          Change log retention duration below. Logs older than the selected time will be deleted.
          This functions retroactivley. Expired log processing occurs every time the app is loaded.
        </p>

        <div class="q-mx-lg">
          <QSlider
            v-model="logDurationIndex"
            :label-value="logDurationKeys[logDurationIndex]"
            color="primary"
            markers
            label-always
            switch-label-side
            :min="0"
            :max="logDurationKeys.length - 1"
            @change="(index) => onChangeLogRetention(index)"
          />
        </div>
      </div>
    </section>

    <section class="q-mb-xl">
      <p class="text-h6 text-negative">DANGER ZONE</p>

      <p>
        The following operations cannot be undone. Consider exporting your data before proceeding.
      </p>

      <div class="q-mb-md">
        <p>Delete the app logs from the database.</p>
        <QBtn label="Delete Logs" color="negative" @click="onDeleteLogs()" />
      </div>

      <div class="q-mb-md">
        <p>Permanently delete all data from the database.</p>
        <QBtn label="Delete All Data" color="negative" @click="onDeleteAll()" />
      </div>

      <div class="q-mb-md">
        <p>Delete the underlining database and all of its data (requires website reload).</p>
        <QBtn label="Delete Database" color="negative" @click="onDeleteDatabase()" />
      </div>
    </section>
  </ResponsivePage>
</template>
