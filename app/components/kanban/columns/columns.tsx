'use client';

import { useKanbanStore } from "@/lib/store/kanban-store";
import KanbanColumn from "./column";

const KanbanColumns = () => {
  const columns = useKanbanStore(state => state.columns);

  return (
    <section className='w-full h-full flex gap-6 lg:gap-12'>
      {columns.map(column => (
        <KanbanColumn
          key={column.id}
          columnId={column.id}
          label={column.label}
          type={column.type}
          columnIndex={columns.findIndex(c => c.id === column.id)}
        />
      ))}
    </section>
  );
};

export default KanbanColumns;