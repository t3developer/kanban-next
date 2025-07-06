import React from 'react';
import TimeAgo from 'react-timeago';
import { KanbanTaskProps } from './task';
import { FaCheckCircle } from 'react-icons/fa';
import { BASIC_COLUMNS } from '@/lib/data/columns';
import classNames from 'classnames';

const KanbanTaskCard = React.memo(function KanbanTaskCard(props: KanbanTaskProps) {
  const { title, description, updatedAt, status } = props.task;
  
  return (
    <div className={classNames(
      'h-30 flex flex-col cursor-pointer items-start justify-between gap-5 kanban-card kanban-hover',
      {"ring-2 ring-cyan-300": props.isOverlay}
    )}>
      <div>
        <h3 className='font-medium text-gray-700 text-left line-clamp-1'>{title}</h3>
        <p className='text-xs font-light text-gray-500 mt-1 text-left line-clamp-2 h-[32px]'>{description}</p>
      </div>
      <div className="flex justify-between border-t-1 border-gray-100 py-1 w-full text-[10px] text-gray-300">
        <p>Last Edited At:</p>
        <div className='inline-flex justify-center items-center gap-2'>
          <TimeAgo date={updatedAt} minPeriod={360} />
          {status === BASIC_COLUMNS.COMPLETED &&  <div className='text-lime-500'><FaCheckCircle /></div>}
        </div>
      </div>
    </div>
  )
});

export default KanbanTaskCard;