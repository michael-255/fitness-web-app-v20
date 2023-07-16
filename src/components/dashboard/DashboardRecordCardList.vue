<script setup lang="ts">
import { Icon } from '@/types/general'
import { getDisplayDate, getDurationFromMilliseconds, getRecordsCountDisplay } from '@/utils/common'
import { useTimeAgo } from '@vueuse/core'
import { DBTable, type AnyDBRecord, type ParentTable } from '@/types/database'
import DashboardRecordCardMenu from '@/components/dashboard/DashboardRecordCardMenu.vue'
import useRouting from '@/composables/useRouting'
import useDialogs from '@/composables/useDialogs'
import useLogger from '@/composables/useLogger'
import DB from '@/services/Database'

const props = defineProps<{
  parentTable: ParentTable
  records: AnyDBRecord[]
  showDescriptions: boolean
  defaultsFunc?: () => any
}>()

const { log } = useLogger()
const { confirmDialog } = useDialogs()
const { goToCreate, goToActive } = useRouting()

async function onBeginWorkout(id: string, name: string) {
  const isActiveWorkout = await DB.isActiveWorkout()

  if (isActiveWorkout) {
    confirmDialog(
      'Replace Active Workout',
      `You already have an active workout. Do you want to replace it with ${name}?`,
      Icon.WARN,
      'warning',
      async () => {
        try {
          await DB.discardWorkout()
          await DB.beginWorkout(id)
          goToActive()
          log.info('Replaced active workout', { replacedById: id, replacedByName: name })
        } catch (error) {
          log.error('Failed to replace active workout', error)
        }
      }
    )
  } else {
    await DB.beginWorkout(id)
    goToActive()
  }
}
</script>

