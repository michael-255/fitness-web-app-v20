import { InternalField } from '@/types/database'
import { z } from 'zod'

export enum SettingKey {
  WELCOME_OVERLAY = 'welcome-overlay',
  DASHBOARD_DESCRIPTIONS = 'dashboard-descriptions',
  DARK_MODE = 'dark-mode',
  CONSOLE_LOGS = 'console-logs',
  INFO_MESSAGES = 'info-messages',
  LOG_RETENTION_DURATION = 'log-retention-duration',
}

export const settingKeySchema = z.nativeEnum(SettingKey)
export const settingValueSchema = z.boolean().or(z.string()).or(z.number()).optional()
export type SettingValue = z.infer<typeof settingValueSchema>

export const settingSchema = z.object({
  [InternalField.KEY]: settingKeySchema,
  [InternalField.VALUE]: settingValueSchema,
})

export class Setting {
  [InternalField.KEY]!: SettingKey;
  [InternalField.VALUE]?: SettingValue

  constructor(key: SettingKey, value: SettingValue) {
    this.key = key
    this.value = value
  }

  static getLabel(style: 'singular' | 'plural') {
    return style === 'singular' ? 'Setting' : 'Settings'
  }
}
