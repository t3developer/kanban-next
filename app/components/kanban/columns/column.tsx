'use client';
import React from "react";
import { useKanbanStore } from "@/lib/stores/kanban/store";
import KanbanTask from "../tasks/task";
import KanbanTaskAdd from "../tasks/task-add";
import KanbanColumnHeader from "./column-header";
import { Column } from "@/lib/stores/kanban/types";

export interface KanbanColumnProps {
  column: Column,
  columnIndex: number
};

const KanbanColumn = (props: KanbanColumnProps) => {
  const { column: { id: columnId, tasks }  } = props;
  const addTask = useKanbanStore(state => state.addTask);

  return (
    <section className='flex-1 flex flex-col'>
      <KanbanColumnHeader {...props} />

        <div className='h-full w-full flex-1 self-stretch flex flex-col gap-4 pt-5'>
          {tasks && tasks.map(task => (
            <KanbanTask key={task.id} task={task} columnId={columnId} />
          ))}
          <KanbanTaskAdd columnId={columnId} addTask={addTask} />
        </div>

    </section>
  );
};

// Memoize with shallow props check
// const KanbanColumn = React.memo(KanbanColumnBase, (prev, next) => {
//   return prev.column.id === next.column.id &&
//          prev.column.tasks.length === next.column.tasks.length &&
//          prev.column.label === next.column.label;
// });

export default KanbanColumn;