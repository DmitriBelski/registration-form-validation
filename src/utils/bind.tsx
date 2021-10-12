/* Use as decorator @Bind */

export function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
  const original = descriptor.value
  return {
    enumerable: false,
    configurable: true,
    get() {
      return original.bind(this)
    }
  }
}
