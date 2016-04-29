import {Injectable} from 'angular2/core';

import {AbstractRepository} from '../abstract/abstract-repository.service';
import {AppDatabase} from '../../../app-database.ts';
import {AppDatabaseProvider} from '../../../app-database-provider.service';

@Injectable()
export class CategoryRepository extends AbstractRepository<number> {

  private db: AppDatabase;

  constructor(AppDatabaseProvider: AppDatabaseProvider) {
    super();
    const AppDatabase = AppDatabaseProvider.getConstructor();
    this.db           = new AppDatabase();
  }

  async pull(id: number): Promise<any> {
    return Promise.resolve(null);
  }

  async pullAll(): Promise<any[]> {
    return Promise.resolve([]);
  }
  
  async update(categoryId: number, newValue: string): Promise<any> {
    const target = (await this.db.getCategory(categoryId))[0];
    return await this.db.categories.put({
      id  : target.id,
      name: newValue
    });
  }

}
