<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { type Ref, ref, onUnmounted } from 'vue'
import { Icon } from '@/types/general'
import { useMeta } from 'quasar'
import { AppName } from '@/constants/global'
import { getRecordsCountDisplay } from '@/utils/common'
import { Log } from '@/models/Log'
import { InternalTable, type InternalField } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useRouting from '@/composables/useRouting'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Logs Data Table` })

const { log } = useLogger()
const { goBack } = useRouting()
const { inspectDialog } = useDialogs()

const searchFilter: Ref<string> = ref('')
const rows: Ref<Log[]> = ref([])
const columns: Ref<QTableColumn[]> = ref(Log.getTableColumns())
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
const visibleColumns: Ref<InternalField[]> = ref(
  columnOptions.value.map((col) => col.name) as InternalField[]
)

const subscription = DB.liveLogs().subscribe({
  next: (records) => (rows.value = records),
  error: (error) => log.error('Error fetching live Logs', error),
})

onUnmounted(() => {
  subscription?.unsubscribe()
})

async function onInspect(autoId: number) {
  const record = await DB.getLog(Number(autoId))

  if (record) {
    inspectDialog(record, InternalTable.LOGS)
  } else {
    log.error('Failed to find Log', { autoId })
  }
}
</script>

<template>
  <QTable
    :rows="rows"
    :columns="columns"
    :visible-columns="visibleColumns"
    :rows-per-page-options="[0]"
    :filter="searchFilter"
    virtual-scroll
    fullscreen
    row-key="id"
  >
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh
          v-for="col in props.cols"
          v-show="col.name !== 'hiddenAutoId'"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </QTh>
        <QTh auto-width class="text-left">Actions</QTh>
      </QTr>
    </template>

    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
        <QTd auto-width>
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            :icon="Icon.INSPECT"
            @click="onInspect(props.cols[0].value)"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <div class="col-10 text-h6 text-bold ellipsis">Logs</div>

        <QBtn
          round
          flat
          class="absolute-top-right q-mr-sm q-mt-sm"
          :icon="Icon.CLOSE"
          @click="goBack()"
        />
      </div>

      <div class="row justify-start full-width">
        <div class="col-12">
          <QInput
            :disable="!rows.length"
            outlined
            dense
            clearable
            debounce="300"
            v-model="searchFilter"
            placeholder="Search"
          >
            <template v-slot:before>
              <QSelect
                v-model="visibleColumns"
                :options="columnOptions"
                :disable="!rows.length"
                bg-color="primary"
                standout
                multiple
                dense
                options-dense
                emit-value
                map-options
                option-value="name"
                display-value=""
              >
                <template v-slot:prepend>
                  <QIcon color="white" :name="Icon.OPTIONS" />
                </template>
              </QSelect>
            </template>

            <template v-slot:append>
              <QIcon name="search" />
            </template>
          </QInput>
        </div>
      </div>
    </template>

    <template v-slot:bottom>{{ getRecordsCountDisplay(rows) }}</template>
  </QTable>
</template>
