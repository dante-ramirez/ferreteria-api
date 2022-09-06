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
import ProductsStore from './ProductsStore';

class SQLDatabase {
  public users: UsersStore;
  public departments: DepartmentsStore;
  public categories: CategoriesStore;
  public brands: BrandsStore;
  public wallets: WalletsStore;
  public offers: OffersStore;
  public invoices: InvoicesStore;
  public favorites: FavoritesStore;
  public sales: SalesStore;
  public saleDetails: SaleDetailsStore;
  public products: ProductsStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.departments = new DepartmentsStore(connection, 'department');
    this.categories = new CategoriesStore(connection, 'category');
    this.brands = new BrandsStore(connection, 'brand');
    this.wallets = new WalletsStore(connection, 'wallet');
    this.offers = new OffersStore(connection, 'offers');
    this.invoices = new InvoicesStore(connection, 'invoice');
    this.favorites = new FavoritesStore(connection, 'favorites');
    this.sales = new SalesStore(connection, 'sales');
    this.saleDetails = new SaleDetailsStore(connection, 'sale_detail');
    this.products = new ProductsStore(connection, 'products');
  }
}

export default SQLDatabase;
