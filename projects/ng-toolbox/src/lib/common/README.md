# Angular Common Helpers

This module contains helper mechanisms that make working with TypeScript projects easier. Below are descriptions of the available types:

### NonEmptyArray
The `NonEmptyArray<T>` type represents an array that contains at least one element. This is useful when you want to ensure that an array is not empty.

Example usage:
```typescript
const nonEmpty: NonEmptyArray<number> = [1, 2, 3];
```


### Optional
The `Optional<T>` type represents a value that can be defined (`T`) or undefined (`undefined`). This is useful when you want to clearly indicate that a value is optional.
  
Przykład użycia:
```typescript
function getValue(): Optional<string> {
  return Math.random() > 0.5 ? 'value' : undefined;
}
```
