import { StateCreator } from "zustand";
import { KanbanStore } from "../kanban-store";
import { v4 as uuid } from "uuid";
import { basicColumns } from "@/lib/data/columns";

export type Column = {
  id: string,
  label: string,
  type: string
}

type ColumnState = {
  columns: Column[]
}

type ColumnActions = {
  addColumn: (label: string, index: number) => void,
  deleteColumn: (id: string) => void,
  renameColumn: (id: string, label: string) => void
}

export type ColumnSlice = ColumnState & ColumnActions;

export const createColumnSlice: StateCreator<
  KanbanStore,
  [],
  [],
  ColumnSlice
> = (set) => ({
  columns: basicColumns,
  
  addColumn: (label: string, index: number) =>
    set(state => ({
      columns: state.columns.toSpliced(index + 1, 0, {
        id: uuid(),
        label,
        type: label.replaceAll(' ', '_').toLowerCase(),
      })
    })),

  deleteColumn: (id: string) =>
    set(state => ({
      columns: state.columns.filter(column => column.id !== id)
    })),

  renameColumn: (id: string, label: string) =>
    set(state => ({
      columns: state.columns.map(
        column => column.id === id ? {...column, label} : column
      )
    }))
});