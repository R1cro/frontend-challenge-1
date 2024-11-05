export function autoBindClassMethods<T>(instance: T) {
  const prototype = Object.getPrototypeOf(instance);

  Object.getOwnPropertyNames(prototype).forEach((propertyName) => {
    const property = prototype[propertyName];

    if (typeof property === 'function' && propertyName !== 'constructor') {
      (instance as Record<string, unknown>)[propertyName] = property.bind(instance);
    }
  });
}
