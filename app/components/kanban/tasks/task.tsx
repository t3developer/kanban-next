'use client';
import { useState } from "react";
import KanbanTaskCard from "./task-card";
import { Dialog, VisuallyHidden } from "radix-ui";
import KanbanTaskUpdate from "./task-update";
import { useKanbanStore } from "@/lib/stores/kanban/store";
import { Task } from "@/lib/stores/kanban/types";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useShallow } from "zustand/shallow";

export interface KanbanTaskProps {
  task: Task,
  columnId: string
  isOverlay?: boolean;
}

const KanbanTask = React.memo(function KanbanTask(props: KanbanTaskProps) {
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const { task: { id: taskId } } = props;
  const [updateTask, removeTask] = useKanbanStore(
    useShallow((state) => [state.updateTask, state.removeTask])
  );

  // --- DND-KIT ---
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: taskId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  // ... rest unchanged
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="inline-grid">
      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger>
        <KanbanTaskCard {...props} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-300/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed w-2xl kanban-card left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
    </div>
  );
});

export default KanbanTask;