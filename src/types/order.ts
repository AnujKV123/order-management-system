
export interface SKU {
  id: string;
  name: string;
  code: string;
  price: number;
  status: {label: string, value: string};
  createdAt: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface AddressDetails {
  addressLine: string;
  city: string;
  country: string;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
}

export interface Address {
  addressLine: string;
  city: string;
  country: string;
}

export interface OrderItem {
  id: string;
  skuId: string;
  skuName: string;
  skuCode: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export type OrderStatus = 'New' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customer: Customer;
  address: Address;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderState {
  skus: SKU[];
  orders: Order[];
}

export type OrderAction =
  | { type: 'ADD_SKU'; payload: SKU }
  | { type: 'UPDATE_SKU'; payload: SKU }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: OrderStatus } };
