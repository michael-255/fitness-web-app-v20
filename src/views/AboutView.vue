<script setup lang="ts">
import { Icon, RouteName } from '@/types/general'
import { AppDescription, AppName } from '@/constants/global'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - About` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INFO" bannerTitle="About">
    <section>
      <p>{{ AppDescription }}</p>

      <p>
        Feel free to checkout my other projects or help support my work with a donation. Thanks for
        visiting!
      </p>

      <div class="row q-col-gutter-md justify-center">
        <div class="col-sm-4 col-xs-12">
          <QBtn
            class="full-width"
            color="primary"
            label="Blog"
            target="_blank"
            href="https://www.example.com"
            :icon="Icon.WEB"
          />
        </div>

        <div class="col-sm-4 col-xs-12">
          <QBtn
            class="full-width"
            color="primary"
            label="GitHub"
            target="_blank"
            href="https://github.com/michael-255"
            :icon="Icon.CODE"
          />
        </div>

        <div class="col-sm-4 col-xs-12">
          <QBtn
            class="full-width"
            color="warning"
            label="Donate"
            :to="{ name: RouteName.DONATE }"
            :icon="Icon.DONATE"
          />
        </div>
      </div>
    </section>
  </ResponsivePage>
</template>
