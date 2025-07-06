import { v4 as uuid } from "uuid";
import { KanbanStore } from "./store";
import { Task } from "./types";


export type ColumnActions = {
  addColumn: (label: string, index: number) => void,
  removeColumn: (id: string) => void,
  renameColumn: (id: string, label: string) => void,
  setColumnTasks: (columnId: string, tasks: Task[]) => void
}

export const createColumnActions = (
  set: (fn: (state: KanbanStore) => void) => void
): ColumnActions => ({
  addColumn: (label: string, index: number) =>
    set(state => ({
      columns: state.columns.toSpliced(index + 1, 0, {
        id: uuid(),
        label,
        type: label.replaceAll(' ', '_').toLowerCase(),
        tasks: []
      })
    })),

  removeColumn: (id: string) =>
    set(state => ({
      columns: state.columns.filter(column => column.id !== id)
    })),

  renameColumn: (id: string, label: string) =>
    set(state => ({
      columns: state.columns.map(
        column => column.id === id ? {...column, label} : column
      )
    })),

  setColumnTasks: (columnId, tasks) =>
    set((state) => {
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.tasks = tasks;
      }
    }),
});