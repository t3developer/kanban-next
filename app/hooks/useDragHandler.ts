import { Column, Task } from "@/lib/stores/kanban/types";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

export function useDragHandler(columns: Column[]) {
  const [ sortedTasks, setSortedTasks ] = useState<Task[]>([]);
  const [ targetColumnId, setTargetColumnId ] = useState<string | null>(null);

  const useDragEvent = (e: DragEndEvent) => {
    return {
      draggedTask: e.active.id.toString(),
      draggedOverTask: e.over?.id.toString(),
      initialContainer: e.active.data.current?.sortable.containerId, // current column Id where where dragging started
      targerContainer: e.over?.data.current?.sortable.containerId // target column Id where dragging's being over
    };
  }

  const getColumn = (columnId: string) => {
    return columns.find((c) => c.id === columnId);
  };

  const getColumnByTask = (taskId: string) => {
    return columns.find(c => c.tasks.some(t => t.id === taskId));
  }

  const sortColumnTasks = (columnId: string, activeTaskId: string, overTaskId: string) => {
    const column = getColumn(columnId);
    if (column) {
      const oldIndex = column.tasks.findIndex(t => t.id === activeTaskId);
      const newIndex = column.tasks.findIndex(t => t.id === overTaskId);
      return arrayMove(column.tasks, oldIndex, newIndex);
    }
  }

  const dragEndHandler = (e: DragEndEvent) => {
    const {
      draggedTask,
      draggedOverTask,
      initialContainer,
      targerContainer
    } = useDragEvent(e);

    console.log(draggedTask, draggedOverTask, initialContainer, targerContainer);
    
    // check if the task position is still the same
    // and hasn't been dragged over other task yet
    if (draggedTask === draggedOverTask) return;

    // check if the task's not in the same column (i.e. moved to another column)
    if (initialContainer !== targerContainer) return;

    
    // evaluate the task's position based on the drag and target position
    // sort the tasks array of that column and then update the state in the end
    const sortedTasks = sortColumnTasks(initialContainer, draggedTask, draggedOverTask!);
    if (sortedTasks) {
      setTargetColumnId(initialContainer);
      setSortedTasks(sortedTasks);
    }
  };

  const dragOverHandler = (e: DragOverEvent) => {
    // check if task is dragged into unknown area
    if (!e.over) return;

    const {
      draggedTask,
      draggedOverTask,
      initialContainer,
      targerContainer
    } = useDragEvent(e);

    console.log(draggedTask, draggedOverTask, initialContainer, targerContainer);

    // item is not sortable item
    if (!initialContainer) return;

    // if there is no target container then item is moved into a droppable zone
    // when the sortable list (column) is empty
    if (!targerContainer) {
      // todo: when the task is already there
      //...

      // // other first, remove it from the current column
      // const initialColumn = getColumn(initialContainer);
      // const initialColumnTasks = initialColumn?.tasks.filter(t => t.id !== draggedTask);
      // if (initialColumnTasks) {
      //   setTargetColumnId(initialContainer);
      //   setSortedTasks(initialColumnTasks);
      // }

      // // secondly, add it to the column where it's been dragged
      // const targetColumn = getColumnByTask(draggedOverTask!);
    }

    // if the task is dragged around in the same column then just reorder the list
    if (initialContainer === targerContainer) {
      const sortedTasks = sortColumnTasks(initialContainer, draggedTask, draggedOverTask!);
      if (sortedTasks) {
        // setTargetColumnId(initialContainer);
        // setSortedTasks(sortedTasks);
        return;
      }
    } else {
      // other the task is dragged into another column

      // first, remove it from the initial column
      const initialColumn = getColumn(initialContainer);
      const targetTask = initialColumn?.tasks.find(t => t.id === draggedTask);
      const initialColumnTasks = initialColumn?.tasks.filter(t => t.id !== draggedTask);
      if (initialColumnTasks) {
        // setTargetColumnId(initialContainer);
        // setSortedTasks(initialColumnTasks);
      }

      // second, add it into the target column
      const targetColumn = getColumn(targerContainer);  
      const targetTaskIdx = targetColumn?.tasks.findIndex(t => t.id === draggedOverTask);
      const targetContainerTasks = targetColumn?.tasks.splice(targetTaskIdx!, 0, targetTask!);
      if (targetContainerTasks) {
        // setTargetColumnId(targerContainer);
        // setSortedTasks(targetContainerTasks);
      }
    }
  };

  return {
    targetColumnId,
    sortedTasks,
    dragEndHandler,
    dragOverHandler
  }
}