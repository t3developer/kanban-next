'use client';
import { useKanbanStore } from "@/lib/stores/kanban/store";
import KanbanColumn from "./column";
import KanbanInitializer from "../kanban-initializer";
import { useShallow } from "zustand/shallow";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanTask from "../tasks/task";
import { useState } from "react";
import { Column } from "@/lib/stores/kanban/types";

interface KanbanColumnsPops {
  columns: Column[]
}

const KanbanColumns = ({ columns }: KanbanColumnsPops) => {
  const moveTask = useKanbanStore(state => state.moveTaskToColumn);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Helper: Find task by id
  const findTask = (id: string) => {
    for (const col of columns) {
      const task = col.tasks.find((t) => t.id === id);
      if (task) return { task, columnId: col.id };
    }
    return null;
  };

  // Helper: Find [columnId, index] for a task
  const findTaskLocation = (taskId: string) => {
    for (const col of columns) {
      const idx = col.tasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) return { columnId: col.id, index: idx };
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    document.body.classList.add('kanban-dragging');
    setActiveTaskId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTaskId(null);
    document.body.classList.remove('kanban-dragging');

    if (!active || !over || active.id === over.id) return;

    const from = findTaskLocation(active.id as string);

    let to = findTaskLocation(over.id as string);
    if (!to) {
      // Check for bottom drop zone:
      const bottomDropMatch = /^bottom-drop-(.+)$/.exec(over.id as string);
      if (bottomDropMatch) {
        const columnId = bottomDropMatch[1];
        const col = columns.find(c => c.id === columnId);
        to = { columnId, index: col ? col.tasks.length : 0 };
      } else {
        // Fallback: dropped on empty column
        to = { columnId: over.id as string, index: columns.find(c => c.id === over.id)?.tasks.length ?? 0 };
      }
    }

    if (from && to) {
      moveTask(active.id as string, from.columnId, to.columnId, to.index);
    }
  };

  return (
    <>
      <KanbanInitializer />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <section className='w-full h-full flex gap-4 lg:gap-8'>
          {columns && columns.map(column => (
            <SortableContext
              key={column.id}
              id={column.id}
              items={column.tasks.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                column={column}
                columnIndex={columns.findIndex(c => c.id === column.id)}
              />
            </SortableContext>
          ))}
        </section>

        <DragOverlay className="inline-grid">
          {activeTaskId
            ? (() => {
                const found = findTask(activeTaskId);
                return found ? (
                  <KanbanTask
                    task={found.task}
                    columnId={found.columnId}
                    isOverlay={true}
                  />
                ) : null;
              })()
            : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default KanbanColumns;