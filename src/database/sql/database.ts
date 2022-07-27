import UsersStore from './UsersStore';
import OffersStore from './OffersStore';
import WalletsStore from './WalletsStore';
import InvoicesStore from './InvoicesStore';
import FavoritesStore from './FavoritesStore';
import SalesStore from './SalesStore';
import SaleDetailsStore from './SaleDetailsStore';

class SQLDatabase {
  public users: UsersStore;
  public offers: OffersStore;
  public wallet: WalletsStore;
  public invoice: InvoicesStore;
  public favorite: FavoritesStore;
  public sale: SalesStore;
  public saleDetail: SaleDetailsStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.offers = new OffersStore(connection, 'offers');
    this.wallet = new WalletsStore(connection, 'wallet');
    this.invoice = new InvoicesStore(connection, 'invoice');
    this.favorite = new FavoritesStore(connection, 'favorites');
    this.sale = new SalesStore(connection, 'sales');
    this.saleDetail = new SaleDetailsStore(connection, 'sales_detail');
  }
}

export default SQLDatabase;
