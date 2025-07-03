import { StateCreator } from "zustand";
import { KanbanStore } from "../kanban-store";
import {v4 as uuid} from 'uuid';

type Task = {
  id: string,
  title: string,
  description?: string,
  status: string,
  createdAt: Date,
  updatedAt: Date
}

type TaskState = {
  tasks: Task[],
}

type TaskActions = {
  addTask: (title: string, status: string, description?: string) => void,
  updateTask: (id: string, status: string, title?: string, description?: string) => void,
  deleteTask: (id: string) => void
}

export type TaskSlice = TaskState & TaskActions;

export const createTaskSlice: StateCreator<
  KanbanStore, // main store type
  [], // middlewares
  [],
  TaskSlice // current slice type
> = (set) => ({
  tasks: [],

  addTask: (title: string, status: string, description?: string) =>
    set(state => ({
      tasks: [
        ...state.tasks,
        {
          id: uuid(),
          title, description,
          status: status, 
          createdAt: new Date(),
          updatedAt: new Date() 
        }
      ]
    })),
  
  deleteTask: (id: string) =>
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
  
  updateTask: (id: string, status: string, title?: string, description?: string) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? {
          ...task,
          status,
          title: title || task.title,
          description: description || task.description,
          updatedAt: new Date()
        } : task
      )
    }))
});