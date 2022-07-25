import UsersStore from './UsersStore';
import DepartmentsStore from './DepartmentsStore';
import CategoriesStore from './CategoriesStore';
import BrandsStore from './BrandsStore';
import WalletsStore from './WalletsStore';
<<<<<<< HEAD
import InvoicesStore from './InvoicesStore';
import FavoritesStore from './FavoritesStore';
import SalesStore from './SalesStore';
import SaleDetailsStore from './SaleDetailsStore';
=======
import OffersStore from './OffersStore';
>>>>>>> a08ab89 (Restore deleted files)

class SQLDatabase {
  public users: UsersStore;
  public departments: DepartmentsStore;
  public categories: CategoriesStore;
  public brands: BrandsStore;
  public wallet: WalletsStore;
<<<<<<< HEAD
  public invoice: InvoicesStore;
  public favorite: FavoritesStore;
  public sale: SalesStore;
  public saleDetail: SaleDetailsStore;
=======
  public offers: OffersStore;
>>>>>>> a08ab89 (Restore deleted files)

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.departments = new DepartmentsStore(connection, 'department');
    this.categories = new CategoriesStore(connection, 'category');
    this.brands = new BrandsStore(connection, 'brand');
    this.wallet = new WalletsStore(connection, 'wallet');
<<<<<<< HEAD
    this.invoice = new InvoicesStore(connection, 'invoice');
    this.favorite = new FavoritesStore(connection, 'favorites');
    this.sale = new SalesStore(connection, 'sales');
    this.saleDetail = new SaleDetailsStore(connection, 'sales_detail');
=======
    this.offers = new OffersStore(connection, 'offers');
>>>>>>> a08ab89 (Restore deleted files)
  }
}

export default SQLDatabase;
