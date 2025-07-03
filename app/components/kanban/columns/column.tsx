'use client';
import KanbanTask from "../tasks/task";
import KanbanColumnHeader from "./column-header";

const tasks = [
  {
    id: '1234',
    title: 'Our first task',
    description: 'Some description',
    status: 'completed'
  }
];

export interface KanbanColumnProps {
  columnId: string,
  label: string,
  type: string,
  columnIndex: number
};

const KanbanColumn = (props: KanbanColumnProps) => {
  const { type  } = props;
  const filteredTasks = tasks.filter(task => task.status === type);

  return (
    <section className='flex-1 flex flex-col'>
      <KanbanColumnHeader {...props} />

      <div className='h-full w-full flex-1 self-stretch flex flex-col gap-4 pt-5'>
          {filteredTasks.map(task => (
            <KanbanTask key={task.id} {...task} />
          ))}
      </div>
    </section>
  );
};

export default KanbanColumn;