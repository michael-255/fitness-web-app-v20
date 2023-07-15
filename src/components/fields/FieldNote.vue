<script setup lang="ts">
import { Icon, Limit } from '@/types/general'
import { textAreaSchema } from '@/models/_Parent'
import useActionStore from '@/stores/action'

const actionStore = useActionStore()
</script>

<template>
  <div class="text-weight-bold text-body1">Note</div>

  <p>Text note about the record that can be viewed on the Dashboard.</p>

  <QInput
    v-model="actionStore.record.note"
    :rules="[(val: string) => textAreaSchema.safeParse(val).success || `Note cannot exceed ${Limit.MAX_TEXT_AREA} characters`]"
    :maxlength="Limit.MAX_TEXT_AREA"
    type="textarea"
    lazy-rules
    autogrow
    counter
    dense
    outlined
    color="primary"
    @blur="actionStore.record.note = actionStore.record.note?.trim()"
  >
    <template v-slot:append>
      <QIcon
        v-if="actionStore.record.note !== ''"
        :name="Icon.CANCEL"
        @click="actionStore.record.note = ''"
        class="cursor-pointer"
      />
    </template>
  </QInput>
</template>
