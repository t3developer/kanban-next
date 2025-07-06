import { useState, useCallback } from "react";
import {
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { Column } from "@/lib/stores/kanban/types";
import { useKanbanStore } from "@/lib/stores/kanban/store";

/**
 * Custom hook to encapsulate all drag-and-drop logic for Kanban columns/tasks.
 * Keeps the KanbanColumns component focused on rendering.
 */
export function useKanbanDnd(columns: Column[]) {
  // Store action for moving a task
  const moveTask = useKanbanStore(state => state.moveTaskToColumn);

  // Track the currently dragged task by ID (for overlays, etc.)
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // Setup sensors for drag-and-drop (e.g. mouse, touch)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  /**
   * Find a task by ID and return the task and the column it belongs to.
   * @param id - The task ID to search for
   * @returns { task, columnId } or null if not found
   */
  const findTask = useCallback((id: string) => {
    for (const col of columns) {
      const task = col.tasks.find((t) => t.id === id);
      if (task) return { task, columnId: col.id };
    }
    return null;
  }, [columns]);

  /**
   * Find the task's location in the board: which column and its index.
   * @param taskId - The task ID to locate
   * @returns { columnId, index } or null if not found
   */
  const findTaskLocation = useCallback((taskId: string) => {
    for (const col of columns) {
      const idx = col.tasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) return { columnId: col.id, index: idx };
    }
    return null;
  }, [columns]);

  /**
   * Handler for when a drag starts.
   * Sets the active task ID and adds a CSS class for cursor feedback.
   */
  const handleDragStart = useCallback((event: DragStartEvent) => {
    document.body.classList.add('kanban-dragging');
    setActiveTaskId(event.active.id as string);
  }, []);

  /**
   * Handler for when a drag ends.
   * Calculates the new location and moves the task if valid.
   * Always cleans up activeTaskId and CSS classes.
   */
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTaskId(null);
    document.body.classList.remove('kanban-dragging');

    // No movement or dropped outside valid area
    if (!active || !over || active.id === over.id) return;

    // Find where the task came from
    const from = findTaskLocation(active.id as string);

    // Find where the task is dropped to
    let to = findTaskLocation(over.id as string);

    if (!to) {
      // Check if dropped on bottom drop zone (special area for last position)
      const bottomDropMatch = /^bottom-drop-(.+)$/.exec(over.id as string);
      if (bottomDropMatch) {
        const columnId = bottomDropMatch[1];
        const col = columns.find(c => c.id === columnId);
        to = { columnId, index: col ? col.tasks.length : 0 };
      } else {
        // Fallback: dropped on empty column itself
        to = { columnId: over.id as string, index: columns.find(c => c.id === over.id)?.tasks.length ?? 0 };
      }
    }

    // If both from and to locations are valid, move the task
    if (from && to) {
      moveTask(active.id as string, from.columnId, to.columnId, to.index);
    }
  }, [columns, moveTask, findTaskLocation]);

  // Return all the DnD state and handlers the component needs
  return {
    sensors,
    activeTaskId,
    findTask,
    handleDragStart,
    handleDragEnd
  };
}