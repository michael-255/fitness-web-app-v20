<script setup lang="ts">
import { Limit } from '@/types/general'
import { nameSchema } from '@/models/_Parent'
import useActionStore from '@/stores/action'

const actionStore = useActionStore()
</script>

<template>
  <div class="text-weight-bold text-body1">Name</div>

  <QInput
    v-model="actionStore.record.name"
    :rules="[(val: string) => nameSchema.safeParse(val).success || `Name must be between ${Limit.MIN_NAME} and ${Limit.MAX_NAME} characters`]"
    :maxlength="Limit.MAX_NAME"
    type="text"
    lazy-rules
    counter
    dense
    outlined
    color="primary"
    @blur="actionStore.record.name = actionStore.record.name?.trim()"
  />
</template>
