'use client';
import { useKanbanStore } from "@/lib/stores/kanban/store";
import KanbanColumn from "./column";
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanInitializer from "../kanban-initializer";

const KanbanColumns = () => {
  let columns = useKanbanStore(state => state.columns);

  // adding distance so that sensor starts working after task being dragged for 5px
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5
    }
   }));

  const dragEndHandler = (e: DragEndEvent) => {
    const draggedTask = e.active.id;
    const draggedOverTask = e.over?.id;
    // check if the task position is still the same
    // and hasn't been dragged over other task yet
    if (draggedTask === draggedOverTask) return;

    const currentContainer = e.active.data.current?.sortable.containerId; // current column Id where dragging is happening
    const draggedOverContainer = e.over?.data.current?.sortable.containerId;
    // check if the task's not in the same column (i.e. moved to another column)
    if (currentContainer !== draggedOverContainer)
      return;

    
    // change the task's position based on the drag and target position
    const oldIndex = columns.findIndex((p) => p.id === draggedTask);
    const newIndex = columns.findIndex((p) => p.id === draggedOverTask);
    const sortedColumns = arrayMove(columns, oldIndex, newIndex);
    console.log('sortedColumns', sortedColumns);
  };

  return (
    <>
      <KanbanInitializer />
      <DndContext sensors={sensors} onDragEnd={dragEndHandler} collisionDetection={closestCenter}>
        <section className='w-full h-full flex gap-4 lg:gap-8'>
          {columns && columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              columnIndex={columns.findIndex(c => c.id === column.id)}
            />
          ))}
        </section>
      </DndContext>
    </>
  );
};

export default KanbanColumns;