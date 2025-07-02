import { create } from 'zustand';
import { ColumnSlice, createColumnSlice } from "./slices/column-slice";
import { createTaskSlice, TaskSlice } from "./slices/task-slice";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from 'zustand/shallow';

export type KanbanStore = TaskSlice & ColumnSlice;

export const useKanbanStore = create<KanbanStore>()(
  devtools(
    persist(
      immer((...args) => ({
        ...createTaskSlice(...args),
        ...createColumnSlice(...args),
      })),
      { name: 'kanban-store' }
    ),
    { name: 'KanbanDevtools' }
  )
);

// export const useKanbanStore = <T>(selector: (state: KanbanStore) => T) =>
//   useKanbanUnShallowStore(useShallow(selector));