import { Icon } from '@/types/general'
import { uid } from 'quasar'
import { Duration } from '@/types/general'
import { ExampleResult } from '@/models/ExampleResults'
import { Example } from '@/models/Example'
import { DBTable } from '@/types/database'
import { TestResult } from '@/models/TestResults'
import { Test } from '@/models/Test'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

export default function useDefaults() {
  const { log } = useLogger()
  const { confirmDialog } = useDialogs()

  function randomGreekAlpha() {
    const greekLetters = [
      'Alpha',
      'Beta',
      'Gamma',
      'Delta',
      'Epsilon',
      'Zeta',
      'Eta',
      'Theta',
      'Iota',
      'Kappa',
      'Lambda',
      'Mu',
      'Nu',
      'Xi',
      'Omicron',
      'Pi',
      'Rho',
      'Sigma',
      'Tau',
      'Upsilon',
      'Phi',
      'Chi',
      'Psi',
      'Omega',
    ]
    return greekLetters[Math.floor(Math.random() * greekLetters.length)]
  }

  function randomEnglishAlpha() {
    const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    return englishLetters[Math.floor(Math.random() * englishLetters.length)]
  }

  function randomBoolean() {
    return Math.random() >= 0.5
  }

  function randomPercent() {
    return Math.floor(Math.random() * 100)
  }

  function previousDateMilliseconds() {
    return Date.now() - Duration['One Year']
  }

  async function onDefaultExamples() {
    confirmDialog(
      'Load Default Examples',
      `Would you like the load default Examples into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const examples: Example[] = []
          const exampleResults: ExampleResult[] = []

          const buildRecords = (count: number) => {
            const parentId = uid()
            const name = `Example - ${randomGreekAlpha()} ${randomEnglishAlpha()}`

            const example = new Example({
              id: parentId,
              createdTimestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              activated: false,
              previous: undefined,
              testIds: [uid(), uid(), uid()], // Fake test ids
            })

            for (let i = 0; i < count; i++) {
              exampleResults.push(
                new ExampleResult({
                  id: uid(),
                  createdTimestamp: previousDateMilliseconds() + Duration['One Day'] * i,
                  activated: false,
                  parentId,
                  note: `Example sub-record note ${i}`,
                  percent: randomPercent(),
                })
              )
            }

            examples.push(example)
          }

          buildRecords(360)
          buildRecords(2)
          buildRecords(0)

          await Promise.all([
            DB.importRecords(DBTable.EXAMPLES, examples),
            DB.importRecords(DBTable.EXAMPLE_RESULTS, exampleResults),
          ])

          log.info('Default examples loaded')
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  async function onDefaultTests() {
    confirmDialog(
      'Load Default Tests',
      `Would you like the load default Tests into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const tests: Test[] = []
          const testResults: TestResult[] = []

          const buildRecords = (count: number) => {
            const parentId = uid()
            const name = `Test - ${randomGreekAlpha()} ${randomEnglishAlpha()}`

            const test = new Test({
              id: parentId,
              createdTimestamp: Date.now(),
              name,
              desc: `${name} description.`,
              enabled: true,
              favorited: randomBoolean(),
              activated: false,
              previous: undefined,
            })

            for (let i = 0; i < count; i++) {
              testResults.push(
                new TestResult({
                  id: uid(),
                  activated: false,
                  parentId,
                  createdTimestamp: previousDateMilliseconds() + Duration['One Day'] * i,
                  note: `Test sub-record note ${i}`,
                })
              )
            }

            tests.push(test)
          }

          buildRecords(1)
          buildRecords(0)

          await Promise.all([
            DB.importRecords(DBTable.TESTS, tests),
            DB.importRecords(DBTable.TEST_RESULTS, testResults),
          ])

          log.info('Default tests loaded')
        } catch (error) {
          log.error('Failed to load defaults', error)
        }
      }
    )
  }

  return { onDefaultExamples, onDefaultTests }
}
