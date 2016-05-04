import {Dispatcher} from './dispatcher';
import {Store, State} from './store';

export class View<D extends Dispatcher<STT>, STR extends Store<STT>, STT extends State> {

  protected waltsDisposers: Function[] = [];

  constructor(protected Dispatcher: D,
              protected Store: STR) {
    // noop
  }

  ngOnInit(): any {
    const disposer = this.Store.onComplete(this.waltsStoreHasChanged.bind(this));
    this.waltsDisposers.push(disposer);
  }

  ngOnDestroy(): any {
    this.waltsDisposers.forEach((disposer) => disposer());
  }

  waltsStoreHasChanged(st: STT): void {
    // noop
  }

}
