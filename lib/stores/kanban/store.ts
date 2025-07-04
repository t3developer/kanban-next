import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Column } from './types';
import { ColumnActions, createColumnActions } from './actions-column';
import { createTaskActions, TaskActions } from './actions-task';
import { CommentActions, createCommentActions } from './actions-comment';

type KanbanState = {
  columns: Column[]
}

const initKanbanState: KanbanState = {
  columns: []
};

export type KanbanStore = KanbanState &
  ColumnActions &
  TaskActions &
  CommentActions;

export const useKanbanStore = create<KanbanStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initKanbanState,
        ...createColumnActions(set, get),
        ...createTaskActions(set, get),
        ...createCommentActions(set, get)
      })),
      { name: 'kanban-store' }
    ),
    { name: 'KanbanDevtools' }
  )
);
