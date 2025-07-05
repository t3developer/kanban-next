'use client';
import { useKanbanStore } from "@/lib/stores/kanban/store";
import KanbanColumn from "./column";
import KanbanInitializer from "../kanban-initializer";
import { useShallow } from "zustand/shallow";

const KanbanColumns = () => {
  const [columns, moveTask] = useKanbanStore(
    useShallow((state) => [state.columns, state.moveTaskToColumn])
  );

  return (
    <>
      <KanbanInitializer />
        <section className='w-full h-full flex gap-4 lg:gap-8'>
          {columns && columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              columnIndex={columns.findIndex(c => c.id === column.id)}
            />
          ))}
        </section>
    </>
  );
};

export default KanbanColumns;