import { Resource } from '@angular/core';
import { composeResource } from './compose-resource.function';
import { mergeResource } from './merge-resource.function';
import { withRemappedResource } from './remapped-resource.function';


export function remappedMultipleResources<T, K, R>(resources: [Resource<T>, Resource<K>], mapper: (values: [T, K] | undefined) => R): Resource<R> {
  return composeResource(
    mergeResource(...resources),
    withRemappedResource(mapper)
  )
}
