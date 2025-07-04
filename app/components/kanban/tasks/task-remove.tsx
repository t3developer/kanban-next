import { AlertDialog } from 'radix-ui'
import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

interface KanbanTaskRemoveProps {
  taskId: string,
  columnId: string,
  removeTask: (columnId: string, taskId: string) => void
}

const KanbanTaskRemove = ({ taskId, columnId, removeTask }: KanbanTaskRemoveProps) => {
  return (
      <>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <div className="cursor-pointer text-xl text-red-400"><RiDeleteBinLine /></div>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-gray-300/50 data-[state=open]:animate-overlayShow" />
            <AlertDialog.Content className="fixed w-sm kanban-card left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
              <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
                Are you sure?
              </AlertDialog.Title>
              <AlertDialog.Description>Do you want to delete this task?</AlertDialog.Description>
              
              <AlertDialog.Action asChild>
                  <div className="flex justify-between mt-5">
                    <AlertDialog.Cancel className="text-sm text-gray-500 cursor-pointer outline-0">Cancel</AlertDialog.Cancel>
                    <button className="kanban-button-alert" onClick={() => removeTask(columnId, taskId)}>Delete</button>
                </div>
              </AlertDialog.Action>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </>
    )
}

export default KanbanTaskRemove