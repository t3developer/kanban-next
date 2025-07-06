import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Column, User } from './types';
import { ColumnActions, createColumnActions } from './actions-column';
import { createMoveTaskAction, createTaskActions, MoveTaskAction, TaskActions } from './actions-task';
import { CommentActions, createCommentActions } from './actions-comment';

type KanbanState = {
  columns: Column[],
  user: User
}

const initKanbanState: KanbanState = {
  columns: [],
  user: { name: '' }
};

export type KanbanStore = KanbanState &
  ColumnActions &
  TaskActions &
  MoveTaskAction &
  CommentActions;

export const useKanbanStore = create<KanbanStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...initKanbanState,
        ...createColumnActions(set),
        ...createTaskActions(set),
        ...createMoveTaskAction(set),
        ...createCommentActions(set)
      })),
      {
        name: 'kanban-store',
        partialize: (state) => {
          // Use destructuring to exclude the `user` property
          // we will initialize the user on client side (guest entry per request)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { user, ...rest } = state;
          return rest;
        },
      },
    ),
    { name: 'KanbanDevtools' }
  )
);
