import { describe, test, expect } from 'vitest'
import * as common from '@/utils/common'

describe('customId util', () => {
  test('should throw error if segmentLengths param has less then 1 element', () => {
    expect(() => {
      common.customId({ segmentLengths: [] })
    }).toThrow()
  })

  test('should throw error if segmentLengths param has any non-positive numbers', () => {
    expect(() => {
      common.customId({ segmentLengths: [-9, 8] })
    }).toThrow()
    expect(() => {
      common.customId({ segmentLengths: [8, 0] })
    }).toThrow()
    expect(() => {
      common.customId({ segmentLengths: [8, 0.999, 8] })
    }).toThrow()
  })

  test('should throw error if delimiter param is not a string of length 1 or empty', () => {
    expect(() => {
      common.customId({ delimiter: 'invalid-delimiet' })
    }).toThrow()
  })

  test('should create a custom id based on the params ', () => {
    const defaultId = common.customId()
    const bigId = common.customId({
      segmentLengths: [2, 2, 2, 2, 2, 2],
      delimiter: ':',
    })
    const packedId = common.customId({
      segmentLengths: [8, 8, 8],
      delimiter: '',
    })
    const upcId = common.customId({
      segmentLengths: [2, 8, 8, 2],
      delimiter: '_',
    })

    expect(defaultId).toMatch(/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/)
    expect(bigId).toMatch(/[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}/)
    expect(packedId).toMatch(/[A-Z0-9]{24}/)
    expect(upcId).toMatch(/[A-Z0-9]{2}_[A-Z0-9]{8}_[A-Z0-9]{8}_[A-Z0-9]{2}/)
  })
})

describe('truncateString util', () => {
  test('should return a correctly truncated string', () => {
    const string = 'abcdefghijklmnopqrstuvwxyz'
    expect(common.truncateString(string)).toBe(string)
    expect(common.truncateString(string, 3, '...')).toBe('abc...')
    expect(common.truncateString(string, 5, '*')).toBe('abcde*')
    expect(common.truncateString(null)).toBe('')
  })
})

describe('getDisplayDate util', () => {
  test('should return a formatted display date', () => {
    expect(common.getDisplayDate(new Date('2022-01-01').toISOString())).toBe(
      'Fri, 2021 Dec 31st, 7:00 PM'
    )
  })

  test('should return undefined when input is invalid', () => {
    expect(common.getDisplayDate('')).toBe(undefined)
  })
})

describe('getDurationFromMilliseconds util', () => {
  test('should return a formatted time string based on the milliseconds', () => {
    expect(common.getDurationFromMilliseconds(59000)).toBe('59s')
    expect(common.getDurationFromMilliseconds(60000)).toBe('1m ')
    expect(common.getDurationFromMilliseconds(119000)).toBe('1m 59s')
    expect(common.getDurationFromMilliseconds(3600000)).toBe('1h ')
    expect(common.getDurationFromMilliseconds(200000000)).toBe('2d 7h 33m 20s')
  })

  test('should return undefined when input is invalid or less then 1000', () => {
    expect(common.getDurationFromMilliseconds(-1)).toBe(undefined)
    expect(common.getDurationFromMilliseconds(0)).toBe(undefined)
    expect(common.getDurationFromMilliseconds(1)).toBe(undefined)
    expect(common.getDurationFromMilliseconds(999)).toBe(undefined)
    expect(common.getDurationFromMilliseconds(1000)).toBe('1s')
  })
})

describe('getRecordsCountDisplay util', () => {
  test('should return a formatted count string based on the number of records', () => {
    expect(common.getRecordsCountDisplay([])).toBe('No records found')
    expect(common.getRecordsCountDisplay([1])).toBe('1 record found')
    expect(common.getRecordsCountDisplay([1, 2, 3])).toBe('3 records found')
    expect(common.getRecordsCountDisplay(Array.from({ length: 1000 }).fill(1))).toBe(
      '1000 records found'
    )
  })
})
