import BaseStore from './BaseStore';
import Department from '../../entities/Department';
import {
  Pagination as _Pagination,
  DepartmentsFilter as _Filters
} from '../interfaces';

export default class DepartmentsStore extends BaseStore {
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
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<Department[]> { return [this.department]; }
}
