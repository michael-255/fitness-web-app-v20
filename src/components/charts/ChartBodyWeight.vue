<script setup lang="ts">
import { date } from 'quasar'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { onMounted, ref, type Ref } from 'vue'
import { Duration } from '@/types/general'
import type { AnyDBRecord, ParentTable } from '@/types/database'
import { MeasurementInput, Measurement } from '@/models/Measurement'
import ErrorStates from '../ErrorStates.vue'
import useLogger from '@/composables/useLogger'
import useUIStore from '@/stores/ui'
import useChartTimeWatcher from '@/composables/useChartTimeWatcher'
import useCharting from '@/composables/useCharting'
import DB from '@/services/Database'
import { SettingKey } from '@/models/Setting'

const props = defineProps<{
  id: string
  parentTable: ParentTable
}>()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const { log } = useLogger()
const { getSingleChartOptions, getSingleChartDataset, getBmiChartDataset } = useCharting()
const uiStore = useUIStore()

const isVisible = ref(false)
const userHeight: Ref<number | undefined> = ref(undefined)
const recordCount: Ref<number> = ref(0)
const chartLabel = MeasurementInput.BODY_WEIGHT
const chartData: Ref<{
  labels: any[]
  datasets: any[]
}> = ref({
  labels: [],
  datasets: [],
})
const bmiChartData: Ref<{
  labels: any[]
  datasets: any[]
}> = ref({
  labels: [],
  datasets: [],
})

onMounted(async () => {
  userHeight.value = await DB.getSettingValue(SettingKey.USER_HEIGHT_INCHES)
  await recalculateChart()
})

useChartTimeWatcher(recalculateChart)

async function recalculateChart() {
  try {
    const { measurementInput } = (await DB.getRecord(props.parentTable, props.id)) as Measurement
    if (!measurementInput) return

    if (measurementInput !== MeasurementInput.BODY_WEIGHT) return

    const childRecords = await DB.getSortedChildren(DB.getChildTable(props.parentTable), props.id)
    if (childRecords.length === 0) return

    // Filter records to only include those within the chart time
    const timeRestrictedRecords = childRecords.filter((record: AnyDBRecord) => {
      const timeDifference = new Date().getTime() - record.createdTimestamp
      return timeDifference <= Duration[uiStore.chartTime]
    })

    recordCount.value = timeRestrictedRecords.length

    // X-axis labels
    const chartLabels = timeRestrictedRecords.map((record: AnyDBRecord) =>
      date.formatDate(record.createdTimestamp, 'YYYY MMM D')
    )

    const dataItems = timeRestrictedRecords.map((record: AnyDBRecord) =>
      Number(record.bodyWeight.toFixed(2))
    )

    chartData.value = {
      labels: chartLabels,
      datasets: [getSingleChartDataset(dataItems, 'primary', 'primary')],
    }

    // Include BMI chart if user height is set
    if (typeof userHeight.value === 'number') {
      const bmiItems = dataItems.map((weight) => {
        const height = userHeight.value as number
        return ((weight / (height * height)) * 703).toFixed(2)
      })

      bmiChartData.value = {
        labels: chartLabels,
        datasets: [getBmiChartDataset(bmiItems)],
      }
    }

    isVisible.value = true
  } catch (error) {
    log.error('Error loading measurement body weight chart', error)
  }
}
</script>

<template>
  <section v-if="isVisible">
    <div v-if="recordCount > 0">
      <div class="text-h6">{{ chartLabel }}</div>

      <QBadge rounded color="secondary" class="q-py-none">
        <span class="text-caption">{{ recordCount }} records in time frame</span>
      </QBadge>

      <Line
        :options="getSingleChartOptions()"
        :data="chartData"
        style="max-height: 500px"
        class="q-mb-xl"
      />

      <div v-if="userHeight">
        <div class="text-h6">Body Mass Index (BMI)</div>

        <div>Based on height of {{ userHeight }} inches.</div>

        <QBadge rounded color="secondary" class="q-py-none">
          <span class="text-caption">{{ recordCount }} records in time frame</span>
        </QBadge>

        <Line :options="getSingleChartOptions()" :data="bmiChartData" style="max-height: 500px" />
      </div>
    </div>

    <ErrorStates v-else error="no-data" />
  </section>
</template>
