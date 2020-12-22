export interface Task {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  taskPriorityCodeId: number;
  taskStatuCodeId: number;
  userId: string;
  note: string;
}
