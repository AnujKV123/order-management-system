import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import type { MenuItem } from "../components/common/Sidebar";
import { PackagePlus, Home, ShoppingCart, FilePenLine } from "lucide-react";
import { SKUComp } from "../components/SKU/SKU";
import { CreateOrder } from "@/components/Order/CreateOrder/CreateOrder";
import { ManageOrder } from "@/components/Order/ManageOrder/ManageOrder";
import { HomePage } from "@/components/Home";

const Routing: React.FC = () => {
  const [active, setActive] = React.useState("Dashboard");

  const menuItems: MenuItem[] = [
    {
      label: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      label: "SKU",
      icon: <PackagePlus />,
      path: "/sku",
    },
    {
      label: "Create Order",
      icon: <ShoppingCart />,
      path: "/create-order",
    },
    {
      label: "Manage Order",
      icon: <FilePenLine />,
      path: "/manage-order",
    },
  ];

  const handleSelect = (label: string) => {
    setActive(label);
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div style={{ width: "17%" }}>
          <Sidebar
            items={menuItems}
            activeItem={active}
            onItemSelect={(label) => {
              handleSelect(label);
            }}
          />
        </div>
        <div style={{ flexGrow: 1, padding: "1rem", width: "83%" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sku" element={<SKUComp />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/manage-order" element={<ManageOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Routing;
