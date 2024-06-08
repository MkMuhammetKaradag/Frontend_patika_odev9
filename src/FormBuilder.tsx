import React from "react";
import { Item } from "./Container";
import classNames from "classnames";
import Select from "react-select";
interface FormBuilderProps {
  element: Item;
}
const FormBuilder: React.FC<FormBuilderProps> = ({ element }) => {


  const headerClass = classNames("flex", element.className);
  const renderSwitch = (param: React.HTMLInputTypeAttribute | undefined) => {
    switch (param) {
      case "input":
        return (
          <div className="flex gap-x-3">
            <input
              type={element.type}
              value={element.value}
              name={element.name}
              className={`${headerClass}`}
            />
            {element.type == "radio" && <label>{element.label}</label>}
          </div>
        );
      case "textarea":
        return (
          <textarea
            value={element.value}
            name={element.name}
            className={element.className}
          ></textarea>
        );
      case "dropdown":
        return <Select id={element.name} options={element.options} />;
      case "button":
        return <button className={element.className}>Buton</button>;
      // Diğer durumlar...
      default:
        return <>HELLO</>;
    }
  };
  return <div>{renderSwitch(element.element)}</div>;
};

export default FormBuilder;
