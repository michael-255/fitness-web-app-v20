import { describe, test, expect, beforeEach, vi } from 'vitest'
import { AppName } from '@/constants/global'
import Logger from '@/services/Logger'

describe('Logger service', () => {
  const baseStyle = 'border-radius: 3px; padding: 2px 4px; color: white; background-color:'
  const printColor = '#607d8b'
  const debugColor = '#673ab7'
  const infoColor = '#0d47a1'
  const warnColor = '#ff6f00'
  const errorColor = '#C10015'
  const message = 'Test logger message!'
  let name: string

  beforeEach(() => {
    name = AppName
    vi.clearAllMocks()
  })

  test('print calls stylized console.log', () => {
    const logSpy = vi.spyOn(console, 'log')
    Logger.print(message)
    expect(logSpy).toHaveBeenCalledWith(`%c${name}`, `${baseStyle} ${printColor};`, message)
  })

  test('debug calls stylized console.log', () => {
    const logSpy = vi.spyOn(console, 'log')
    Logger.debug(message)
    expect(logSpy).toHaveBeenCalledWith(`%c${name}`, `${baseStyle} ${debugColor};`, message)
  })

  test('info calls stylized console.log', () => {
    const logSpy = vi.spyOn(console, 'log')
    Logger.info(message)
    expect(logSpy).toHaveBeenCalledWith(`%c${name}`, `${baseStyle} ${infoColor};`, message)
  })

  test('warn calls stylized console.warn', () => {
    const logSpy = vi.spyOn(console, 'warn')
    Logger.warn(message)
    expect(logSpy).toHaveBeenCalledWith(`%c${name}`, `${baseStyle} ${warnColor};`, message)
  })

  test('error calls stylized console.error', () => {
    const logSpy = vi.spyOn(console, 'error')
    Logger.error(message)
    expect(logSpy).toHaveBeenCalledWith(`%c${name}`, `${baseStyle} ${errorColor};`, message)
  })
})
