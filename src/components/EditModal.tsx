import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import FormBuilder from "../FormBuilder";
import { Item } from "../Container";
interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectItemEdit: Item | undefined;
  setselectItemEdit: React.Dispatch<React.SetStateAction<Item | undefined>>;
  editItem: (selectItem: Item) => void;
}
interface InputPair {
  label: string;
  value: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  selectItemEdit,
  setselectItemEdit,
  editItem,
}) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [className, setClassName] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [inputPairs, setInputPairs] = useState<InputPair[]>(
    selectItemEdit?.options || []
  );

  const addInputPair = () => {
    setInputPairs([...inputPairs, { label: "", value: "" }]); // Yeni bir input çifti ekleyin
  };
  const removeInputPair = (index: number) => {
    const newInputs = [...inputPairs];
    newInputs.splice(index, 1); // İlgili input'u listeden çıkarın
    setInputPairs(newInputs);
  };
  const handleInputChange =
    (index: number, type: "label" | "value") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputPairs = [...inputPairs];
      newInputPairs[index][type] = event.target.value; // İlgili input çiftinin değerini güncelleyin
      setInputPairs(newInputPairs);
    };

  function closeModal() {
    setIsOpen(false);
  }

  function saveItem() {
    if (selectItemEdit) {
      setselectItemEdit({
        ...selectItemEdit,
        name,
        value,
        className,
        label,
        options: inputPairs,
      });
      editItem({
        ...selectItemEdit,
        name,
        value,
        className,
        label,
        options: inputPairs,
      });
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className=" max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2"></div>
                {selectItemEdit && (
                  <>
                    <span>
                      {selectItemEdit.element}-{selectItemEdit.type}
                    </span>
                    <div className="flex  w-full border-2 border-red-300  min-h-20 items-center">
                      <FormBuilder element={selectItemEdit}></FormBuilder>
                    </div>
                    <div className="flex  flex-col gap-y-5">
                      {selectItemEdit.type !== "dropdown" && (
                        <input
                          className="h-10 border-2 border-gray-400 p-2 rounded-xl"
                          type="text"
                          placeholder="value"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      )}
                      <input
                        className="h-10 border-2 border-gray-400 p-2 rounded-xl"
                        type="text"
                        placeholder="className tailwind"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                      />
                      <input
                        className="h-10 border-2 border-gray-400 p-2 rounded-xl"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {selectItemEdit.type == "radio" && (
                        <input
                          className="h-10 border-2 border-gray-400 p-2 rounded-xl"
                          type="text"
                          placeholder="Label"
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                        />
                      )}
                      {selectItemEdit.type === "dropdown" && (
                        <div>
                          <div className="flex  flex-col items-center">
                            {inputPairs.map((pair, index) => (
                              <div
                                key={index}
                                className="items-center flex gap-x-4 mb-2"
                              >
                                <input
                                  type="text"
                                  className="h-10 border-2 border-gray-400 p-2 rounded-xl"
                                  placeholder="Label"
                                  value={pair.label}
                                  onChange={handleInputChange(index, "label")}
                                />
                                <input
                                  type="text"
                                  className="h-10 border-2 border-gray-400 p-2 rounded-xl"
                                  placeholder="Value"
                                  value={pair.value}
                                  onChange={handleInputChange(index, "value")}
                                />
                                <button
                                  className="text-2xl min-w-8 bg-red-100 rounded-md"
                                  onClick={() => removeInputPair(index)}
                                >
                                  -
                                </button>
                              </div>
                            ))}
                          </div>
                          <div>
                            <button
                              onClick={addInputPair}
                              className="p-1 text-2xl min-w-10 bg-blue-100 rounded-md"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Kapat
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2  ml-10 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={saveItem}
                  >
                    save
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
