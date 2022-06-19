import { DatabaseError } from '../errors';

export class SQLDatabaseError extends DatabaseError {}
export class InvalidDataType extends SQLDatabaseError {}
export class MissingField extends SQLDatabaseError {
  constructor(columnError: string, table: string) {
    super(`Error triying to insert on table ${table} on column ${columnError}`);
  }
}

export const NULL_VALUE_ERROR = '23502';
export const INVALID_INPUT_SYNTAX_CODE = '22P02';
export const DUPLICATED_KEY_ERROR = '23505';
