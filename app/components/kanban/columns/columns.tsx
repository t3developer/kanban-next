'use client';
import KanbanColumn from "./column";
import KanbanInitializer from "../kanban-initializer";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanTask from "../tasks/task";
import { Column } from "@/lib/stores/kanban/types";
import { useKanbanDnd } from "@/app/hooks/use-kanban-dnd";

interface KanbanColumnsPops {
  columns: Column[]
}

const KanbanColumns = ({ columns }: KanbanColumnsPops) => {
  const {
    sensors,
    activeTaskId,
    findTask,
    handleDragStart,
    handleDragEnd
  } = useKanbanDnd(columns);

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