import { v4 as uuid } from "uuid";
import { Column } from "../stores/kanban/types";

export enum BASIC_COLUMNS {
  'TO_DO' = 'to_do',
  'IN_PROGRESS' = 'in_progress',
  'COMPLETED' = 'completed'
};

export const defaultColumns: Column[] = [
  {
    id: uuid(),
    label: 'To Do',
    type: BASIC_COLUMNS.TO_DO,
    tasks: []
  },
  {
    id: uuid(),
    label: 'In Progress',
    type: BASIC_COLUMNS.IN_PROGRESS, tasks:
    [] 
  },
  {
    id: uuid(),
    label: 'Completed',
    type: BASIC_COLUMNS.COMPLETED,
    tasks: []
  },
];
