import configPage from './config';
import UpdateInvoiceModule from '@/modules/InventoryModule/UpdateInventoryModule';

export default function InvoiceUpdate() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <UpdateInvoiceModule config={config} />;
}
