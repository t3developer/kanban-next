'use client';
import { Dialog, Form } from 'radix-ui';
import { KanbanTaskProps } from './task';
import { FormEvent } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import KanbanTaskRemove from './task-remove';
import { FaChevronDown } from 'react-icons/fa';
import { useKanbanStore } from '@/lib/store/kanban-store';

interface KanbanTaskUpdateProps extends KanbanTaskProps {
  setOpenModal: (x: boolean) => void,
  updateTask: (id: string, status: string, title?: string, description?: string) => void,
  deleteTask: (id: string) => void
}

const KanbanTaskUpdate = (props: KanbanTaskUpdateProps) => {
  const { id: taskId, title, status, description, setOpenModal, deleteTask, updateTask } = props;
  const columns = useKanbanStore(state => state.columns);

  const onUpdate = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      updateTask(
        taskId,
        data.get('taskStatus') as string,
        data.get('taskTitle') as string,
        data.get('taskDesc') as string
      );
      setOpenModal(false);
    };

  return (
     <div className='p-3'>
      <Form.Root onSubmit={onUpdate}>
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
            <textarea rows={3} id="taskDesc" className="kanban-input mt-1 size-30" defaultValue={description} />
          </Form.Control>
        </Form.Field>

        <Form.Field name="taskStatus" className="mt-3">
          <Form.Label className="mt-1 text-sm">Status</Form.Label>
          <Form.Control asChild>
            <select id="taskStatus" name="taskStatus" defaultValue={status} className='pr-2 w-1/2 mt-1 kanban-input'>
              {columns.map(c => (
                <option key={c.id} id={c.id} value={c.type}>{c.label}</option>
              ))}
            </select>
          </Form.Control>
        </Form.Field>

        <div className="flex justify-between items-center mt-10">
            <KanbanTaskRemove
              deleteTask={deleteTask}
              taskId={taskId}
            />
            <Form.Submit className="kanban-button">
              Update
            </Form.Submit>
        </div>
      </Form.Root>

      <Dialog.Close asChild>
        <button className="absolute right-3 top-3 inline-flex cursor-pointer" aria-label="Close">
          <IoMdCloseCircleOutline className='text-gray-400 text-xl' />
        </button>
      </Dialog.Close>
    </div>
  )
}

export default KanbanTaskUpdate