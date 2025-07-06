export type User = {
  name: string;
};

export type Comment = {
  id: string,
  comment: string,
  createdAt: Date,
  updatedAt: Date,
  createdBy: string
}

export type Task = {
  id: string,
  title: string,
  description?: string,
  status: string,
  createdAt: Date,
  updatedAt: Date,
  createdBy: string,
  comments: Comment[]
}

export type Column = {
  id: string,
  label: string,
  type: string,
  tasks: Task[]
}