<script setup lang="ts">
import { Icon } from '@/types/general'

defineProps<{
  bannerIcon?: Icon
  bannerTitle?: string
  showPageError?: boolean
  showPageNoData?: boolean
}>()
</script>

<template>
  <QPage padding class="q-mx-sm">
    <div class="row justify-center">
      <div class="col-md-8 col-sm-10 col-xs-12">
        <!-- Optional Banner -->
        <div v-if="bannerIcon && bannerTitle" class="text-h5 text-bold q-mb-md q-mr-xs text-center">
          <QIcon class="q-pb-xs q-pr-xs" :name="bannerIcon" />
          {{ bannerTitle }}
        </div>

        <!-- Page Error - catch-all for errors at View level -->
        <QCard v-if="showPageError">
          <QCardSection>
            <div class="text-h6 q-mb-md">Page Error</div>
            <div>
              The page was unable to load due to an error. Troubleshoot using the application Logs
              if the problem persists.
            </div>
          </QCardSection>
        </QCard>

        <!-- Page No Data - catch-all for missing data at View level -->
        <div v-else-if="showPageNoData">
          <QCard class="q-mb-md">
            <QCardSection>
              <div class="text-h6 q-mb-md">No Data Available</div>
              <div>This item may not have any data to display on the this page.</div>
            </QCardSection>
          </QCard>
        </div>

        <!-- Extra space at bottom of page for scroller -->
        <div class="q-mb-xl" v-else>
          <slot />
        </div>
      </div>
    </div>

    <QPageScroller>
      <QBtn fab :icon="Icon.UP" color="accent" />
    </QPageScroller>
  </QPage>
</template>
