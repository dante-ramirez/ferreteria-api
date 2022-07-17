import UsersStore from './UsersStore';
import OffersStore from './OffersStore';
import WalletsStore from './WalletsStore';

class SQLDatabase {
  public users: UsersStore;
  public offers: OffersStore;
  public wallet: WalletsStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    this.offers = new OffersStore(connection, 'offers');
    this.wallet = new WalletsStore(connection, 'wallet');
  }
}

export default SQLDatabase;
