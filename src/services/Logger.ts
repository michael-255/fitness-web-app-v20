import { AppName } from '@/constants/global'

export default class Logger {
  private static loggerName: string = `%c${AppName}`
  private static baseStyle = 'border-radius: 3px; padding: 2px 4px; color: white; background-color:'
  // Was unable to get Quasar getPaletteColor() to work for this
  // These color codes should be the same as those in ~/src/main.ts
  private static style = {
    print: `${Logger.baseStyle} #607d8b;`,
    debug: `${Logger.baseStyle} #673ab7;`,
    info: `${Logger.baseStyle} #0d47a1;`,
    warn: `${Logger.baseStyle} #ff6f00;`,
    error: `${Logger.baseStyle} #C10015;`,
  }

  static print(message: any, ...args: any) {
    console.log(this.loggerName, this.style.print, message, ...args)
  }

  static debug(message: any, ...args: any) {
    console.log(this.loggerName, this.style.debug, message, ...args)
  }

  static info(message: any, ...args: any) {
    console.log(this.loggerName, this.style.info, message, ...args)
  }

  static warn(message: any, ...args: any) {
    console.warn(this.loggerName, this.style.warn, message, ...args)
  }

  static error(message: any, ...args: any) {
    console.error(this.loggerName, this.style.error, message, ...args)
  }
}
