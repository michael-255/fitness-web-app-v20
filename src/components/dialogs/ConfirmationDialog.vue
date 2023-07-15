<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import type { Icon } from '@/types/general'

const props = defineProps<{
  title: string
  message: string
  icon: Icon
  color: string
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
</script>

<template>
  <QDialog ref="dialogRef" @hide="onDialogHide">
    <QCard class="q-dialog-plugin">
      <QCardSection :class="`bg-${props.color} text-white q-py-sm`">
        <QIcon :name="icon" size="sm" class="q-pb-sm q-mr-md" />
        <span class="text-h6">{{ title }}</span>
      </QCardSection>

      <QCardSection class="q-mt-md">{{ message }}</QCardSection>

      <QCardActions align="right">
        <QBtn flat label="Cancel" @click="onDialogCancel" />
        <QBtn flat label="Confirm" :color="color" @click="onDialogOK" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
