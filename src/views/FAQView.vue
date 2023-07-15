<script setup lang="ts">
import { Icon } from '@/types/general'
import { AppName } from '@/constants/global'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - FAQ` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.FAQ" bannerTitle="FAQ">
    <QList bordered class="rounded-borders">
      <QExpansionItem label="What is this application?" header-class="text-weight-bold">
        <QCard>
          <QCardSection>
            <p>This application is called {{ AppName }}. It is a Vue 3 Typescript project.</p>

            <p>
              It is available for free to use and modify under the MIT license. You can learn more
              by going to the About page.
            </p>
          </QCardSection>
        </QCard>
      </QExpansionItem>

      <QSeparator />

      <QExpansionItem label="Where is my data stored?" header-class="text-weight-bold">
        <QCard>
          <QCardSection>
            <p>
              All of your data is being stored locally on the device and web browser you are using
              this application on. This means you retain control of your data at all times.
            </p>

            <p>
              However, this also means you are responsible for making backups of your data by using
              the export feature in Settings to download it.
            </p>
          </QCardSection>
        </QCard>
      </QExpansionItem>

      <QSeparator />

      <QExpansionItem
        label="How do I move my data to another device?"
        header-class="text-weight-bold"
      >
        <QCard>
          <QCardSection>
            <p>
              Use the export feature in Settings to download your data. You can email the exported
              data file to yourself so you can access it on your other device.
            </p>

            <p>
              Use the import feature in Settings once you are on your other device. This feature
              allows you to select and load your exported data to this device.
            </p>
          </QCardSection>
        </QCard>
      </QExpansionItem>

      <QSeparator />

      <QExpansionItem
        label="How do I troubleshoot application issues?"
        header-class="text-weight-bold"
      >
        <QCard>
          <QCardSection>
            <p>
              Your best bet is to go to the Settings page and access the Logs. You can view most
              errors and other events that occur in the application from there.
            </p>
          </QCardSection>
        </QCard>
      </QExpansionItem>
    </QList>
  </ResponsivePage>
</template>
