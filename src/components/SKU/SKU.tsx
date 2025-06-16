import React, { useEffect, useMemo, useState } from "react";
import Table from "../common/Table";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { Plus } from "lucide-react";
import type { SKU } from "@/types/order";
import { useOrderContext } from "@/contexts/OrderContext";
import StatusBadge from "../common/StatusBadge";
import { SKUForm } from "./SKUForm";
import "../Styles/SKU.css";

export const SKUComp = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [editingSKU, setEditingSKU] = useState<SKU | null>(null);
  const { state } = useOrderContext();
  const [tableData, setTableData] = useState<any[]>([]);

  const handleEdit = (sku: SKU) => {
    setEditingSKU(sku);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSKU(null);
  };

  useEffect(() => {
    const SKUListData = state.skus.map((sku) => ({
      id: sku.id,
      name: sku.name,
      code: sku.code,
      price: sku.price,
      status: StatusBadge({ status: sku.status.value }),
      createdAt: sku.createdAt,
      action: (
        <Button variant="outline" size="md" onClick={() => handleEdit(sku)}>
          Edit
        </Button>
      ),
    }));
    setTableData(SKUListData);
  }, [state.skus]);

  const handleTableSearch = (searchTerm: string) => {
    const filteredData = state.skus.filter((sku) =>
      sku.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTableData(
      filteredData.map((sku) => ({
        id: sku.id,
        name: sku.name,
        code: sku.code,
        price: sku.price,
        status: StatusBadge({ status: sku.status.value }),
        createdAt: sku.createdAt,
        action: (
          <Button variant="outline" size="md" onClick={() => handleEdit(sku)}>
            Edit
          </Button>
        ),
      }))
    );
  };

  const handleFilter = (filter: string) => {
    const filteredData =
      filter === "all"
        ? state.skus
        : state.skus.filter((sku) => sku.status.value === filter);
    setTableData(
      filteredData.map((sku) => ({
        id: sku.id,
        name: sku.name,
        code: sku.code,
        price: sku.price,
        status: StatusBadge({ status: sku.status.value }),
        createdAt: sku.createdAt,
        action: (
          <Button variant="outline" size="md" onClick={() => handleEdit(sku)}>
            Edit
          </Button>
        ),
      }))
    );
  };

  return (
    <div>
      <div className="sku-container">
        <div className="sku-header">
          <h1>SKU Management</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus width={13} height={13} /> Add SKU
          </Button>
        </div>
        <div className="sku-table-container">
          <Table
            data={tableData}
            columns={[
              { header: "SKU Name", accessor: "name" },
              { header: "SKU Code", accessor: "code" },
              { header: "Price", accessor: "price" },
              { header: "Status", accessor: "status" },
              { header: "Created At", accessor: "createdAt" },
              { header: "Action", accessor: "action" },
            ]}
            enableSearch
            handleSearch={handleTableSearch}
            enableSort
            enableFilter
            handleFilter={handleFilter}
            filterOptions={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            enablePagination
          />
        </div>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Custom Modal"
          closeOnEsc
          closeOnOutsideClick
        >
          <SKUForm setOpen={handleClose} sku={editingSKU} />
        </Modal>
      </div>
    </div>
  );
};
