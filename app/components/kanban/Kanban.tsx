'use client';
import { useKanbanStore } from "@/lib/stores/kanban/store";
import KanbanColumns from "./columns/columns";
import { useShallow } from "zustand/shallow";
import KanbanTaskAdd from "./tasks/task-add";

const Kanban = () => {
  const [columns, addTask] = useKanbanStore(
    useShallow((state) => [state.columns, state.addTask])
  );

  return (
    <>
      <div className="flex-none flex justify-between items-center">
          <h1>Board</h1>
          {columns && <KanbanTaskAdd
            columns={columns.map(c =>({"id": c.id, "label": c.label, "type": c.type}))}
            addTask={addTask} />}
        </div>
      <div className="flex-1 flex items-stretch">
        <div className="w-full flex justify-center items-center py-6">
          <KanbanColumns columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Kanban;