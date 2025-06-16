import React from "react";
import "../Styles/StatusBadge.css";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalizedStatus = status.toLowerCase();

  const getStatusClass = () => {
    switch (normalizedStatus) {
      case "new":
        return "status-badge new";
      case "delivered":
        return "status-badge delivered";
      case "cancelled":
        return "status-badge cancelled";
      case "active":
        return "status-badge active";
      case "inactive":
        return "status-badge inactive";
      default:
        return "status-badge default";
    }
  };

  return <span className={getStatusClass()}>{status}</span>;
};

export default StatusBadge;
