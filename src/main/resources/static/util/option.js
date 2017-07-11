function Some(value) {
  return new Option(value);
}

function None() {
  return new Option();
}

class Option {
  constructor(value) {
    this.value = value;
  }

  isNone() {
    return this.value == undefined || this.value == null;
  }

  isSome() {
    return !this.isNone();
  }

  unwrap() {
    return this.value;
  }

  unwrapOr(value) {
    if (this.isSome())
      return this.value;
    else
      return value;
  }

  map(f) {
    if (typeof f !== 'function')
      throw new TypeError('f must be a function');

    return new Option(f(this.value))
  }

  andThen(f) {
    if (typeof f !== 'function')
      throw new TypeError('f must be a function');

    let result = f(this.value);
    if (!(result instanceof Option))
      throw new TypeError('f must returns Option');

    return new Option(result.unwrap());
  }

  ifPresent(f) {
    if (typeof f !== 'function')
      throw new TypeError('f must be a function');

    if (this.isSome())
      f(this.value);
  }
}
