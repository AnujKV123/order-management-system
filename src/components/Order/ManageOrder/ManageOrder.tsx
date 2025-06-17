import React, { useMemo, useState, useCallback, useEffect } from "react";
import Table from "@/components/common/Table";
import { useOrderContext } from "@/contexts/OrderContext";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { OrderStatus } from "@/types/order";
import { useToast } from "@/contexts/ToastContext";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
  <input type="checkbox" checked={checked} onChange={onChange} />
);

export const ManageOrder = () => {
  const { state, dispatch } = useOrderContext();
  const { addToast } = useToast();

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // Raw data (full list)
  const rawData = useMemo(() => {
    return state.orders.map((order) => ({
      id: order.id,
      fullName: order.customer.fullName,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
      status: order.status,
    }));
  }, [state.orders]);

  // Enhance filtered data with JSX
  const displayData = useMemo(() => {
    return filteredData.map((order) => ({
      ...order,
      select: (
        <Checkbox
          checked={selectedOrders.includes(order.id)}
          onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
        />
      ),
      status: StatusBadge({ status: order.status }),
      action: (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outline"
            size="md"
            onClick={() => handleStatusUpdate(order.id, "Delivered")}
          >
            Delivered
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => handleStatusUpdate(order.id, "Cancelled")}
          >
            Cancelled
          </Button>
        </div>
      ),
    }));
  }, [filteredData, selectedOrders]);

  // Initial load
  useEffect(() => {
    setFilteredData(rawData);
  }, [rawData]);

  const handleSelectOrder = useCallback((orderId: string, checked: boolean) => {
    setSelectedOrders((prev) =>
      checked ? [...prev, orderId] : prev.filter((id) => id !== orderId)
    );
  }, []);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const visibleIds = filteredData.map((order) => order.id);
      setSelectedOrders(checked ? visibleIds : []);
    },
    [filteredData]
  );

  const handleStatusUpdate = useCallback(
    (orderId: string, status: OrderStatus) => {
      setConfirmModal({
        isOpen: true,
        title: "Update Order Status",
        message: `Are you sure you want to mark this order as ${status}?`,
        onConfirm: () => {
          dispatch({
            type: "UPDATE_ORDER_STATUS",
            payload: { orderId, status },
          });
          addToast(`Order status updated to ${status}`, "success");
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        },
      });
    },
    [dispatch, addToast]
  );

  const handleBulkStatusUpdate = useCallback(
    (status: OrderStatus) => {
      if (selectedOrders.length === 0) {
        addToast("No Orders Selected, Please select orders to update", "error");
        return;
      }

      setConfirmModal({
        isOpen: true,
        title: "Bulk Update Order Status",
        message: `Are you sure you want to mark ${selectedOrders.length} order(s) as ${status}?`,
        onConfirm: () => {
          selectedOrders.forEach((orderId) => {
            dispatch({
              type: "UPDATE_ORDER_STATUS",
              payload: { orderId, status },
            });
          });
          addToast(
            `${selectedOrders.length} orders updated to ${status}`,
            "success"
          );
          setSelectedOrders([]);
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        },
      });
    },
    [selectedOrders, dispatch, addToast]
  );

  const handleTableSearch = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    const filtered = rawData.filter((order) =>
      order.id.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
    setSelectedOrders([]); // reset selection to avoid confusion
  };

  const handleFilter = (filter: string) => {
    console.log("filter", filter, rawData);
    const filtered =
      filter === "all"
        ? rawData
        : rawData.filter((order) => order.status === filter);
    setFilteredData(filtered);
    setSelectedOrders([]); // reset selection
  };

  return (
    <div>
      <h1>Manage Order</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          marginBottom: "10px",
          visibility: selectedOrders.length > 0 ? "visible" : "hidden",
        }}
      >
        <Button
          variant="danger"
          size="md"
          onClick={() => handleBulkStatusUpdate("Cancelled")}
        >
          Cancel All
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={() => handleBulkStatusUpdate("Delivered")}
        >
          Deliver All
        </Button>
      </div>

      <Table
        data={displayData}
        handleSearch={handleTableSearch}
        handleFilter={handleFilter}
        enableSort
        enableFilter
        columns={[
          {
            header: (
              <Checkbox
                checked={
                  filteredData.length > 0 &&
                  filteredData.every((order) =>
                    selectedOrders.includes(order.id)
                  )
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            ),
            accessor: "select",
          },
          { header: "Order ID", accessor: "id" },
          { header: "Customer Name", accessor: "fullName" },
          { header: "Total Amount", accessor: "totalAmount" },
          { header: "Created At", accessor: "createdAt" },
          { header: "Status", accessor: "status" },
          { header: "Action", accessor: "action" },
        ]}
        filterOptions={[
          { label: "All", value: "all" },
          { label: "New", value: "New" },
          { label: "Delivered", value: "Delivered" },
          { label: "Cancelled", value: "Cancelled" },
        ]}
      />

      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      >
        <p>{confirmModal.message}</p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outline"
            size="md"
            onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          >
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={confirmModal.onConfirm}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};
