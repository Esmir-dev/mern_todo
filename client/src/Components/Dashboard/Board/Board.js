import React from "react";
import { Board } from "kanban-board";

const MainBoard = (data) => {
  return <Board allowRenameColumn data={data.data} />;
};
export default MainBoard;
