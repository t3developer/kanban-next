import TimeAgo from "react-timeago";


interface KanbanTaskProps {
  id: string,
  title: string,
  description?: string,
  status: string,
  createdAt: Date,
  updatedAt: Date
}

const KanbanTask = ({ title, description, updatedAt }: KanbanTaskProps) => {
  return (
    <div
      className={'h-30 flex flex-col cursor-pointer items-start justify-between gap-3 kanban-card kanban-hover'}
    >
      <div>
        <h3 className='font-medium text-gray-700'>{title}</h3>
        <p className='text-sm font-light text-gray-500 mt-1 line-clamp-2 h-10'>{description}</p>
      </div>
      <div className="flex justify-between border-t-1 border-gray-100 py-1 w-full text-xs text-gray-300">
        <p>Last Edited At:</p>
        <TimeAgo date={updatedAt} />
      </div>
    </div>
  );
};

export default KanbanTask;