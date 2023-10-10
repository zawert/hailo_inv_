import dayjs from 'dayjs';
import configPage from './config';
import { useMoney } from '@/settings';
import InventoryDataTableModule from '@/modules/InventoryModule/InventoryDataTableModule';

export default function Inventory() {
  const { moneyRowFormatter } = useMoney();

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'name,surname,birthday',
  };
  const entityDisplayLabels = ['number', 'client.company'];
  const dataTableColumns = [
    {
      title: 'Date Added',
      dataIndex: 'created',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Item Name',
      dataIndex: 'itemName',
    },
    {
      title: 'MRP',
      dataIndex: 'normalDiscountedPrice',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'Offer DP',
      dataIndex: 'offerDiscountedPrice',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'Without Tax',
      dataIndex: 'withoutTaxPrice',
      render: (amount) => moneyRowFormatter({ amount }),
    },
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <InventoryDataTableModule config={config} />;
}
