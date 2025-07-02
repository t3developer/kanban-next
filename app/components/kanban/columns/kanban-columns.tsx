'use client';

import { useKanbanStore } from "@/lib/store/kanban-store";
import KanbanColumn from "./kanban-column";

const KanbanColumns = () => {
  const columns = useKanbanStore(state => state.columns);
  const sortedColumns = columns.sort((a, b) => (a.order - b.order));
  console.log(columns);

  return (
    <section className='w-full h-full flex gap-6 lg:gap-12'>
      {sortedColumns.map(column => (
        <KanbanColumn key={column.id} label={column.label} type={column.type} />
      ))}
    </section>
  );
};

export default KanbanColumns;