import UsersStore from './UsersStore';
import DepartmentsStore from './DepartmentsStore';
// import PacksStore from './PacksStore';

class SQLDatabase {
  public users: UsersStore;
  public departments: DepartmentsStore;
  // public packs: PacksStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.departments = new DepartmentsStore(connection, 'department');
    // this.packs = new PacksStore(connection, 'packs');
  }
}

export default SQLDatabase;
