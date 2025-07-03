import { v4 as uuid } from "uuid";
import { Column } from "../store/slices/column-slice";

export enum BASIC_COLUMNS {
  'TO_DO' = 'to_do',
  'IN_PROGRESS' = 'in_progress',
  'COMPLETED' = 'completed'
};

export const basicColumns: Column[] = [
  { id: uuid(), label: 'To Do', type: BASIC_COLUMNS.TO_DO },
  { id: uuid(), label: 'In Progress', type: BASIC_COLUMNS.IN_PROGRESS },
  { id: uuid(), label: 'Completed', type: BASIC_COLUMNS.COMPLETED },
];
