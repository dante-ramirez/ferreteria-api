import UsersStore from './UsersStore';
import DepartmentsStore from './DepartmentsStore';
import CategoriesStore from './CategoriesStore';
import BrandsStore from './BrandsStore';
import WalletsStore from './WalletsStore';

class SQLDatabase {
  public users: UsersStore;
  public departments: DepartmentsStore;
  public categories: CategoriesStore;
  public brands: BrandsStore;
  public wallet: WalletsStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.departments = new DepartmentsStore(connection, 'department');
    this.categories = new CategoriesStore(connection, 'category');
    this.brands = new BrandsStore(connection, 'brand');
    this.wallet = new WalletsStore(connection, 'wallet');
  }
}

export default SQLDatabase;
