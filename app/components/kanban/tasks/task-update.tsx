'use client';
import React from 'react';
import { Dialog, Form } from 'radix-ui';
import { KanbanTaskProps } from './task';
import { FormEvent, useMemo } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import KanbanTaskRemove from './task-remove';
import { useKanbanStore } from '@/lib/stores/kanban/store';
import { Task } from '@/lib/stores/kanban/types';
import KanbanComments from './task-comments';

interface KanbanTaskUpdateProps extends KanbanTaskProps {
  setOpenModal: (x: boolean) => void,
  updateTask: (columnId: string, updatedTask: Task) => void,
  removeTask: (columnId: string, taskId: string) => void
}

const KanbanTaskUpdate = React.memo(function KanbanTaskUpdate(props: KanbanTaskUpdateProps) {
  const { task, columnId, setOpenModal, removeTask, updateTask } = props;
  const { id: taskId, title, status, description, createdAt, createdBy, updatedAt } = task;

  const columns = useKanbanStore(state => state.columns);
  const minimalColumns = useMemo(
    () => columns.map(({id, label, type}) => ({id, label, type})),
    [columns]
  );

  const onUpdate = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      updateTask(
        columnId,
        {
          ...task,
          title: data.get('taskTitle') as string,
          description: data.get('taskDesc') as string,
          status: data.get('taskStatus') as string,
        } as Task
      );
      setOpenModal(false);
    };

  return (
     <div className='p-3'>
      <Form.Root onSubmit={onUpdate} className='flex justify-between gap-5'>
        <div className='max-h-[75vh] overflow-auto'>
          <Form.Field name="taskTitle" className='border-b-1 border-gray-700 pb-2'>
            <Form.Control asChild>
              <input type="text" id="taskTitle" className="kanban-input-borderless text-xl font-medium mt-1" defaultValue={title} required />
            </Form.Control>
          </Form.Field>
          <Form.Field name="taskTitle">
            <Form.Message match="valueMissing" className='text-sm text-red-400 pt-2' name="taskTitle">Please enter a task title</Form.Message>
          </Form.Field>

          <Form.Field name="taskDesc" className="mt-3">
            <Form.Label className="mt-1 text-sm">Description</Form.Label>
            <Form.Control asChild>
              <textarea rows={3} id="taskDesc" className="kanban-input mt-1 size-50 text-sm" defaultValue={description} />
            </Form.Control>
          </Form.Field>

          <Form.Field name="taskStatus" className="mt-3">
            <Form.Label className="mt-1 text-sm">Status</Form.Label>
            <Form.Control asChild>
              <select id="taskStatus" name="taskStatus" defaultValue={status} className='pr-2 w-1/2 mt-1 kanban-input'>
                {minimalColumns.map(c => (
                  <option key={c.id} id={c.id} value={c.type}>{c.label}</option>
                ))}
              </select>
            </Form.Control>
          </Form.Field>

          <KanbanComments taskId={task.id} comments={task.comments || []} />
        </div>

        <div className="flex flex-col items-end gap-5 mt-10 w-1/4">
          <Form.Submit title='Update changes' className="kanban-button">
            Update
          </Form.Submit>
          <div className='w-full h-[0.5px] bg-gray-300'></div>
          <div className='text-xs text-right text-gray-400'>
            <p>Created By</p>
            <p>{task.createdBy}</p>
          </div>
          <div className='text-xs text-right text-gray-400'>
            <p>Created at</p>
            <p>{new Date(task.createdAt).toLocaleString()}</p>
          </div>
          <div className='text-xs text-right text-gray-400'>
            <p>Last updated at</p>
            <p>{new Date(task.updatedAt).toLocaleString()}</p>
          </div>
          <div className='w-full h-[0.5px] bg-gray-300'></div>
          <KanbanTaskRemove
            removeTask={removeTask}
            taskId={taskId}
            columnId={columnId}
          />
        </div>
      </Form.Root>

      <Dialog.Close asChild>
        <button className="absolute right-3 top-3 inline-flex cursor-pointer" aria-label="Close">
          <IoMdCloseCircleOutline className='text-gray-400 text-xl' />
        </button>
      </Dialog.Close>
    </div>
  )
});

export default KanbanTaskUpdate;