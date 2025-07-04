'use client';
import { useKanbanStore } from "@/lib/stores/kanban/store";
import KanbanTask from "../tasks/task";
import KanbanTaskAdd from "../tasks/task-add";
import KanbanColumnHeader from "./column-header";
import { SortableContext } from "@dnd-kit/sortable";
import { Column } from "@/lib/stores/kanban/types";

export interface KanbanColumnProps {
  column: Column,
  columnIndex: number
};

const KanbanColumn = (props: KanbanColumnProps) => {
  const { column: { type, id: columnId, tasks }  } = props;

  const addTask = useKanbanStore(state => state.addTask);
  const filteredTasks = tasks.filter(task => task.status === type);

  return (
    <section className='flex-1 flex flex-col'>
      <KanbanColumnHeader {...props} />

      {/*  Make column sortable by using SortableContext */}
      <SortableContext id={columnId} items={filteredTasks}>
        <div className='h-full w-full flex-1 self-stretch flex flex-col gap-4 pt-5'>
          {filteredTasks && filteredTasks.map(task => (
            <KanbanTask key={task.id} task={task} columnId={columnId} />
          ))}
          <KanbanTaskAdd columnId={columnId} addTask={addTask} />
        </div>
      </SortableContext>
    </section>
  );
};

export default KanbanColumn;