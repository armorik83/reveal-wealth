import {Dispatcher} from './dispatcher';
import {Store, State} from './store';

export class AbstractComponent {

  ngOnInit(): any {
    // noop
  }

  ngDoCheck(): any {
    // noop
  }

  ngOnDestroy(): any {
    // noop
  }

  ngAfterContentInit(): any {
    // noop
  }

  ngAfterContentChecked(): any {
    // noop
  }

  ngAfterViewInit(): any {
    // noop
  }

  ngAfterViewChecked(): any {
    // noop
  }

}

export class View<
  D extends Dispatcher<STT>,
  STR extends Store<STT>,
  STT extends State
> extends AbstractComponent {

  protected disposers: Function[] = [];

  constructor(protected Dispatcher: D,
              protected Store: STR) {
    super();
  }

  ngOnInit(): any {
    super.ngOnInit();

    const disposer = this.Store.onComplete(this.wtStoreHasChanged.bind(this));
    this.disposers.push(disposer);
  }

  ngOnDestroy(): any {
    this.disposers.forEach((disposer) => disposer());
  }

  wtStoreHasChanged(st: STT): void {
    // noop
  }

}
