import {State} from './store';

export type Reducer<ST extends State> = (state: ST) => ST;

export class Action<ST extends State> {

  constructor(public reducer: Reducer<ST>) {
    //
  }

}
