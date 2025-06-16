import React from "react";
import "../Styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

export type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  onClick?: () => void;
};

type SidebarProps = {
  items: MenuItem[];
  activeItem?: string;
  onItemSelect?: (label: string) => void;
  collapsed?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  onItemSelect,
  collapsed = false,
}) => {
  const navigate = useNavigate();

  const handleSelect = (item: MenuItem) => {
    item.onClick?.();
    onItemSelect?.(item.label);
    if (item.path) navigate(item.path);
  };

  return (
    <nav
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      aria-label="Sidebar"
    >
      <ul className="sidebar-list">
        {items.map((item) => {
          const isActive = activeItem === item.label;

          return (
            <li
              key={item.label}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => handleSelect(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(item);
                }
              }}
            >
              <div className="sidebar-item-inner">
                {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                {!collapsed && (
                  <span className="sidebar-label">{item.label}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
