'use client';
import { useState } from "react";
import KanbanTaskCard from "./task-card";
import { Dialog, VisuallyHidden } from "radix-ui";
import KanbanTaskUpdate from "./task-update";
import { useKanbanStore } from "@/lib/stores/kanban/store";
import { Task } from "@/lib/stores/kanban/types";
import React from "react";

export interface KanbanTaskProps {
  task: Task,
  columnId: string
  isOverlay?: boolean;
}

const KanbanTask = (props: KanbanTaskProps) => {
  const { task: { id: taskId }, columnId, isOverlay } = props;
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const updateTask = useKanbanStore(state => state.updateTask);
  const removeTask = useKanbanStore(state => state.removeTask);

  return (
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
            removeTask={removeTask}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default KanbanTask;

// export default React.memo(KanbanTask, (prev, next) => {
//   return (
//     prev.task.id === next.task.id &&
//     prev.task.updatedAt === next.task.updatedAt &&
//     prev.task.status === next.task.status &&
//     prev.columnId === next.columnId
//   );
// });