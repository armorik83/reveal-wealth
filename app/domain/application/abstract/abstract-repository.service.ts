export class AbstractRepository {

  constructor() {
    //
  }

  async pull(): Promise<any> {
    return Promise.resolve(null);
  }

}
