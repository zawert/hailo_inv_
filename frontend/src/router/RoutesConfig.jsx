
export const routesConfig = [
  {
    path: '/',
    component: 'Dashboard',
  },
  {
    path: '/customer',
    component: 'Customer',
  },
  {
    path: '/inventory',
    component: 'Inventory/index',
  },
  {
    path: '/inventory/create',
    component: 'Inventory/InventoryCreate',
  },
  {
    path: '/inventory/read/:id',
    component: 'Inventory/InventoryRead',
  },
  {
    path: '/inventory/update/:id',
    component: 'Inventory/InventoryUpdate',
  },
  {
    path: '/inventory/pay/:id',
    component: 'Inventory/InventoryRecordPayment',
  },
  {
    path: '/quote',
    component: 'Quote/index',
  },
  {
    path: '/quote/create',
    component: 'Quote/QuoteCreate',
  },
  {
    path: '/quote/read/:id',
    component: 'Quote/QuoteRead',
  },
  {
    path: '/quote/update/:id',
    component: 'Quote/QuoteUpdate',
  },
  {
    path: '/payment/inventory',
    component: 'PaymentInventory/index',
  },
  {
    path: '/payment/inventory/create',
    component: 'PaymentInventory/PaymentInventoryCreate',
  },
  {
    path: '/payment/inventory/read/:id',
    component: 'PaymentInventory/PaymentInventoryRead',
  },
  {
    path: '/payment/inventory/update/:id',
    component: 'PaymentInventory/PaymentInventoryUpdate',
  },
  {
    path: '/employee',
    component: 'Employee',
  },
  {
    path: '/admin',
    component: 'Admin',
  },
  {
    path: '/settings',
    component: 'Settings/Settings',
  },
  {
    path: '/payment/mode',
    component: 'PaymentMode',
  },
  {
    path: '/email',
    component: 'Email/index',
  },
  {
    path: '/email/read/:id',
    component: 'Email/EmailRead',
  },
  {
    path: '/email/update/:id',
    component: 'Email/EmailUpdate',
  },
  {
    path: '/settings/advanced',
    component: 'AdvancedSettings',
  },
  {
    path: '/profile',
    component: 'Profile',
  },
  {
    path: '/lead',
    component: 'Lead/index',
  },
  {
    path: '/lead/create',
    component: 'Lead/LeadCreate',
  },
  {
    path: '/lead/read/:id',
    component: 'Lead/LeadRead',
  },
  {
    path: '/lead/update/:id',
    component: 'Lead/LeadUpdate',
  },
  {
    path: '/offer',
    component: 'Offer/index',
  },
  {
    path: '/offer/create',
    component: 'Offer/OfferCreate',
  },
  {
    path: '/offer/read/:id',
    component: 'Offer/OfferRead',
  },
  {
    path: '/offer/update/:id',
    component: 'Offer/OfferUpdate',
  },
];
