<script setup lang="ts">
import { Icon } from '@/types/general'
import { AppName } from '@/constants/global'
import { useMeta } from 'quasar'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - Active` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INFO" bannerTitle="Active"></ResponsivePage>
</template>
