'use client';
import { useState } from "react";
import KanbanTaskCard from "./task-card";
import { Dialog, VisuallyHidden } from "radix-ui";
import KanbanTaskUpdate from "./task-update";
import { useKanbanStore } from "@/lib/store/kanban-store";

export interface KanbanTaskProps {
  id: string,
  title: string,
  description?: string,
  status: string,
  createdAt: Date,
  updatedAt: Date
}

const KanbanTask = (props: KanbanTaskProps) => {
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const updateTask = useKanbanStore(state => state.updateTask);
  const deleteTask = useKanbanStore(state => state.deleteTask);

  return (
    <>
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <Dialog.Trigger>
          <KanbanTaskCard {...props} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-300/50 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed w-md kanban-card left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <VisuallyHidden.Root>
            <Dialog.Title>Task Update</Dialog.Title>
          </VisuallyHidden.Root>
          <KanbanTaskUpdate
            {...props}
            setOpenModal={setOpenModal}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default KanbanTask;