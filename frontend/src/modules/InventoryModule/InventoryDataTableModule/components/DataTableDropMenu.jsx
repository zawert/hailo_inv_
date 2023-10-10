import { Menu } from 'antd';

import {
  DeleteOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectItemById } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';

import uniqueId from '@/utils/uinqueId';

export default function DataTableDropMenu({ row, entity }) {
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();
  const { modal } = erpContextAction;
  const item = useSelector(selectItemById(row._id));

  function Delete() {
    dispatch(erp.currentAction({ actionType: 'delete', data: item }));
    modal.open();
  }
  return (
    <Menu style={{ minWidth: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<DeleteOutlined />} onClick={Delete}>
        Delete
      </Menu.Item>
    </Menu>
  );
}
