import { AlertDialog, Form } from 'radix-ui';
import React, { FormEvent, useState } from 'react'
import { FiPlus } from 'react-icons/fi';

interface KanbanTaskAddProps {
  columns: {id: string, label: string, type: string}[],
  user: string,
  addTask: (title: string, status: string, user: string, description?: string) => void
}

const KanbanTaskAdd = ({ columns, user, addTask }: KanbanTaskAddProps) => {
  const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const column = columns.find(c => c.type === data.get('taskStatus') as string);
    const columnId = column && column.id;

    addTask(
      columnId!,
      data.get('taskTitle') as string,
      user,
      data.get('taskDesc') as string,
    );
    setDialogOpen(false);
  };

  return (
    <>
      <AlertDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialog.Trigger asChild>
          <div className="kanban-button flex justify-between items-center gap-2">
            <span className='font-extrabold text-lg'><FiPlus /></span>
            <span>New Task</span>
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-gray-300/50 data-[state=open]:animate-overlayShow" />

          <AlertDialog.Content className="fixed w-sm kanban-card left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
              New Task
            </AlertDialog.Title>
            <AlertDialog.Description className='text-gray-500 text-sm mt-1'>Add the details to create a new task.</AlertDialog.Description>
            
            <Form.Root className='mt-5' onSubmit={onSubmit}>
              <Form.Field name="taskTitle">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="mt-1 text-sm">Title</Form.Label>
                  <Form.Message match="valueMissing" className='text-sm text-red-400'>Please enter a task title</Form.Message>
                </div>
                <Form.Control asChild>
                  <input type="text" id="taskTitle" className="kanban-input mt-1" required />
                </Form.Control>
              </Form.Field>

              <Form.Field name="taskDesc" className="mt-3">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="mt-1 text-sm">Description</Form.Label>
                  <Form.Message match="valueMissing" className='text-sm text-red-400'>Please enter a task description</Form.Message>
                </div>
                <Form.Control asChild>
                  <textarea rows={3} id="taskDesc" className="kanban-input mt-1" />
                </Form.Control>
              </Form.Field>

              <Form.Field name="taskStatus" className="mt-3">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="mt-1 text-sm">Status</Form.Label>
                  <Form.Message match="valueMissing" className='text-sm text-red-400'>Please enter a task title</Form.Message>
                </div>
                <Form.Control asChild>
                  <select id="taskStatus" name="taskStatus" required className='pr-2 w-1/2 mt-1 kanban-input'>
                    {columns?.map(c => (
                      <option key={c.id} id={c.id} value={c.type}>{c.label}</option>
                    ))}
                  </select>
                </Form.Control>
              </Form.Field>

              <div className="flex justify-between mt-10">
                <AlertDialog.Cancel className="text-sm text-gray-500 cursor-pointer outline-0">Cancel</AlertDialog.Cancel>
                  <Form.Submit className="kanban-button">
                    Create
                  </Form.Submit>
              </div>
            </Form.Root>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}

export default KanbanTaskAdd;