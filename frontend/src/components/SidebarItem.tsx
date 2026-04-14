import { useState } from "react";
import type { SidebarItemProps } from "../types/product";
import { NavLink } from "react-router-dom";

function SidebarItem({ icon, label, route }: SidebarItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    color: isHovered ? "#aa3bff" : "white",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 transition-all duration-200 font-medium text-sm rounded-lg active:translate-x-1 ${
          isActive
            ? "border-l-4 border-[#9e41f5]"
            : "hover:bg-[#262528] hover:text-[#cc97ff]"
        }`
      }
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}

      {label}
    </NavLink>
  );
}

export default SidebarItem;
