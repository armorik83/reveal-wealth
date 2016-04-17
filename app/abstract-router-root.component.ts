import {AbstractComponent} from './abstract.component';

export class AbstractRooterRootComponent extends AbstractComponent {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(): void {
    super.ngOnChanges();
  }

  ngDoCheck(): void {
    super.ngDoCheck();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  ngAfterContentChecked(): void {
    super.ngAfterContentChecked();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
  }

}
