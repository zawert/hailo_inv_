import configPage from './config';
import CreateInvoiceModule from '@/modules/InventoryModule/CreateInventoryModule';

const config = {
  ...configPage,
};

export default function InventoryCreate() {
  return <CreateInvoiceModule config={config} />;
}
