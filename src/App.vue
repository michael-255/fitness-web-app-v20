<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { onMounted, type Ref, ref, watch, markRaw } from 'vue'
import { Icon } from '@/types/general'
import { AppDescription } from '@/constants/global'
import { useMeta } from 'quasar'
import ErrorLayout from '@/components/layouts/ErrorLayout.vue'
import useLogger from '@/composables/useLogger'
import useNotifications from '@/composables/useNotifications'
import DB from '@/services/Database'

/**
 * Sets up the core meta tags and links for the app. These are for things like the favicons and manifest.
 * Do NOT overwrite these specific properties in another useMeta().
 */
useMeta({
  meta: {
    description: { name: 'description', content: AppDescription },
    charset: { charset: 'UTF-8' },
    viewport: {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    themeColor: { name: 'theme-color', content: '#1976D2' }, // Brand color
  },

  link: {
    manifest: {
      rel: 'manifest',
      href: `${import.meta.env.BASE_URL}manifest.json`,
    },
    appleTouchIcon: {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: `${import.meta.env.BASE_URL}apple-touch-icon.png`,
    },
    favicon32: {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: `${import.meta.env.BASE_URL}favicon-32x32.png`,
    },
    favicon16: {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: `${import.meta.env.BASE_URL}favicon-16x16.png`,
    },
  },

  noscript: {
    default:
      'Your browser does not support JavaScript or has it disabled. This website requires JavaScript to function properly. Please consider upgrading your browser or enabling JavaScript to use this site.',
  },
})

const { log } = useLogger()
const { notify } = useNotifications()
const route = useRoute()

const layout: Ref<any> = ref(null)

onMounted(async () => {
  try {
    await DB.initSettings()
    log.silentDebug('Settings initialized')
  } catch (error) {
    // If the settings are not initialized, the database may have had an error or not be open
    // Must use basic print log since it doesn't require the DB or notify'
    log.print('Error initializing settings', error)
    notify('Error initializing settings', Icon.ERROR, 'error')
  }

  try {
    const logsPurged = await DB.purgeLogs()
    log.silentDebug('Expired logs purged', { logsPurged })
  } catch (error) {
    log.error('Error purging expired logs', error)
  }
})

/**
 * Watching route for the meta layout property to change. Sets the layout component.
 */
watch(
  () => route.meta?.layout as string,
  async (metaLayout) => {
    try {
      if (!metaLayout) return
      // metaLayout must exist && the imported component
      const component = metaLayout && (await import(`@/components/layouts/${metaLayout}.vue`))
      // markRaw to avoid reactivity on component definition
      // Use the error layout if the component is missing
      layout.value = markRaw(component?.default || ErrorLayout)
    } catch (error) {
      layout.value = markRaw(ErrorLayout)
      log.error('Error with route layout watcher', error)
    }
  },
  { immediate: true }
)
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
