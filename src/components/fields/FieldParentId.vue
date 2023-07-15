<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { Icon, RouteName } from '@/types/general'
import { idSchema } from '@/models/_Entity'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'
import useRouting from '@/composables/useRouting'

const { route, routeTable } = useRouting()
const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<{ value: string; label: string; disable: boolean }[]> = ref([])

onMounted(async () => {
  try {
    if (routeTable) {
      const parentTable = DB.getParentTable(routeTable)

      options.value = await DB.getParentIdOptions(parentTable)

      const parentIdMatch = options.value.some((i) => i.value === actionStore.record.parentId)

      if (!parentIdMatch) {
        actionStore.record.parentId = undefined // If no options, or id is invalid
      }
    }
  } catch (error) {
    log.error('Error with parent id field', error)
  }
})
</script>

<template>
  <div class="text-weight-bold text-body1">Parent Record</div>

  <p>
    The parent record that this child record is associated with. This cannot be updated once set
    during record creation.
  </p>

  <QSelect
    :disable="route.name === RouteName.EDIT"
    v-model="actionStore.record.parentId"
    :rules="[(val: string) => idSchema.safeParse(val).success || 'Required']"
    :options="options"
    emit-value
    map-options
    options-dense
    dense
    outlined
    color="primary"
  >
    <template v-if="route.name === RouteName.EDIT" v-slot:prepend>
      <QIcon color="warning" :name="Icon.LOCK" />
    </template>
  </QSelect>
</template>
