import React, { useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import DraggableItem, { ItemType, DragItem } from "./DraggableItem"; // Doğru şekilde içe aktardığımızdan emin olun

import PreviewModal from "./components/PreviewModal";

export interface Item {
  id: number;
  text: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  className?: string | undefined;
  value?: string | undefined;
  name?: string | undefined;
  isDrop: boolean;
  element: string;
  label?: string;
  options?: {
    value: string;
    label: string;
  }[];
}

const Container: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = items[dragIndex];
    console.log(items);
    setItems(
      update(items, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedItem],
        ],
      })
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const editItem = (seletItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id == seletItem.id) {
          return {
            ...seletItem,
          };
        } else {
          return item;
        }
      })
    );
  };
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: DragItem) => {
      if (!items.some((existingItem) => existingItem.id === item.id)) {
        const newItem = { ...item, id: new Date().getTime(), isDrop: true }; // Yeni ID ile yeni bir öğe oluştur
        console.log(newItem);
        setItems((prevItems) => [...prevItems, newItem]);
      }
    },
  });
  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="h-3/4 w-1/2  flex flex-col  items-center justify-end">
      <div ref={drop} className="border-2  flex  flex-col   w-full h-full">
        <div>
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              item={item}
              index={index}
              moveItem={moveItem}
              removeItem={removeItem}
              editItem={editItem}
            />
          ))}
        </div>
      </div>
      <button
        className=" bg-blue-400 p-3 rounded-lg  mt-1 text-gray-100"
        onClick={() => openModal()}
      >
        Preview
      </button>
      <PreviewModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        items={items}
      ></PreviewModal>
    </div>
  );
};

export default Container;
