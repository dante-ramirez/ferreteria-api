import BaseStore from './BaseStore';
import Department from '../../entities/departments';
import {
  Pagination as _Pagination
  // UsersFilter as _Filters
} from '../interfaces';

export default class Departments extends BaseStore {
  protected connection: any;
  private department: Department;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.department = new Department(0, '', 0);
  }

  async create(_department: Department): Promise<Department> { return this.department; }
  async getByID(_id: number): Promise<Department> { return this.department; }
  async getByName(_name: string): Promise<Department> { return this.department; }
  async update(_department: Department): Promise<Department> { return this.department; }
}
