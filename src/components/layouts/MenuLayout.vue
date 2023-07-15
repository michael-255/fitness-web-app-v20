<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppHeaderColor, AppName } from '@/constants/global'
import { Icon, RouteName } from '@/types/general'
import useUIStore from '@/stores/ui'
import useRouting from '@/composables/useRouting'
import DB from '@/services/Database'

const { route, goToRecordsData, goBack } = useRouting()
const uiStore = useUIStore()
</script>

<template>
  <QLayout view="hHh LpR lff">
    <QHeader elevated :class="`bg-${AppHeaderColor}`">
      <QToolbar>
        <QBtn flat round :icon="Icon.MENU" @click="uiStore.drawer = !uiStore.drawer" />

        <QToolbarTitle>{{ AppName }}</QToolbarTitle>

        <QBtn
          v-if="route.name !== RouteName.DASHBOARD"
          flat
          round
          :icon="Icon.BACK"
          @click="goBack()"
        />

        <div v-else>
          <QBtn
            class="q-px-sm q-mr-sm"
            color="info"
            :icon="Icon.PARENTS"
            @click="goToRecordsData(uiStore.dashboardSelection)"
          />
          <QBtn
            class="q-px-sm"
            color="info"
            :icon="Icon.CHILDREN"
            @click="goToRecordsData(DB.getChildTable(uiStore.dashboardSelection))"
          />
        </div>
      </QToolbar>
    </QHeader>

    <QDrawer v-model="uiStore.drawer" :width="250" show-if-above bordered side="left">
      <div class="row justify-center">
        <QAvatar size="96px" class="q-my-md">
          <img src="@/assets/menu-avatar.png" />
        </QAvatar>
      </div>

      <QList>
        <QItem clickable v-ripple :to="{ name: RouteName.DASHBOARD }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.DASHBOARD" />
          </QItemSection>
          <QItemSection>Dashboard</QItemSection>
        </QItem>

        <QSeparator spaced="md" inset />

        <QItem clickable v-ripple :to="{ name: RouteName.SETTINGS }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.SETTINGS" />
          </QItemSection>
          <QItemSection>Settings</QItemSection>
        </QItem>

        <QItem clickable v-ripple :to="{ name: RouteName.FAQ }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.FAQ" />
          </QItemSection>
          <QItemSection>FAQ</QItemSection>
        </QItem>

        <QItem clickable v-ripple :to="{ name: RouteName.ABOUT }">
          <QItemSection avatar>
            <QIcon color="primary" :name="Icon.INFO" />
          </QItemSection>
          <QItemSection>About</QItemSection>
        </QItem>

        <QItem clickable v-ripple active-class="text-warning" :to="{ name: RouteName.DONATE }">
          <QItemSection avatar>
            <QIcon color="warning" :name="Icon.DONATE" />
          </QItemSection>
          <QItemSection>Donate</QItemSection>
        </QItem>
      </QList>
    </QDrawer>

    <QPageContainer>
      <RouterView v-slot="{ Component, route }">
        <transition name="global-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </QPageContainer>
  </QLayout>
</template>
