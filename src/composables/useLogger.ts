import { Icon } from '@/types/general'
import useNotifications from '@/composables/useNotifications'
import Logger from '@/services/Logger'
import DB from '@/services/Database'
import { LogLevel } from '@/models/Log'
import { SettingKey } from '@/models/Setting'

export default function useLogger() {
  const { notify } = useNotifications()

  const log = {
    print: (message: any, ...args: any) => {
      Logger.print(message, ...args)
    },

    silentDebug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${LogLevel.DEBUG}]`, name, details)
      }
    },

    debug: async (name: string, details?: any) => {
      if (import.meta.env.DEV) {
        Logger.debug(`[${LogLevel.DEBUG}]`, name, details)
        notify(name, Icon.DEBUG, 'accent')
      }
    },

    info: async (name: string, details?: any) => {
      if ((await DB.getSetting(SettingKey.CONSOLE_LOGS))?.value) {
        Logger.info(`[${LogLevel.INFO}]`, name, details)
      }

      await DB.addLog(LogLevel.INFO, name, details)

      if ((await DB.getSetting(SettingKey.INFO_MESSAGES))?.value) {
        notify(name, Icon.INFO, 'info')
      }
    },

    warn: async (name: string, details?: any) => {
      if ((await DB.getSetting(SettingKey.CONSOLE_LOGS))?.value) {
        Logger.warn(`[${LogLevel.WARN}]`, name, details)
      }

      await DB.addLog(LogLevel.WARN, name, details)

      notify(name, Icon.WARN, 'warning')
    },

    error: async (name: string, details?: any) => {
      if ((await DB.getSetting(SettingKey.CONSOLE_LOGS))?.value) {
        Logger.error(`[${LogLevel.ERROR}]`, name, details)
      }

      await DB.addLog(LogLevel.ERROR, name, details)

      notify(name, Icon.ERROR, 'negative')
    },
  }

  return { log }
}
