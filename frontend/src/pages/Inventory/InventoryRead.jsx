import configPage from './config';
import ReadInvoiceModule from '@/modules/InventoryModule/ReadInventoryModule';

export default function InvoiceRead() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <ReadInvoiceModule config={config} />;
}
