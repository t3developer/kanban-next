import { createStore } from 'zustand/vanilla'
import { ColumnSlice, createColumnSlice } from "./slices/column-slice";
import { createTaskSlice, TaskSlice } from "./slices/task-slice";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

export type KanbanStore = TaskSlice & ColumnSlice;

export const createKanbanStore = () => createStore<KanbanStore>()(
  devtools(
    immer((...args) => ({
      ...createTaskSlice(...args),
      ...createColumnSlice(...args),
    })),
    { name: 'KanbanDevtools' }
  )
);