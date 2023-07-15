<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { type Ref, ref, onUnmounted } from 'vue'
import { Icon } from '@/types/general'
import { useMeta } from 'quasar'
import { AppName } from '@/constants/global'
import { getRecordsCountDisplay } from '@/utils/common'
import { DBTable, type DBField, type ParentTable } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useRouting from '@/composables/useRouting'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Records Data Table` })

const { log } = useLogger()
const { routeTable, goToEdit, goToCreate, goBack } = useRouting()
const { confirmDialog, inspectDialog, chartsDialog } = useDialogs()

const searchFilter: Ref<string> = ref('')
const rows: Ref<any[]> = ref([])
const columns: Ref<QTableColumn[]> = ref(DB.getTableColumns(routeTable as DBTable))
const columnOptions: Ref<QTableColumn[]> = ref(
  columns.value.filter((col: QTableColumn) => !col.required)
)
const visibleColumns: Ref<DBField[]> = ref(columnOptions.value.map((col) => col.name) as DBField[])

const subscription = DB.liveDataTable(routeTable as DBTable).subscribe({
  next: (records) => (rows.value = records),
  error: (error) => log.error('Error fetching live records data', error),
})

onUnmounted(() => {
  subscription?.unsubscribe()
})

async function onDelete(table: DBTable, id: string) {
  confirmDialog(
    'Delete',
    'Permanently delete this record? Please note that all child records are deleted when you delete a parent record.',
    Icon.DELETE,
    'negative',
    async () => {
      try {
        await DB.deleteRecord(table, id)
        log.info('Successfully deleted record', { table, id })
      } catch (error) {
        log.error('Delete failed', error)
      }
    }
  )
}

async function onInspect(table: DBTable, id: string) {
  const record = await DB.getRecord(table, id)

  if (record) {
    inspectDialog(record, table)
  } else {
    log.error('Failed to find record', { table, id })
  }
}

async function onCharts(parentTable: ParentTable, id: string) {
  chartsDialog(id, parentTable)
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
          v-show="col.name !== 'hiddenId'"
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
            v-if="[DBTable.EXAMPLES, DBTable.TESTS].includes(routeTable as DBTable)"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            :icon="Icon.CHARTS"
            @click="onCharts(routeTable as ParentTable, props.cols[0].value)"
          />

          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            :icon="Icon.INSPECT"
            @click="onInspect(routeTable as DBTable, props.cols[0].value)"
          />

          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            :icon="Icon.EDIT"
            @click="goToEdit(routeTable as DBTable, props.cols[0].value)"
          />

          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onDelete(routeTable as DBTable, props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>

    <template v-slot:top>
      <div class="row justify-start full-width q-mb-md">
        <div class="col-10 text-h6 text-bold ellipsis">
          {{ DB.getLabel(routeTable as DBTable, 'plural') }}
        </div>

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
              <QBtn
                color="positive"
                class="q-px-sm q-mr-xs"
                :icon="Icon.ADD"
                @click="goToCreate(routeTable as DBTable)"
              />

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
