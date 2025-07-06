import { KanbanStore } from "./store";
import { v4 as uuid } from "uuid";
import { Task } from "./types";

export type TaskActions = {
  addTask: (columnId: string, title: string, user: string, description?: string) => void,
  updateTask: (columnId: string, updatedTask: Task) => void,
  removeTask: (columnId: string, taskId: string) => void
};

export type MoveTaskAction = {
  moveTaskToColumn: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string,
    insertIndex?: number
  ) => void;
};

export const createTaskActions = (
  set: (fn: (state: KanbanStore) => void) => void
): TaskActions => ({
  addTask: (columnId, title, user, description) =>
    set((state) => {
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.tasks.push({
          id: uuid(),
          title,
          description,
          status: column.type, 
          createdAt: new Date(),
          updatedAt: new Date(),
          comments: [],
          createdBy: user
        });
      }
    }),

  updateTask: (columnId, updatedTask) =>
    set((state) => {
      const currentColumn = state.columns.find(col => col.id === columnId);
      const newColumn = state.columns.find(col => col.type === updatedTask.status);

      if (!currentColumn || !newColumn) return;

      // if no task status is changed but something else
      if (currentColumn.id === newColumn.id) {
        currentColumn.tasks = currentColumn.tasks.map(task => task.id === updatedTask.id ? {...updatedTask, updatedAt: new Date()} : task);
        return;
      }

      // if task status has been changed then remove it from the current column
      currentColumn.tasks = currentColumn.tasks.filter(task => task.id !== updatedTask.id);

      // adding to the new column at the beginning
      newColumn.tasks = [{
        ...updatedTask,
        updatedAt: new Date()
      }].concat(newColumn.tasks);
    }),

  removeTask: (columnId, taskId) =>
    set((state) => {
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      }
    }),
});

export const createMoveTaskAction = (
  set: (fn: (state: KanbanStore) => void) => void
): MoveTaskAction => ({
  /**
   * Moves a task from one column to another (or within the same column).
   *
   * @param taskId - The ID of the task to move.
   * @param fromColumnId - The column ID the task is currently in.
   * @param toColumnId - The column ID the task should move to.
   * @param insertIndex - (Optional) The index in the destination column to insert the task at.
   */
  moveTaskToColumn: (taskId, fromColumnId, toColumnId, insertIndex) =>
    set((state) => {
      // Find the source and destination columns
      const fromColumn = state.columns.find((col) => col.id === fromColumnId);
      const toColumn = state.columns.find((col) => col.id === toColumnId);
      if (!fromColumn || !toColumn) return;

      // Find the task's index in the source column
      const taskIndex = fromColumn.tasks.findIndex((t) => t.id === taskId);
      const task = fromColumn.tasks[taskIndex];
      if (!task) return;

      // Remove the task from the source column 
      fromColumn.tasks.splice(taskIndex, 1);

      // Determine the new position in the destination column
      const position = insertIndex ?? toColumn.tasks.length;

      // Insert the task into the destination column at the specified index.
      // We also update the status and updatedAt fields.
      toColumn.tasks.splice(position, 0, {
        ...task,
        status: toColumn.type,
        updatedAt: new Date(),
      });
    }),
});