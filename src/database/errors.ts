import APIError from '../entities/APIError';

export class DatabaseError extends APIError {}

export class UnsupportedDatabaseDriver extends DatabaseError {
  constructor(driver:string) {
    super(driver);

    this.message = `${driver} is a unsupported database driver`;
  }
}

export class ItemNotFound extends DatabaseError {
  constructor(missinngThing:string) {
    super(`${missinngThing} was/were not found in database`);
  }
}

export class ItemAlreadyExist extends DatabaseError {
  item:any;

  constructor(item: any) {
    super('this item already exist in database');

    this.item = item;
  }
}

export class DataWasNotStored extends DatabaseError {}
