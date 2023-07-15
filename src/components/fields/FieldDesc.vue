<script setup lang="ts">
import { Limit, Icon } from '@/types/general'
import { textAreaSchema } from '@/models/_Parent'
import useActionStore from '@/stores/action'

const actionStore = useActionStore()
</script>

<template>
  <div class="text-weight-bold text-body1">Description</div>

  <QInput
    v-model="actionStore.record.desc"
    :rules="[(val: string) => textAreaSchema.safeParse(val).success || `Description cannot exceed ${Limit.MAX_TEXT_AREA} characters`]"
    :maxlength="Limit.MAX_TEXT_AREA"
    type="textarea"
    lazy-rules
    autogrow
    counter
    dense
    outlined
    color="primary"
    @blur="actionStore.record.desc = actionStore.record.desc?.trim()"
  >
    <template v-slot:append>
      <QIcon
        v-if="actionStore.record.desc !== ''"
        :name="Icon.CANCEL"
        @click="actionStore.record.desc = ''"
        class="cursor-pointer"
      />
    </template>
  </QInput>
</template>
