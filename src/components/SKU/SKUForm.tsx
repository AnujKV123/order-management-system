import Button from "../common/Button";
import Input from "../common/Input";
import Dropdown from "../common/Dropdown";
import "../Styles/SKU.css";
import { FormValidation } from "@/validation/FormValidation";
import type { SKU } from "@/types/order";
import { useOrderContext } from "@/contexts/OrderContext";
import { useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";

type Option = {
  label: string;
  value: string;
};
const menuItems: Option[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];
interface SKUFormData {
  name: string;
  code: string;
  price: string;
  status: {
    label: string;
    value: string;
  };
}

interface Props {
  setOpen: () => void;
  sku?: SKU | null;
}

export const SKUForm: React.FC<Props> = ({ setOpen, sku }) => {
  const { SKUValidation } = FormValidation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = SKUValidation;
  const { dispatch } = useOrderContext();
  const { addToast} = useToast();

  useEffect(() => {
    if (sku) {
      setValue("name", sku.name);
      setValue("code", sku.code);
      setValue("price", sku.price.toString());
      setValue("status", sku.status);
    }
  }, []);

  const status = watch("status");
  const setStatus = (status: Option) => {
    setValue("status", status);
  };

  const handleSubmitSKU = (data: SKUFormData) => {
    const skuData: SKU = {
      id: sku?.id || `sku-${Date.now()}`,
      name: data.name,
      code: data.code,
      price: parseInt(data.price),
      status: data.status,
      createdAt: sku?.createdAt || new Date().toISOString(),
    };
    if (sku) {
      dispatch({ type: 'UPDATE_SKU', payload: skuData });
      addToast('SKU has been updated successfully', 'success');
    } else {
      dispatch({ type: 'ADD_SKU', payload: skuData });
      addToast('New SKU has been created successfully', 'success');
    }
    setOpen();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitSKU)}>
      <div>
        <Input
          label="SKU Name"
          name="name"
          placeholder="SKU Name"
          register={register}
          error={errors.name?.message}
        />
        <Input
          label="SKU Code"
          name="code"
          placeholder="SKU Code"
          register={register}
          error={errors.code?.message}
        />
        <Input
          label="Price"
          type="number"
          name="price"
          placeholder="Price"
          register={register}
          error={errors.price?.message}
        />
        <Dropdown
          label="Status"
          options={menuItems}
          enableSearch={false}
          value={status}
          onChange={setStatus}
        />
      </div>
      <div className="modal-button-container">
        <Button variant="outline" size="md" onClick={() => setOpen()}>
          Cancel
        </Button>
        <Button variant="primary" size="md" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
