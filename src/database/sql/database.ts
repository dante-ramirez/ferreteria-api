import UsersStore from './UsersStore';
// import ProductsStore from './ProductsStore';
// import PacksStore from './PacksStore';

class SQLDatabase {
  public users: UsersStore;
  // public products: ProductsStore;
  // public packs: PacksStore;

  constructor(connection: any) {
    this.users = new UsersStore(connection, 'users');
    // this.products = new ProductsStore(connection, 'products');
    // this.packs = new PacksStore(connection, 'packs');
  }
}

export default SQLDatabase;
