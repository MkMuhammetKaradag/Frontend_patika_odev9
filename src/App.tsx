import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Container";
import Sidebar from "./Sidebar";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" flex w-screen h-screen items-center  justify-center">
        <Container />
        <Sidebar />
      </div>
    </DndProvider>
  );
};

export default App;
