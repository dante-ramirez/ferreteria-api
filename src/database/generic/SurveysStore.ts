import BaseStore from './BaseStore';
import Survey from '../../entities/Survey';
import {
  Pagination as _Pagination,
  SurveysFilter as _Filters
} from '../interfaces';

export default class SurveysStore extends BaseStore {
  protected connection: any;
  private survey: Survey;

  constructor(connection: any, table: string) {
    super(connection, table);
    this.survey = new Survey(0, '');
  }

  async create(_survey: Survey): Promise<Survey> { return this.survey; }
  async getById(_id: number): Promise<Survey> { return this.survey; }
  async update(_survey: Survey): Promise<Survey> { return this.survey; }
  async delete(_id: number): Promise<boolean> { return true; }
  async get(_filters: _Filters, _pagination: _Pagination): Promise<Survey[]> { return [this.survey]; }
}
