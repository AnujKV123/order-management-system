import React, { useState, useCallback, useMemo } from "react";
import Input from "@/components/common/Input";
import { FormValidation } from "@/validation/FormValidation";
import { SKU, OrderItem, CustomerDetails, AddressDetails } from "@/types/order";
import { SKUSelector } from "./SKUSelector";
import OrderItemRow from "./OrderItemRow";
import Button from "@/components/common/Button";
import { useOrderContext } from "@/contexts/OrderContext";
import { useToast } from "@/contexts/ToastContext";
import "@/components/Styles/Order.css";
interface OrderFormData {
  customer: CustomerDetails;
  address: AddressDetails;
}

export const CreateOrder = () => {
  const { OrderValidation } = FormValidation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = OrderValidation;

  const { dispatch } = useOrderContext();
  const { addToast } = useToast();

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const totalAmount = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  }, [orderItems]);

  const handleAddSKU = useCallback(
    (sku: SKU) => {
      const existingItem = orderItems.find((item) => item.skuId === sku.id);

      if (existingItem) {
        setOrderItems((items) =>
          items.map((item) =>
            item.skuId === sku.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: (item.quantity + 1) * item.price,
                }
              : item
          )
        );
      } else {
        const newItem: OrderItem = {
          id: `item-${Date.now()}-${Math.random()}`,
          skuId: sku.id,
          skuName: sku.name,
          skuCode: sku.code,
          price: sku.price,
          quantity: 1,
          subtotal: sku.price,
        };
        setOrderItems((items) => [...items, newItem]);
      }
    },
    [orderItems]
  );

  const handleQuantityChange = useCallback(
    (itemId: string, quantity: number) => {
      setOrderItems((items) =>
        items.map((item) =>
          item.id === itemId
            ? { ...item, quantity, subtotal: quantity * item.price }
            : item
        )
      );
    },
    []
  );

  const handleRemoveItem = useCallback((itemId: string) => {
    setOrderItems((items) => items.filter((item) => item.id !== itemId));
  }, []);

  const resetForm = useCallback(() => {
    reset();
    setOrderItems([]);
  }, [reset]);

  const handleSubmitOrder = useCallback(
    (data: OrderFormData) => {
      if (orderItems.length === 0) {
        addToast("Please add at least one item to the order", "error");
        return;
      }

      const newOrder = {
        id: `ORD-${Date.now()}`,
        customer: data.customer,
        address: data.address,
        items: orderItems,
        totalAmount,
        status: "New" as const,
        createdAt: new Date().toISOString(),
      };

      dispatch({ type: "ADD_ORDER", payload: newOrder });

      addToast(`Order ${newOrder.id} has been created successfully`, "success");

      reset();
      setOrderItems([]);
    },
    [orderItems, totalAmount, dispatch, reset]
  );

  return (
    <div className="formContainer">
      <h1 className="mainTitle">Create New Order</h1>
      <form onSubmit={handleSubmit(handleSubmitOrder)} className="form">
        <div className="section">
          <h2 className="sectionTitle">Order Items</h2>
          <SKUSelector onSelectSKU={handleAddSKU} />
          {orderItems.length > 0 && (
            <div className="container-oredr-items-sku">
              <div className="itemList">
                <div className="itemHeader">
                  <div>SKU Name</div>
                  <div>SKU Code</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Subtotal</div>
                  <div>Action</div>
                </div>
                {orderItems.map((item) => (
                  <OrderItemRow
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}

                <div className="totalRow">Total: ${totalAmount.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <h2 className="sectionTitle">Customer Details</h2>
          <div className="input-wrapper-container">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              register={register}
              name="customer.fullName"
              type="text"
              error={errors.customer?.fullName?.message}
            />
          </div>
          <div className="input-wrapper-container">
            <Input
              label="Email"
              placeholder="Enter email"
              register={register}
              name="customer.email"
              type="text"
              error={errors.customer?.email?.message}
            />
          </div>
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            register={register}
            name="customer.phone"
            type="text"
            error={errors.customer?.phone?.message}
          />
        </div>

        <div className="section">
          <h2 className="sectionTitle">Address Details</h2>
          <Input
            label="Address Line"
            placeholder="Enter address"
            register={register}
            name="address.addressLine"
            type="text"
            error={errors.address?.addressLine?.message}
          />
          <Input
            label="City"
            placeholder="Enter city"
            register={register}
            name="address.city"
            type="text"
            error={errors.address?.city?.message}
          />
          <Input
            label="Country"
            placeholder="Enter country"
            register={register}
            name="address.country"
            type="text"
            error={errors.address?.country?.message}
          />
        </div>

        <div className="actions">
          <Button variant="outline" size="md" onClick={resetForm}>
            Reset
          </Button>
          <Button variant="primary" size="md" type="submit">
            Create Order
          </Button>
        </div>
      </form>
    </div>
  );
};
