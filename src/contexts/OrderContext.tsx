import React, { createContext, useContext, useReducer } from "react";
import type { OrderState, OrderAction } from "../types/order";
import type { ReactNode } from "react";

const initialState: OrderState = {
  skus: [
    {
      id: "1",
      name: "Product 1",
      code: "SKU001",
      price: 561.42,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-15T20:46:40.240656",
    },
    {
      id: "2",
      name: "Product 11",
      code: "SKU002",
      price: 1064.27,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-14T20:46:40.240656",
    },
    {
      id: "3",
      name: "Product 111",
      code: "SKU003",
      price: 155.58,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-13T20:46:40.240656",
    },
    {
      id: "4",
      name: "Product 1111",
      code: "SKU004",
      price: 972.65,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-12T20:46:40.240656",
    },
    {
      id: "5",
      name: "Product 11111",
      code: "SKU005",
      price: 845.82,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-11T20:46:40.240656",
    },
    {
      id: "6",
      name: "Product 11111111",
      code: "SKU006",
      price: 737.11,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-10T20:46:40.240656",
    },
    {
      id: "7",
      name: "Product 111111111",
      code: "SKU007",
      price: 769.87,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-09T20:46:40.240656",
    },
    {
      id: "8",
      name: "Product 1111111111",
      code: "SKU008",
      price: 1014.31,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-08T20:46:40.240656",
    },
    {
      id: "9",
      name: "Product 111111111111",
      code: "SKU009",
      price: 898.89,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-07T20:46:40.240656",
    },
    {
      id: "10",
      name: "Product 111111111111111111",
      code: "SKU010",
      price: 873.29,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-06T20:46:40.240656",
    },
    {
      id: "11",
      name: "Product 111111111111111111111111",
      code: "SKU011",
      price: 984.35,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-05T20:46:40.240656",
    },
    {
      id: "12",
      name: "Product 1111111111111111111",
      code: "SKU012",
      price: 934.59,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-04T20:46:40.240656",
    },
    {
      id: "13",
      name: "Product 11111111111111",
      code: "SKU013",
      price: 366.69,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-03T20:46:40.240656",
    },
    {
      id: "14",
      name: "Product 1111111111",
      code: "SKU014",
      price: 189.16,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-02T20:46:40.240656",
    },
    {
      id: "15",
      name: "Product 11111111111",
      code: "SKU015",
      price: 444.23,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-06-01T20:46:40.240656",
    },
    {
      id: "16",
      name: "Product 111111111111",
      code: "SKU016",
      price: 792.86,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-31T20:46:40.240656",
    },
    {
      id: "17",
      name: "Product 17",
      code: "SKU017",
      price: 183.36,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-30T20:46:40.240656",
    },
    {
      id: "18",
      name: "Product 18",
      code: "SKU018",
      price: 278.54,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-29T20:46:40.240656",
    },
    {
      id: "19",
      name: "Product 19",
      code: "SKU019",
      price: 904.08,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-28T20:46:40.240656",
    },
    {
      id: "20",
      name: "Product 20",
      code: "SKU020",
      price: 595.23,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-27T20:46:40.240656",
    },
    {
      id: "21",
      name: "Product 21",
      code: "SKU021",
      price: 773.75,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-26T20:46:40.240656",
    },
    {
      id: "22",
      name: "Product 22",
      code: "SKU022",
      price: 891.02,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-25T20:46:40.240656",
    },
    {
      id: "23",
      name: "Product 23",
      code: "SKU023",
      price: 352.1,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-24T20:46:40.240656",
    },
    {
      id: "24",
      name: "Product 24",
      code: "SKU024",
      price: 456.54,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-23T20:46:40.240656",
    },
    {
      id: "25",
      name: "Product 25",
      code: "SKU025",
      price: 174.4,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-22T20:46:40.240656",
    },
    {
      id: "26",
      name: "Product 26",
      code: "SKU026",
      price: 1026.51,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-21T20:46:40.240656",
    },
    {
      id: "27",
      name: "Product 27",
      code: "SKU027",
      price: 274.98,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-20T20:46:40.240656",
    },
    {
      id: "28",
      name: "Product 28",
      code: "SKU028",
      price: 117.73,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-19T20:46:40.240656",
    },
    {
      id: "29",
      name: "Product 29",
      code: "SKU029",
      price: 124.36,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-18T20:46:40.240656",
    },
    {
      id: "30",
      name: "Product 30",
      code: "SKU030",
      price: 693.25,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-17T20:46:40.240656",
    },
    {
      id: "31",
      name: "Product 31",
      code: "SKU031",
      price: 561.08,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-16T20:46:40.240656",
    },
    {
      id: "32",
      name: "Product 32",
      code: "SKU032",
      price: 754.12,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-15T20:46:40.240656",
    },
    {
      id: "33",
      name: "Product 33",
      code: "SKU033",
      price: 435.89,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-14T20:46:40.240656",
    },
    {
      id: "34",
      name: "Product 34",
      code: "SKU034",
      price: 735.36,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-13T20:46:40.240656",
    },
    {
      id: "35",
      name: "Product 35",
      code: "SKU035",
      price: 900.62,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-12T20:46:40.240656",
    },
    {
      id: "36",
      name: "Product 36",
      code: "SKU036",
      price: 692.3,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-11T20:46:40.240656",
    },
    {
      id: "37",
      name: "Product 37",
      code: "SKU037",
      price: 482.03,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-10T20:46:40.240656",
    },
    {
      id: "38",
      name: "Product 38",
      code: "SKU038",
      price: 572.57,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-09T20:46:40.240656",
    },
    {
      id: "39",
      name: "Product 39",
      code: "SKU039",
      price: 603.33,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-08T20:46:40.240656",
    },
    {
      id: "40",
      name: "Product 40",
      code: "SKU040",
      price: 482.25,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-07T20:46:40.240656",
    },
    {
      id: "41",
      name: "Product 41",
      code: "SKU041",
      price: 465.72,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-06T20:46:40.240656",
    },
    {
      id: "42",
      name: "Product 42",
      code: "SKU042",
      price: 943.84,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-05T20:46:40.240656",
    },
    {
      id: "43",
      name: "Product 43",
      code: "SKU043",
      price: 398.11,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-04T20:46:40.240656",
    },
    {
      id: "44",
      name: "Product 44",
      code: "SKU044",
      price: 641.08,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-03T20:46:40.240656",
    },
    {
      id: "45",
      name: "Product 45",
      code: "SKU045",
      price: 878.21,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-02T20:46:40.240656",
    },
    {
      id: "46",
      name: "Product 46",
      code: "SKU046",
      price: 1054.12,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-05-01T20:46:40.240656",
    },
    {
      id: "47",
      name: "Product 47",
      code: "SKU047",
      price: 764.71,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-04-30T20:46:40.240656",
    },
    {
      id: "48",
      name: "Product 48",
      code: "SKU048",
      price: 947.97,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-04-29T20:46:40.240656",
    },
    {
      id: "49",
      name: "Product 49",
      code: "SKU049",
      price: 208.88,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-04-28T20:46:40.240656",
    },
    {
      id: "50",
      name: "Product 50",
      code: "SKU050",
      price: 787.73,
      status: {
        label: "Active",
        value: "active",
      },
      createdAt: "2025-04-27T20:46:40.240656",
    },
  ],
  orders: [
    {
      id: "ORD-1750062356901",
      customer: {
        fullName: "Alice Johnson",
        email: "alice@example.com",
        phone: "9876543210",
      },
      address: {
        addressLine: "123 Elm Street",
        city: "Springfield",
        country: "USA",
      },
      items: [
        {
          id: "item-1750062330078-0.1350858195519109",
          skuId: "1",
          skuName: "Product 1",
          skuCode: "SKU001",
          price: 561.42,
          quantity: 1,
          subtotal: 561.42,
        },
      ],
      totalAmount: 561.42,
      status: "New",
      createdAt: "2025-06-16T08:25:56.901Z",
    },
    {
      id: "ORD-1750062356902",
      customer: {
        fullName: "Bob Smith",
        email: "bob@example.com",
        phone: "9988776655",
      },
      address: {
        addressLine: "456 Oak Avenue",
        city: "Lakeside",
        country: "USA",
      },
      items: [
        {
          id: "item-1750062330078-0.2350858195519109",
          skuId: "2",
          skuName: "Product 2",
          skuCode: "SKU002",
          price: 299.99,
          quantity: 2,
          subtotal: 599.98,
        },
      ],
      totalAmount: 599.98,
      status: "Delivered",
      createdAt: "2025-06-15T12:00:00.000Z",
    },
    {
      id: "ORD-1750062356903",
      customer: {
        fullName: "Charlie Davis",
        email: "charlie@example.com",
        phone: "9123456789",
      },
      address: {
        addressLine: "789 Pine Blvd",
        city: "Riverside",
        country: "Canada",
      },
      items: [
        {
          id: "item-1750062330078-0.3350858195519109",
          skuId: "3",
          skuName: "Product 3",
          skuCode: "SKU003",
          price: 150.0,
          quantity: 3,
          subtotal: 450.0,
        },
      ],
      totalAmount: 450.0,
      status: "Delivered",
      createdAt: "2025-06-14T09:45:30.000Z",
    },
    {
      id: "ORD-1750062356904",
      customer: {
        fullName: "Dana White",
        email: "dana@example.com",
        phone: "8001234567",
      },
      address: {
        addressLine: "321 Maple Drive",
        city: "Hilltown",
        country: "UK",
      },
      items: [
        {
          id: "item-1750062330078-0.4350858195519109",
          skuId: "4",
          skuName: "Product 4",
          skuCode: "SKU004",
          price: 89.99,
          quantity: 5,
          subtotal: 449.95,
        },
      ],
      totalAmount: 449.95,
      status: "Cancelled",
      createdAt: "2025-06-13T16:30:45.000Z",
    },
    {
      id: "ORD-1750062356905",
      customer: {
        fullName: "Ethan Lee",
        email: "ethan@example.com",
        phone: "7009876543",
      },
      address: {
        addressLine: "99 Sunset Street",
        city: "Oceanview",
        country: "Australia",
      },
      items: [
        {
          id: "item-1750062330078-0.5350858195519109",
          skuId: "5",
          skuName: "Product 5",
          skuCode: "SKU005",
          price: 120.75,
          quantity: 2,
          subtotal: 241.5,
        },
      ],
      totalAmount: 241.5,
      status: "New",
      createdAt: "2025-06-12T18:15:10.000Z",
    },
  ],
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_SKU":
      return {
        ...state,
        skus: [...state.skus, action.payload],
      };
    case "UPDATE_SKU":
      return {
        ...state,
        skus: state.skus.map((sku) =>
          sku.id === action.payload.id ? action.payload : sku
        ),
      };
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    default:
      return state;
  }
}

interface OrderContextType {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
}
