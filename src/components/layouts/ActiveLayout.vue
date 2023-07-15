<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { RouterView } from 'vue-router'
import { AppHeaderColor } from '@/constants/global'
import { Icon, RouteName } from '@/types/general'
import { getDurationFromMilliseconds } from '@/utils/common'
import { useInterval } from '@vueuse/core'

const counter = useInterval(1000)
const workoutName: Ref<string> = ref('')
const workoutCreatedTimestamp: Ref<number> = ref(Date.now())
const workoutDuration: Ref<string> = ref('')

watch(counter, () => {
  workoutDuration.value =
    getDurationFromMilliseconds(Date.now() - workoutCreatedTimestamp.value) || ''
})
</script>

<template>
  <QLayout view="hHh LpR fFf">
    <QHeader elevated :class="`bg-${AppHeaderColor}`">
      <QToolbar>
        <QToolbarTitle class="q-ml-xs">{{ workoutName }}</QToolbarTitle>
        <QBtn flat round :icon="Icon.BACK" :to="{ name: RouteName.DASHBOARD }" />
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <RouterView v-slot="{ Component, route }">
        <transition name="global-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </QPageContainer>

    <QFooter elevated class="bg-primary">
      <QToolbar>
        <QSpace />
        <QIcon :name="Icon.STOPWATCH" size="sm" class="q-mr-sm" />
        <div class="text-h6">{{ workoutDuration }}</div>
        <QSpace />
      </QToolbar>
    </QFooter>
  </QLayout>
</template>
