import React from 'react';
import { Form, Input, Button, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

export default function InventoryForm({ subTotal = 0, current = null }) {

  return (
    <>
        <Col className="gutter-row" span={5}>
          <Form.Item label="Item Name" name="itemName">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={3}>
        <Form.Item label="Normal DP" name="normalDiscountedPrice">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={3}>
        <Form.Item label="Offer DP" name="offerDiscountedPrice">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={3}>
        <Form.Item label="Without Tax" name="withoutTaxPrice">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item label="MRP" name="price">
            <Input />
          </Form.Item>
        </Col>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                Save Item
              </Button>
            </Form.Item>
          </Col>
         
        </Row>
     
      </div>
    </>
  );
}
