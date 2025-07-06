import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { Column, User } from './types';
import { ColumnActions, createColumnActions } from './actions-column';
import { createMoveTaskAction, createTaskActions, MoveTaskAction, TaskActions } from './actions-task';
import { CommentActions, createCommentActions } from './actions-comment';
import { randomReadableName } from '@/lib/utils/random-name';

type KanbanState = {
  columns: Column[],
  user: User
}

const initKanbanState: KanbanState = {
  columns: [],
  user: { name: randomReadableName() }
};

export type KanbanStore = KanbanState &
  ColumnActions &
  TaskActions &
  MoveTaskAction &
  CommentActions;

export const useKanbanStore = create<KanbanStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initKanbanState,
        ...createColumnActions(set, get),
        ...createTaskActions(set, get),
        ...createMoveTaskAction(set, get),
        ...createCommentActions(set, get)
      })),
      { name: 'kanban-store' }
    ),
    { name: 'KanbanDevtools' }
  )
);
