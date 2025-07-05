import TimeAgo from 'react-timeago';
import { KanbanTaskProps } from './task';
import { FaCheckCircle } from 'react-icons/fa';
import { BASIC_COLUMNS } from '@/lib/data/columns';
import classNames from 'classnames';

const KanbanTaskCard = (props: KanbanTaskProps) => {
  const { title, description, updatedAt, status } = props.task;
  
  return (
    <div className={classNames(
      'h-30 flex flex-col cursor-pointer items-start justify-between gap-3 kanban-card kanban-hover',
      {"scale-105 opacity-70": props.isOverlay}
    )}>
      <div>
        <h3 className='font-medium text-gray-700 text-left line-clamp-1'>{title}</h3>
        <p className='text-xs font-light text-gray-500 mt-1 text-left line-clamp-2'>{description}</p>
      </div>
      <div className="flex justify-between border-t-1 border-gray-100 py-1 w-full text-xs text-gray-300">
        <p>Last Edited At:</p>
        <div className='inline-flex justify-center items-center gap-2'>
          <TimeAgo date={updatedAt} />
          {status === BASIC_COLUMNS.COMPLETED &&  <div className='text-lime-500'><FaCheckCircle /></div>}
        </div>
      </div>
    </div>
  )
}

export default KanbanTaskCard;