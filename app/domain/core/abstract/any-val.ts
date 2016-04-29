export class AnyVal {

  protected _value: number;

  constructor(v: number) {
    this._value = v;
  }

  get value(): number {
    return this._value;
  }

}
