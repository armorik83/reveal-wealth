export abstract class AbstractRepository<T> {

  constructor() {
    //
  }

  abstract pull(id: T): Promise<any>;

  abstract pullAll(): Promise<any[]>;

}
