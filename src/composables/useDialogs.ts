import { useQuasar } from 'quasar'
import { Icon } from '@/types/general'
import type { AnyDBRecord, DBTable, InternalTable, ParentTable } from '@/types/database'
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog.vue'
import DismissalDialog from '@/components/dialogs/DismissalDialog.vue'
import InspectionDialog from '@/components/dialogs/InspectionDialog.vue'
import ChartingDialog from '@/components/dialogs/ChartingDialog.vue'

export default function useDialogs() {
  const $q = useQuasar()

  function confirmDialog(
    title: string,
    message: string,
    icon: Icon,
    color: string,
    onOkFunc: () => void
  ) {
    $q.dialog({
      component: ConfirmationDialog,
      componentProps: {
        title,
        message,
        icon,
        color,
      },
    }).onOk(() => {
      onOkFunc()
    })
  }

  function dismissDialog(
    title: string,
    message: string,
    icon: Icon = Icon.INFO,
    color: string = 'info'
  ) {
    $q.dialog({
      component: DismissalDialog,
      componentProps: {
        title,
        message,
        icon,
        color,
      },
    })
  }

  function inspectDialog(record: AnyDBRecord, table: DBTable | InternalTable.LOGS) {
    $q.dialog({
      component: InspectionDialog,
      componentProps: {
        record,
        table,
      },
    })
  }

  function chartsDialog(id: string, parentTable: ParentTable) {
    $q.dialog({
      component: ChartingDialog,
      componentProps: {
        id,
        parentTable,
      },
    })
  }

  return {
    confirmDialog,
    dismissDialog,
    inspectDialog,
    chartsDialog,
  }
}
