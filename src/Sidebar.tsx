import React, { HTMLInputTypeAttribute } from "react";
import SidebarItem from "./SidebarItem";

export interface itemType {
  id: number;
  text: string;
  type?: HTMLInputTypeAttribute | undefined;
  className?: string | undefined;
  value?: string | undefined;
  name?: string | undefined;
  element: string;
  labelString?: string;
  options?: {
    value: string;
    label: string;
  }[];
}
const Sidebar: React.FC = () => {
  const items: itemType[] = [
    { id: 1, text: "button ", type: "button", element: "input" },
    { id: 2, text: "input checkbox", type: "checkbox", element: "input" },
    { id: 3, text: "input color", type: "color", element: "input" },
    { id: 4, text: "input date", type: "date", element: "input" },
    { id: 5, text: "input email", type: "email", element: "input" },
    { id: 6, text: "input radio", type: "radio", element: "input" },
    { id: 7, text: "input text", type: "text", element: "input" },
    { id: 8, text: "input textarea", type: "textarea", element: "textarea" },
    {
      id: 9,
      text: "input dropdown",
      type: "dropdown",
      element: "dropdown",
      options: [],
    },
  ];

  return (
    <div
      className="w-1/4 h-3/4 flex flex-col bg-slate-500"
      style={{
        border: "1px solid black",
      }}
    >
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          id={item.id}
          text={item.text}
          type={item.type}
          element={item.element}
        />
      ))}
    </div>
  );
};

export default Sidebar;
