<script setup lang="ts">
import { date } from 'quasar'
import { onMounted, ref } from 'vue'
import { Icon } from '@/types/general'
import useActionStore from '@/stores/action'

const actionStore = useActionStore()

const displayDate = ref('')
const datePicker = ref('')
const timePicker = ref('')

onMounted(() => {
  const existingTime = actionStore.record.createdTimestamp ?? Date.now()
  datePicker.value = date.formatDate(existingTime, 'ddd MMM DD YYYY')
  timePicker.value = date.formatDate(existingTime, 'HH:mm:00')
  updateDisplayDate(existingTime)
})

function updateDisplayDate(timestamp: number = Date.now()) {
  actionStore.record.createdTimestamp = timestamp
  displayDate.value = date.formatDate(timestamp, 'ddd, YYYY MMM Do, h:mm A')
}

function onPickerUpdate() {
  // Set empty pickers with current time
  datePicker.value = datePicker.value
    ? datePicker.value
    : date.formatDate(Date.now(), 'ddd MMM DD YYYY')
  timePicker.value = timePicker.value ? timePicker.value : date.formatDate(Date.now(), 'HH:mm:00')

  const dateTimestamp = new Date(`${datePicker.value} ${timePicker.value}`).getTime()
  updateDisplayDate(dateTimestamp)
}
</script>

<template>
  <div class="text-weight-bold text-body1">Created Date</div>

  <QInput v-model="displayDate" dense outlined disable color="primary" hint="Auto formatted">
    <template v-slot:after>
      <!-- Date Picker -->
      <QBtn :icon="Icon.CALENDAR_DATE" color="primary" class="q-px-sm">
        <QPopupProxy>
          <QDate v-model="datePicker" mask="ddd MMM DD YYYY">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerUpdate()" v-close-popup />
            </div>
          </QDate>
        </QPopupProxy>
      </QBtn>

      <!-- Time Picker -->
      <QBtn :icon="Icon.CLOCK" color="primary" class="q-ml-sm q-px-sm">
        <QPopupProxy>
          <QTime v-model="timePicker" mask="HH:mm:00" now-btn>
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerUpdate()" v-close-popup />
            </div>
          </QTime>
        </QPopupProxy>
      </QBtn>

      <!-- Set DateTime to now -->
      <QBtn
        :icon="Icon.CALENDAR_CHECK"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="updateDisplayDate()"
      />
    </template>
  </QInput>
</template>
