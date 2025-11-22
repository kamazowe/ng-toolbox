import { Resource } from '@angular/core';
import { ResourceFactory } from './internal/models';

export function composeResource<T, R>(source: Resource<T>, f1: ResourceFactory<T, R>): Resource<R>;
export function composeResource<T, G, R>(
  source: Resource<T>,
  f1: ResourceFactory<T, G>,
  f2: ResourceFactory<G, R>
): Resource<R>;
export function composeResource<T, G, Z, R>(
  source: Resource<T>,
  f1: ResourceFactory<T, G>,
  f2: ResourceFactory<G, Z>,
  f3: ResourceFactory<Z, R>
): Resource<R>;
export function composeResource(source: Resource<unknown>, ...factories: ResourceFactory<unknown, unknown>[]): Resource<unknown> {
  return factories.reduce((acc: Resource<unknown>, curr: (arg0: Resource<unknown>) => Resource<unknown>) => curr(acc), source)
}
