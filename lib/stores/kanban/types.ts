
export type Comment = {
  id: string,
  comment: string,
  createdAt: Date,
  updatedAt: Date
}

export type Task = {
  id: string,
  title: string,
  description?: string,
  status: string,
  createdAt: Date,
  updatedAt: Date,
  comments: Comment[]
}

export type Column = {
  id: string,
  label: string,
  type: string,
  tasks: Task[]
}