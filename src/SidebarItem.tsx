import React from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "./DraggableItem";

interface SidebarItemProps {
  id: number;
  text: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  element: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, type, element }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { id: new Date().getTime(), text, type, element },
  });

  return (
    <div
      ref={drag}
      style={{
        padding: "10px",
        border: "1px solid gray",
        marginBottom: "5px",
        backgroundColor: "white",
        cursor: "move",
      }}
    >
      {text}
    </div>
  );
};

export default SidebarItem;
