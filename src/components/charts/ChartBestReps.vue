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
import { Exercise, ExerciseInput } from '@/models/Exercise'
import ErrorStates from '../ErrorStates.vue'
import useLogger from '@/composables/useLogger'
import useUIStore from '@/stores/ui'
import useChartTimeWatcher from '@/composables/useChartTimeWatcher'
import useCharting from '@/composables/useCharting'
import DB from '@/services/Database'

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
const { getSingleChartOptions, getSingleChartDataset } = useCharting()
const uiStore = useUIStore()

const isVisible = ref(false)
const recordCount: Ref<number> = ref(0)
const chartLabel = 'Best Reps'
const chartData: Ref<{
  labels: any[]
  datasets: any[]
}> = ref({
  labels: [],
  datasets: [],
})

onMounted(async () => {
  await recalculateChart()
})

useChartTimeWatcher(recalculateChart)

async function recalculateChart() {
  try {
    const { exerciseInputs } = (await DB.getRecord(props.parentTable, props.id)) as Exercise
    if (exerciseInputs?.length === 0) return

    if (!exerciseInputs?.includes(ExerciseInput.REPS)) return

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
      Number(Math.max(...record.reps).toFixed(2))
    )

    chartData.value = {
      labels: chartLabels,
      datasets: [getSingleChartDataset(dataItems, 'secondary', 'secondary')],
    }

    isVisible.value = true
  } catch (error) {
    log.error('Error loading exercise best reps chart', error)
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

      <Line :options="getSingleChartOptions()" :data="chartData" style="max-height: 500px" />
    </div>

    <ErrorStates v-else error="no-data" />
  </section>
</template>
