import Department from '../../entities/departments';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import Departments from '../generic/Department';
import {
  Pagination as _Pagination
  // UsersFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLDepartmentsStore extends Departments {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(department: Department): Promise<Department> {
    try {
      const [newDepartment] = await this.connection(this.table)
        .insert({
          name: department.name,
          discount: department.discount
        })
        .returning('*');

      return this.softFormatDepartment(newDepartment);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(department);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(department: Department): Promise<Department> {
    try {
      const timestamp = new Date();
      const [departmentUpdate] = await this.connection(this.table)
        .where('id', department.id)
        .update({
          name: department.name,
          discount: department.discount,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatDepartment(departmentUpdate);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      throw new SQLDatabaseError(error);
    }
  }

  async getByID(id: number): Promise<Department> {
    let department: any;

    try {
      [department] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`department with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!department) {
      throw new ItemNotFound(`department with id ${id} `);
    }

    return this.softFormatDepartment(department);
  }

  async getByName(name: string): Promise<Department> {
    let department: any;

    try {
      [department] = await this.connection(this.table)
        .select('*')
        .where('name', name);
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!department) {
      throw new ItemNotFound(`department with name ${name}`);
    }

    return this.softFormatDepartment(department);
  }

  private softFormatDepartment(department: any): Department {
    return new Department(
      Number(department.id),
      department.name,
      department.discount
    );
  }
}
