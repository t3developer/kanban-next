import { KanbanStore } from "./store";
import { Column, Comment } from "./types";
import { v4 as uuid } from "uuid";

export type CommentActions = {
  addComment: (taskId: string, comment: string) => void;
  removeComment: (taskId: string, commentId: string) => void;
  updateComment: (taskId: string, updatedComment: Comment) => void;
};

export const createCommentActions = (
  set: (fn: (state: KanbanStore) => void) => void,
  get: () => { columns: Column[] }
): CommentActions => ({
  addComment: (taskId, comment) =>
    set((state) => {
      for (const column of state.columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          task.comments.push({
            id: uuid(),
            comment,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          break;
        }
      }
    }),

  removeComment: (taskId, commentId) =>
    set((state) => {
      for (const column of state.columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          task.comments = task.comments.filter((c) => c.id !== commentId);
          break;
        }
      }
    }),

  updateComment: (taskId, updatedComment) =>
    set((state) => {
      for (const column of state.columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          task.comments = task.comments.map((c) =>
            c.id === updatedComment.id
              ? { ...c, ...updatedComment, updatedAt: new Date() }
              : c
          );
          break;
        }
      }
    }),
});