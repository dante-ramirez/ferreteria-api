import UsersStore from './UsersStore';
import DepartmentsStore from './DepartmentsStore';
import CategoriesStore from './CategoriesStore';
import BrandsStore from './BrandsStore';
import WalletsStore from './WalletsStore';
import OffersStore from './OffersStore';

class SQLDatabase {
  public users: UsersStore;
  public departments: DepartmentsStore;
  public categories: CategoriesStore;
  public brands: BrandsStore;
  public wallet: WalletsStore;
  public offers: OffersStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.departments = new DepartmentsStore(connection, 'department');
    this.categories = new CategoriesStore(connection, 'category');
    this.brands = new BrandsStore(connection, 'brand');
    this.wallet = new WalletsStore(connection, 'wallet');
    this.offers = new OffersStore(connection, 'offers');
  }
}

export default SQLDatabase;
