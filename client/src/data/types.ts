export enum TaskStatus {
  "TO_DO" = 0,
  "DONE" = 1,
}

export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  status: TaskStatus;
}
