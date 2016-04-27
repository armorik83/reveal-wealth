import {State} from './store';

export type Reducer<ST extends State> = (state: ST) => Promise<ST>;

export class Action<ST extends State> {

  reducer: Reducer<ST>;

  protected createReducer(reducer: Reducer<ST>): void {
    this.reducer = reducer;
  }

}
