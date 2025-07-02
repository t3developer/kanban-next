import { StateCreator } from "zustand";
import { KanbanStore } from "../kanban-store";
import { v4 as uuid } from "uuid";

type Column = {
  id: string,
  label: string,
  type: string,
  order: number
}

type ColumnState = {
  columns: Column[]
}

type ColumnActions = {
  addColumn: (label: string, order: number) => void,
  deleteColumn: (id: string) => void
}

export type ColumnSlice = ColumnState & ColumnActions;

const defaultColumns: Column[] = [
  { id: uuid(), label: 'To Do', type: 'to_do', order: 1 },
  { id: uuid(), label: 'In Progress', type: 'in_process', order: 2 },
  { id: uuid(), label: 'Completed', type: 'completed', order: 3 },
];

export const createColumnSlice: StateCreator<
  KanbanStore,
  [],
  [],
  ColumnSlice
> = (set) => ({
  columns: defaultColumns,
  
  addColumn: (label: string, order: number) =>
    set(state => ({
      columns: [
        ...state.columns,
        { id: uuid(), label, type: label.replaceAll(' ', '_').toLowerCase(), order }
      ]
    })),

  deleteColumn: (id: string) =>
    set(state => ({
      columns: state.columns.filter(column => column.id !== id)
    }))
});