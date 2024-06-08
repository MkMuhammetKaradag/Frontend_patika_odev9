import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Item } from "./Container";
import Modal from "./components/EditModal";

export const ItemType = "ITEM";

export interface DragItem {
  id: number;
  text: string;
  index: number;
  type?: React.HTMLInputTypeAttribute | undefined;
  isDrop: boolean;
  element: string;
}

interface DraggableItemProps {
  index: number;
  item: Item;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  removeItem: (id: number) => void;
  editItem: (selectItem: Item) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  index,
  item,
  moveItem,
  removeItem,
  editItem,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectItemEdit, setselectItemEdit] = useState<Item | undefined>(item);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: DragItem) => {
      if (draggedItem.index !== index && draggedItem.isDrop) {
        moveItem(draggedItem.index, index);

        draggedItem.index = index;
      }
    },
  });

  const [, drag] = useDrag({
    type: ItemType,
    item: {
      id: item.id,
      text: item.text,
      index,
      isDrop: item.isDrop,
    },
  });

  drag(drop(ref));

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      ref={ref}
      style={{
        padding: "10px",
        border: "1px solid gray",
        marginBottom: "5px",
        backgroundColor: "white",
        cursor: "move",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>{item.type}</div>
      <div className="flex gap-x-5">
        <button className="text-red-600" onClick={() => removeItem(item.id)}>
          Sil
        </button>
        <button className="text-blue-600" onClick={() => openModal()}>
          edit
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectItemEdit={selectItemEdit}
        setselectItemEdit={setselectItemEdit}
        editItem={editItem}
      ></Modal>
    </div>
  );
};

export default DraggableItem;
