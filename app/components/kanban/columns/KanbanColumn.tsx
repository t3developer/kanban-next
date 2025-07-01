import KanbanTask from "../tasks/KanbanTask";

const tasks = [
  {
    id: '1234',
    title: 'Our first task',
    description: 'Some description',
    status: 'DONE'
  }
];

type KanbanColumnProps = {
  title: string,
  status: string,
};

const KanbanColumn = ({ title, status  }: KanbanColumnProps) => {
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <section className='flex-1 flex flex-col'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div className='h-full w-full flex-1 self-stretch flex flex-col gap-4 pt-3'>
          {filteredTasks.map(task => (
            <KanbanTask key={task.id} {...task} />
          ))}
      </div>
    </section>
  );
};

export default KanbanColumn;