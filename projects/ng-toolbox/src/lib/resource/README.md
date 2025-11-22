# Angular Resource API Helpers

This project contains a set of utility functions designed to work with the Angular Resource API. These utilities simplify the process of composing, merging, and transforming resources in a reactive and functional way.

## Table of Contents
- [Overview](#overview)
- [Functions](#functions)
  - [composeResource](#composeresource)
  - [remappedResource](#remappedresource)
  - [remappedMultipleResources](#remappedmultipleresources)
  - [mergeResource](#mergeresource)
- [Testing](#testing)

## Overview
The utilities in this project are designed to:
- Compose resources using a functional approach.
- Transform resource values with mapping functions.
- Merge multiple resources into a single resource.
- Ensure reactive state propagation (e.g., `status`, `error`, `isLoading`).

## Functions

### composeResource
The `composeResource` function allows you to compose a resource by applying one or more transformation factories in sequence.

#### Usage
```typescript
const transformedResource = composeResource(sourceResource, factory1, factory2);
```

#### Parameters
- `sourceResource`: The initial resource to be transformed.
- `factory1`, `factory2`, ...: Transformation factories to apply in sequence.

#### Example
```typescript
const result = composeResource(mockResource, factory1, factory2);
```

### remappedResource
The `remappedResource` function creates a new resource by applying a mapping function to the value of an existing resource.

#### Usage
```typescript
const newResource = remappedResource(originalResource, valueMapper);
```

#### Parameters
- `originalResource`: The resource to be transformed.
- `valueMapper`: A function that maps the resource value to a new value.

#### Example
```typescript
const result = remappedResource(mockResource, value => value.toString());
```

### remappedMultipleResources
The `remappedMultipleResources` function merges two resources and applies a mapping function to their combined values.

#### Usage
```typescript
const combinedResource = remappedMultipleResources([resource1, resource2], mapper);
```

#### Parameters
- `resources`: An array of two resources to be merged.
- `mapper`: A function that maps the combined values of the resources to a new value.

#### Example
```typescript
const result = remappedMultipleResources([mockResource1, mockResource2], ([val1, val2]) => `${val1} - ${val2}`);
```

### mergeResource
The `mergeResource` function combines multiple resources into a single resource, propagating their states and values.

#### Usage
```typescript
const mergedResource = mergeResource(resource1, resource2);
```

#### Parameters
- `resource1`, `resource2`, ...: Resources to be merged.

#### Example
```typescript
const result = mergeResource(mockResource1, mockResource2);
```
