import KanbanTask from "../tasks/kanban-task";

const tasks = [
  {
    id: '1234',
    title: 'Our first task',
    description: 'Some description',
    status: 'completed'
  }
];

interface KanbanColumnProps {
  label: string,
  type: string,
};

const KanbanColumn = ({ label, type  }: KanbanColumnProps) => {
  const filteredTasks = tasks.filter(task => task.status === type);

  return (
    <section className='flex-1 flex flex-col'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{label}</h2>

      <div className='h-full w-full flex-1 self-stretch flex flex-col gap-4 pt-3'>
          {filteredTasks.map(task => (
            <KanbanTask key={task.id} {...task} />
          ))}
      </div>
    </section>
  );
};

export default KanbanColumn;