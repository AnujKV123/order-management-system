import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SKUFormSchema } from "../schema/SKU.schema";
import { OrderFormSchema } from "@/schema/Order.schema";

export const FormValidation = () => {
  const SKUDefaultValue = {
    name: "",
    code: "",
    price: "",
    status: { label: "Active", value: "active" },
  };

  const SKUValidation = useForm({
    resolver: zodResolver(SKUFormSchema),
    defaultValues: SKUDefaultValue,
  });

  const OrderValidation = useForm({
    resolver: zodResolver(OrderFormSchema),
  });

  return {
    SKUValidation,
    OrderValidation,
  };
};
