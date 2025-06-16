import React, { useState, useMemo, useCallback } from "react";
import Dropdown from "@/components/common/Dropdown";
import { useOrderContext } from "@/contexts/OrderContext";
import { useDebounce } from "@/hooks/useDebounce";
import { SKU } from "@/types/order";

interface SKUSelectorProps {
  onSelectSKU: (sku: SKU) => void;
}

export const SKUSelector = React.memo(({ onSelectSKU }: SKUSelectorProps) => {
  const { state } = useOrderContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [dropDownItem, setDropDownItem] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const filteredSKUs = useMemo(() => {
    return state.skus.filter(
      (sku) =>
        sku.status.value === "active" &&
        (sku.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          sku.code.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    );
  }, [state.skus, debouncedSearchTerm]);

  // const paginatedSKUs = useMemo(() => {
  //   const itemsPerPage = 10;
  //   return filteredSKUs.slice(0, page * itemsPerPage);
  // }, [filteredSKUs, page]);


  const handleSelect = useCallback(
    (option: { label: string; value: string; data?: SKU }) => {
      if (!option.data) return;

      onSelectSKU(option.data);
      setDropDownItem({ label: option.label, value: option.value });
      setSearchTerm("");
      setPage(1);
    },
    [onSelectSKU]
  );

  const formatOption = useCallback(
    (sku: SKU) => ({
      label: `${sku.name} (${sku.code}) - $${sku.price.toFixed(2)}`,
      value: sku.id,
      data: sku,
    }),
    []
  );

  const options = useMemo(
    () => filteredSKUs.map(formatOption),
    [filteredSKUs, formatOption]
  );

  return (
    <Dropdown
      label="Add SKU"
      options={options}
      value={dropDownItem}
      onChange={handleSelect}
      placeholder="Select SKU..."
      enableSearch={true}
    />
  );
});

SKUSelector.displayName = "SKUSelector";
