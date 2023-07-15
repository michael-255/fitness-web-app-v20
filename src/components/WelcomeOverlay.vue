<script setup lang="ts">
import { Icon, RouteName } from '@/types/general'
import { type Ref, ref, onMounted } from 'vue'
import { AppDescription, AppName } from '@/constants/global'
import { SettingKey } from '@/models/Setting'
import DB from '@/services/Database'

const exampleFavorite: Ref<number> = ref(0)
const showWelcome: Ref<any> = ref(false)

onMounted(async () => {
  showWelcome.value = Boolean(await DB.getSettingValue(SettingKey.WELCOME_OVERLAY))
})

async function onCloseWelcomeOverlay() {
  await DB.setSetting(SettingKey.WELCOME_OVERLAY, false)
  showWelcome.value = false
}
</script>

<template>
  <QDialog v-model="showWelcome" persistent>
    <QCard flat square>
      <QCardSection>
        <p class="text-h6">Welcome to {{ AppName }}</p>

        <p>{{ AppDescription }}</p>

        <p>
          Continue reading to learn more, or scroll to the bottom and click the "Start Using App"
          button to jump right in.
        </p>

        <div class="q-mb-md">
          <p>
            You are currently on the Dashboard page. This page gives you quick access to the primary
            data you work with in the app. You can favorite items on the Dashboard by clicking the
            star icon in the top right corner of the item. This prioritizes the item to the top of
            the list.
          </p>
          <QRating
            v-model="exampleFavorite"
            :max="1"
            :icon="Icon.FAVORITE_OFF"
            :icon-selected="Icon.FAVORITE_ON"
            color="warning"
            size="md"
          />
        </div>

        <div class="q-mb-md">
          <p>
            You can navigate through the app using the menu in the top left corner of the page. An
            example of the menu button is below. The menu gives you access to the primary data
            tables, Frequently Asked Questions (FAQ), Settings, and more. More advanced operations
            for the app are available on the Settings page.
          </p>
          <QBtn disable color="primary" class="q-px-sm" :icon="Icon.MENU" />
        </div>

        <div class="q-mb-md">
          <p>
            You can access the data tables for the current Dashboard selection by clicking the
            buttons in the top right corner of the page. The left button is for the parent records.
            The right button is for the child records.
          </p>
          <QBtn disable color="info" class="q-px-sm q-mr-sm" :icon="Icon.PARENTS" />
          <QBtn disable color="info" class="q-px-sm" :icon="Icon.CHILDREN" />
        </div>

        <div class="q-mb-md">
          <p>
            Hope you find {{ AppName }} useful. Please consider donating to help me continue to
            create and maintain apps like this. Thank you!
          </p>
          <QBtn
            color="warning"
            label="Donate"
            :to="{ name: RouteName.DONATE }"
            :icon="Icon.DONATE"
          />
        </div>

        <div>
          <p>Click the button below when you are ready to get started.</p>
          <QBtn
            no-caps
            label="Start Using App"
            class="full-width"
            size="lg"
            color="positive"
            :icon="Icon.READY"
            @click="onCloseWelcomeOverlay()"
          />
        </div>
      </QCardSection>
    </QCard>
  </QDialog>
</template>
