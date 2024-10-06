<script setup lang="ts">
import { AppHeaderColor } from '@/constants/global'
import { Icon, RouteName } from '@/types/general'
import { getDurationFromMilliseconds } from '@/utils/common'
import { useInterval } from '@vueuse/core'
import { ref, watch } from 'vue'
import { RouterView } from 'vue-router'

const counter = useInterval(1000)
const createdTimestamp = ref(Date.now())
const elapsedTime = ref('')

watch(counter, () => {
    elapsedTime.value = getDurationFromMilliseconds(Date.now() - createdTimestamp.value) || ''
})
</script>

<template>
    <QLayout view="hHh LpR fFf">
        <QHeader elevated :class="`bg-${AppHeaderColor}`">
            <QToolbar>
                <QToolbarTitle class="q-ml-xs">List Workout</QToolbarTitle>
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
                <div class="text-h6">{{ elapsedTime }}</div>
                <QSpace />
            </QToolbar>
        </QFooter>
    </QLayout>
</template>
