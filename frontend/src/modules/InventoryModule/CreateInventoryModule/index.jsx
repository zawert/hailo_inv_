import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import InvoiceForm from '@/modules/InventoryModule/Forms/InventoryForm';

export default function CreateInvoiceModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={InvoiceForm} />
    </ErpLayout>
  );
}
