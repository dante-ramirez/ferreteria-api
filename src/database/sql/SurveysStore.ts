import Survey from '../../entities/Survey';
import { ItemAlreadyExist, ItemNotFound } from '../errors';
import SurveysStore from '../generic/SurveysStore';
import {
  Pagination as _Pagination,
  SurveysFilter as _Filters
} from '../interfaces';
import {
  SQLDatabaseError,
  MissingField,
  InvalidDataType,
  NULL_VALUE_ERROR,
  INVALID_INPUT_SYNTAX_CODE,
  DUPLICATED_KEY_ERROR
} from './errors';

export default class SQLSurveysStore extends SurveysStore {
  // constructor(connection: any, table: string) {
  //   super(connection, table);
  //   // this.packs = new UsersPacksStore(connection, 'users_packs');
  // }

  async create(survey: Survey): Promise<Survey> {
    try {
      const [newSurveys] = await this.connection(this.table)
        .insert({
          link: survey.link
        })
        .returning('*');

      return this.softFormatSurvey(newSurveys);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      if ((error as any).code === DUPLICATED_KEY_ERROR) {
        throw new ItemAlreadyExist(survey);
      }
      throw new SQLDatabaseError(error);
    }
  }

  async update(survey: Survey): Promise<Survey> {
    try {
      const timestamp = new Date();
      const [surveyUpdate] = await this.connection(this.table)
        .where('id', survey.id)
        .update({
          link: survey.link,
          updated_at: timestamp
        })
        .returning('*');

      return this.softFormatSurvey(surveyUpdate);
    } catch (error) {
      if ((error as any).code === NULL_VALUE_ERROR) {
        throw new MissingField((error as any).column, this.table);
      }

      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new InvalidDataType(error);
      }

      throw new SQLDatabaseError(error);
    }
  }

  async getById(id: number): Promise<Survey> {
    let survey: any;

    try {
      [survey] = await this.connection(this.table)
        .select('*')
        .where('id', id);
    } catch (error) {
      if ((error as any).code === INVALID_INPUT_SYNTAX_CODE) {
        throw new ItemNotFound(`survey with id ${id} `);
      }

      throw new SQLDatabaseError(error);
    }

    if (!survey) {
      throw new ItemNotFound(`survey with id ${id} `);
    }

    return this.softFormatSurvey(survey);
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.connection(this.table)
        .where('id', id)
        .del();

      return true;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }
  }

  async get(filters: _Filters, pagination: _Pagination): Promise<Survey[]> {
    let surveys: any[] = [];
    let query = this.connection(this.table).select('*');

    query = this.applyFilters(query, filters);
    query = this.applyPagination(query, pagination);

    try {
      surveys = await query;
    } catch (error) {
      throw new SQLDatabaseError(error);
    }

    if (!surveys.length) {
      throw new ItemNotFound(this.table);
    }

    return surveys.map((survey: any) => this.softFormatSurvey(survey));
  }

  private softFormatSurvey(survey: any): Survey {
    return new Survey(
      Number(survey.id),
      survey.link
    );
  }
}
