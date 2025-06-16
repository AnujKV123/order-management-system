import React, { useCallback } from "react";
import { OrderItem } from "@/types/order";
import { QtyButton } from "@/components/common/QtyButton";
import Button from "@/components/common/Button";
import { Trash2 } from "lucide-react";
import "@/components/Styles/OrderItemRow.css";

const OrderItemRow = React.memo(
  ({
    item,
    onQuantityChange,
    onRemove,
  }: {
    item: OrderItem;
    onQuantityChange: (itemId: string, quantity: number) => void;
    onRemove: (itemId: string) => void;
  }) => {
    const handleQuantityChange = useCallback(
      (quantity: number) => {
        onQuantityChange(item.id, quantity);
      },
      [item.id, onQuantityChange]
    );

    const handleRemove = useCallback(() => {
      onRemove(item.id);
    }, [item.id, onRemove]);

    return (
      <div className="order-item-row">
        <div className="cell ">{item.skuName}</div>
        <div className="cell ">{item.skuCode}</div>
        <div className="cell ">${item.price.toFixed(2)}</div>
        <div className="cell ">
          <QtyButton value={item.quantity} onChange={handleQuantityChange} min={1} />
        </div>
        <div className="cell cell--subtotal">${item.subtotal.toFixed(2)}</div>
        <div className="cell ">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            className="remove-btn"
          >
            <Trash2 className="remove-icon" />
          </Button>
        </div>
      </div>
    );
  }
);

export default OrderItemRow;
