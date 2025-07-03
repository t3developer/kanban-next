'use client';
import { useKanbanStore } from "@/lib/store/kanban-store";
import KanbanTask from "../tasks/task";
import KanbanTaskAdd from "../tasks/task-add";
import KanbanColumnHeader from "./column-header";

export interface KanbanColumnProps {
  columnId: string,
  label: string,
  type: string,
  columnIndex: number
};

const KanbanColumn = (props: KanbanColumnProps) => {
  const { type  } = props;
  const tasks = useKanbanStore(state => state.tasks);
  const addTask = useKanbanStore(state => state.addTask);
  const filteredTasks = tasks.filter(task => task.status === type);

  return (
    <section className='flex-1 flex flex-col'>
      <KanbanColumnHeader {...props} />

      <div className='h-full w-full flex-1 self-stretch flex flex-col gap-4 pt-5'>
          {filteredTasks.map(task => (
            <KanbanTask key={task.id} {...task} />
          ))}
          <KanbanTaskAdd status={type} addTask={addTask} />
      </div>
    </section>
  );
};

export default KanbanColumn;