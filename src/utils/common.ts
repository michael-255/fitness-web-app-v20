import { date } from 'quasar'
import { Duration } from '@/types/general'
import * as slug from 'slugify'

/**
 * Slugify a string so it can be used as a URL.
 * @param str
 * @returns Slugified string
 */
export function slugify(str: string): string {
  return slug.default(str, {
    replacement: '-',
    lower: true,
    strict: true,
    locale: 'en',
    trim: true,
  })
}

/**
 * Generates customized id. Use Quasar Other Utils UID for any other case.
 * @param obj.segmentLengths Array of segment lengths (recommend 1-8 each)
 * @param obj.delimiter Single string character delimiter for id segments
 * @returns Custom random id
 */
export function customId({
  segmentLengths = [4, 4, 4],
  delimiter = '-',
}: { segmentLengths?: number[]; delimiter?: string } = {}): string {
  if (segmentLengths.length < 1) {
    throw new Error('segmentLengths parameter must have at least one element')
  } else if (segmentLengths.some((el) => typeof el !== 'number' || el < 1)) {
    throw new Error('segmentLengths elements must be positive numbers')
  } else if (typeof delimiter !== 'string' || delimiter.length > 1) {
    throw new Error('delimiter must be a string of length 1 or an empty string')
  }

  const createIdSegment = (len: number): string => {
    // Note: Math.random only consistently produces 8 unique base 36 characters
    return Math.random()
      .toString(36)
      .substring(2, len + 2) // Adjusted to account for 2 trimmed characters
      .padEnd(len, 'X') // Ensures length is always reached with filler X's
  }

  let idStr = ''

  segmentLengths.forEach((segLen: number) => {
    idStr += `${createIdSegment(Math.floor(segLen))}${delimiter}`
  })

  if (delimiter) {
    idStr = idStr.slice(0, -1) // remove last delimitter
  }

  return idStr.toUpperCase()
}

/**
 * Truncates a string if it exceeds the provided length.
 * @param str String to be truncated
 * @param len Max length of truncated string
 * @returns Truncated string with a '...' at the end
 */
export function truncateString(
  str: string | null | undefined,
  len = 40,
  ending: '...' | '*' = '...'
): string {
  if (str) {
    if (str.length <= len) {
      return str
    } else {
      return str.slice(0, len) + ending
    }
  }
  return ''
}

/**
 * Converts milliseconds into a date string.
 * @param milliseconds
 * @returns Appropriate date string
 */
export function getDisplayDate(dateTime: Date | string | number | undefined) {
  return date.formatDate(dateTime, 'ddd, YYYY MMM Do, h:mm A')
}

/**
 * Converts milliseconds into a time duration string.
 * @param milliseconds
 * @returns Example: 1d 14h 6m 33s
 */
export function getDurationFromMilliseconds(milliseconds?: number): string | undefined {
  if (!milliseconds || milliseconds < 1000) {
    return undefined
  }

  const seconds = Math.floor((milliseconds / Duration['One Second']) % 60)
  const minutes = Math.floor((milliseconds / Duration['One Minute']) % 60)
  const hours = Math.floor((milliseconds / Duration['One Hour']) % 24)
  const days = Math.floor(milliseconds / Duration['One Day'])

  const daysStr = days > 0 ? `${days}d ` : ''
  const hoursStr = hours > 0 ? `${hours}h ` : ''
  const minutesStr = minutes > 0 ? `${minutes}m ` : ''
  const secondsStr = seconds > 0 ? `${seconds}s` : ''

  return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`
}

/**
 * Returns formatted count string with the number of records found in the provided array.
 * @param records
 */
export function getRecordsCountDisplay(records: any[]) {
  const count = records?.length ?? 0

  if (count === 0) {
    return 'No records found'
  } else if (count === 1) {
    return '1 record found'
  } else {
    return `${count} records found`
  }
}
