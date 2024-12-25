export interface Employee {
  id: string;
  createdAt: Date;
  updatdAt: Date;
  email: string;
  fullName: string;
  role: string;
  isBlocked: false;
}

export interface CreateEmployeeForm {
  email: string;
  username: string;
  fullName: string;
}
