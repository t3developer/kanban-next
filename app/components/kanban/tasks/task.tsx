'use client';
import { useState } from "react";
import KanbanTaskCard from "./task-card";
import { Dialog, VisuallyHidden } from "radix-ui";
import KanbanTaskUpdate from "./task-update";
import { useKanbanStore } from "@/lib/stores/kanban/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { Task } from "@/lib/stores/kanban/types";

export interface KanbanTaskProps {
  task: Task,
  columnId: string
}

const KanbanTask = (props: KanbanTaskProps) => {
  const { task: { id: taskId } } = props;
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const updateTask = useKanbanStore(state => state.updateTask);
  const removeTask = useKanbanStore(state => state.removeTask);

  // make the task to Sortable task
  // and get the ref, listeners attributes and CSS properties which we'll attach to the Task element
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: taskId
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="inline-grid"
    >
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
    </div>
  );
};

export default KanbanTask;