import UsersStore from './UsersStore';
import DepartmentsStore from './DepartmentsStore';
import CategoriesStore from './CategoriesStore';
import BrandsStore from './BrandsStore';
import WalletsStore from './WalletsStore';
import OffersStore from './OffersStore';
import InvoicesStore from './InvoicesStore';
import FavoritesStore from './FavoritesStore';
import SalesStore from './SalesStore';
import SaleDetailsStore from './SaleDetailsStore';

class SQLDatabase {
  public users: UsersStore;
  public departments: DepartmentsStore;
  public categories: CategoriesStore;
  public brands: BrandsStore;
  public wallet: WalletsStore;
  public offers: OffersStore;
  public invoice: InvoicesStore;
  public favorite: FavoritesStore;
  public sale: SalesStore;
  public saleDetail: SaleDetailsStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.departments = new DepartmentsStore(connection, 'department');
    this.categories = new CategoriesStore(connection, 'category');
    this.brands = new BrandsStore(connection, 'brand');
    this.wallet = new WalletsStore(connection, 'wallet');
    this.offers = new OffersStore(connection, 'offers');
    this.invoice = new InvoicesStore(connection, 'invoice');
    this.favorite = new FavoritesStore(connection, 'favorites');
    this.sale = new SalesStore(connection, 'sales');
    this.saleDetail = new SaleDetailsStore(connection, 'sales_detail');
  }
}

export default SQLDatabase;