<template>
  <div class="row justify-center q-gutter-md">
    <div v-for="record in records" :key="record.id" class="col-xs-12 col-sm-12 col-md-12 col-lg-5">
      <QCard class="column full-height">
        <QCardSection class="col">
          <DashboardRecordCardMenu :parentTable="parentTable" :record="record" />

          <QBadge
            v-if="record.activated"
            rounded
            color="warning"
            class="absolute-top-left q-py-none"
            style="left: -4px; top: -6px"
          >
            <QIcon :name="Icon.LOCK" />
            <span class="text-caption q-ml-xs">Active</span>
          </QBadge>

          <p class="text-h6">{{ record.name }}</p>
          <p v-if="showDescriptions">{{ record.desc }}</p>

          <QBadge rounded color="secondary" class="q-py-none">
            <QIcon :name="Icon.PREVIOUS" />
            <span class="text-caption q-ml-xs">
              {{
                useTimeAgo(record.previousChild?.createdTimestamp || '').value ||
                'No previous records'
              }}
            </span>
          </QBadge>

          <div v-if="record.previousChild?.createdTimestamp">
            <QIcon :name="Icon.CALENDAR_CHECK" />
            <span class="text-caption q-ml-xs">
              {{ getDisplayDate(record.previousChild.createdTimestamp) }}
            </span>
          </div>

          <div
            v-if="
              record.previousChild?.createdTimestamp && record?.previousChild?.finishedTimestamp
            "
          >
            <QIcon :name="Icon.STOPWATCH" />
            <span class="text-caption q-ml-xs">
              {{
                getDurationFromMilliseconds(
                  record.previousChild.finishedTimestamp - record.previousChild.createdTimestamp
                )
              }}
            </span>
          </div>

          <div v-if="record?.previousChild?.bodyWeight">
            <QIcon :name="Icon.MEASUREMENTS" />
            <span class="text-caption q-ml-xs"> {{ record.previousChild.bodyWeight }} lbs </span>
          </div>

          <div v-if="record?.previousChild?.percent">
            <QIcon :name="Icon.MEASUREMENTS" />
            <span class="text-caption q-ml-xs"> {{ record.previousChild.percent }}% </span>
          </div>

          <div v-if="record?.previousChild?.inches">
            <QIcon :name="Icon.MEASUREMENTS" />
            <span class="text-caption q-ml-xs"> {{ record.previousChild.inches }} inches </span>
          </div>

          <div v-if="record?.previousChild?.number">
            <QIcon :name="Icon.MEASUREMENTS" />
            <span class="text-caption q-ml-xs">{{ record.previousChild.number }}</span>
          </div>

          <div v-if="record?.previousChild?.reps?.[0]">
            <QIcon :name="Icon.REPS" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.reps.join(', ') }} reps
            </span>
          </div>

          <div v-if="record?.previousChild?.weightLbs?.[0]">
            <QIcon :name="Icon.WEIGHT" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.weightLbs.join(', ') }} lbs
            </span>
          </div>

          <div v-if="record?.previousChild?.distanceMiles?.[0]">
            <QIcon :name="Icon.DISTANCE" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.distanceMiles.join(', ') }} mi
            </span>
          </div>

          <div v-if="record?.previousChild?.durationMinutes?.[0]">
            <QIcon :name="Icon.DURATION" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.durationMinutes.join(', ') }} minutes
            </span>
          </div>

          <div v-if="record?.previousChild?.watts?.[0]">
            <QIcon :name="Icon.WATTS" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.watts.join(', ') }} watts
            </span>
          </div>

          <div v-if="record?.previousChild?.speedMph?.[0]">
            <QIcon :name="Icon.SPEED" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.speedMph.join(', ') }} mph
            </span>
          </div>

          <div v-if="record?.previousChild?.resistance?.[0]">
            <QIcon :name="Icon.RESISTANCE" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.resistance.join(', ') }} resistance
            </span>
          </div>

          <div v-if="record?.previousChild?.incline?.[0]">
            <QIcon :name="Icon.INCLINE" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.incline.join(', ') }} incline
            </span>
          </div>

          <div v-if="record?.previousChild?.calories?.[0]">
            <QIcon :name="Icon.CALORIES" />
            <span class="text-caption q-ml-xs">
              {{ record.previousChild.calories.join(', ') }} calories
            </span>
          </div>
        </QCardSection>

        <QCardActions v-if="parentTable === DBTable.WORKOUTS" class="col-auto">
          <QBtn
            v-if="record?.activated"
            label="Resume Workout"
            color="positive"
            class="full-width"
            :icon="Icon.WORKOUT_RESUME"
            @click="goToActive()"
          />

          <QBtn
            v-else
            label="Begin Workout"
            color="primary"
            :icon="Icon.WORKOUT_BEGIN"
            class="full-width"
            @click="onBeginWorkout(record.id, record.name)"
          />
        </QCardActions>

        <QCardActions v-if="parentTable === DBTable.EXERCISES" class="col-auto">
          <div v-if="record?.activated" class="text-center full-width">
            Access limited while active
          </div>

          <QBtn
            v-else
            label="Add Exercise Entry"
            color="primary"
            class="full-width"
            :icon="Icon.ATTACH"
            @click="goToCreate(DBTable.EXERCISE_RESULTS, record.id)"
          />
        </QCardActions>

        <QCardActions v-if="parentTable === DBTable.MEASUREMENTS" class="col-auto">
          <QBtn
            label="Take Measurement"
            color="primary"
            class="full-width"
            :icon="Icon.MEASUREMENTS"
            @click="goToCreate(DBTable.MEASUREMENT_RESULTS, record.id)"
          />
        </QCardActions>
      </QCard>
    </div>

    <div class="col-12 text-grey text-center text-body1">{{ getRecordsCountDisplay(records) }}</div>

    <div v-if="records.length === 0 && defaultsFunc" class="col-12 text-center">
      <QBtn
        class="col-12 text-center"
        color="primary"
        :icon="Icon.DEFAULTS"
        :label="`Add ${DB.getLabel(props.parentTable, 'singular')} Defaults`"
        @click="defaultsFunc()"
      />
    </div>

    <div class="col-12 text-center">
      <QBtn
        class="col-12 text-center"
        color="positive"
        :icon="Icon.CREATE"
        :label="`Create ${DB.getLabel(parentTable, 'singular')}`"
        @click="goToCreate(parentTable)"
      />
    </div>
  </div>
</template>
