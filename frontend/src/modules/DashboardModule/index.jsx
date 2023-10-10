import React from 'react';
import { Row, Col } from 'antd';
import dayjs from 'dayjs';

import { DashboardLayout } from '@/layout';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

import RecentTable from './components/RecentTable';

import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';


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
  },
  {
    title: 'Offer DP',
    dataIndex: 'offerDiscountedPrice',
  },
  {
    title: 'Without Tax',
    dataIndex: 'withoutTaxPrice',
  },
];

function formatCurrency(value) {
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function DashboardModule() {
  const { result: invoiceResult, isLoading: invoiceLoading } = useFetch(() =>
    request.summary({ entity: 'inventory' })
  );

  const { result: quoteResult, isLoading: quoteLoading } = useFetch(() =>
    request.summary({ entity: 'quote' })
  );

  const { result: offerResult, isLoading: offerLoading } = useFetch(() =>
    request.summary({ entity: 'offer' })
  );

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  const entityData = [
    {
      result: invoiceResult,
      isLoading: invoiceLoading,
      entity: 'inventory',
    },
    {
      result: quoteResult,
      isLoading: quoteLoading,
      entity: 'quote',
    },
    {
      result: offerResult,
      isLoading: offerLoading,
      entity: 'offer',
    }
  ];

  const cards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;

    if (entity === 'inventory') return null;

    return (
      <SummaryCard
        key={index}
        title={data?.entity === 'paymentInvoice' ? 'Payment' : data?.entity}
        tagColor={
          data?.entity === 'inventory' ? 'cyan' : data?.entity === 'quote' ? 'purple' : 'green'
        }
        prefix={'This month'}
        isLoading={isLoading}
        tagContent={result?.total && formatCurrency(result?.total)}
      />
    );
  });

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;

    if (['payment', 'inventory'].includes(entity)) return null;

    return (
      <PreviewCard
        key={index}
        title={`${data?.entity.charAt(0).toUpperCase() + data?.entity.slice(1)} Preview`}
        isLoading={isLoading}
        entity={entity}
        
        statistics={
          !isLoading &&
          result?.performance?.map((item) => ({
            tag: item?.status,
            color: 'blue',
            value: item?.percentage,
          }))
        }
      />
    );
  });

  return (
    <DashboardLayout>
      <Row gutter={[10, 10]} >
        {cards}
        <SummaryCard
          title={'Due Balance'}
          tagColor={'red'}
          prefix={'Not Paid'}
          isLoading={invoiceLoading}
          tagContent={
            invoiceResult?.total_undue &&
            `$ ${invoiceResult?.total_undue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          }
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
          <div className="whiteBox shadow" style={{ minHeight: '380px', height: '100%' }}>
            <Row className="pad10" gutter={[0, 0]} >
              {statisticCards}
            </Row>
          </div>
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
          <CustomerPreviewCard
            isLoading={clientLoading}
            activeCustomer={clientResult?.active}
            newCustomer={clientResult?.new}
          />
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow" style={{ height: '100%' }}>
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Recent Inventory</h3>
            </div>

            <RecentTable entity={'inventory'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>

        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow" style={{ height: '100%' }}>
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Recent Quotes</h3>
            </div>
            <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
