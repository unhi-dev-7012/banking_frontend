export interface Employee {
  id: string;
  createdAt: Date;
  updatdAt: Date;
  email: string;
  fullName: string;
  role: string;
}

export interface CreateEmployeeForm {
  email: string;
  username: string;
  fullName: string;
}
