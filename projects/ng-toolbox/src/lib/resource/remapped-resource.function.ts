import { computed, Resource, ResourceStatus, Signal } from '@angular/core';
import { ResourceFactory } from './internal/models';

export function withRemappedResource<T, R>(mapper: (values: T) => R): ResourceFactory<T,R> {
  return (resource) => new RemappedResourceImpl(resource, mapper)
}

export function remappedResource<T, R>(resource: Resource<T>, mapper: (value: T) => R): Resource<R> {
  return new RemappedResourceImpl(resource, mapper)
}

class RemappedResourceImpl<T, R> implements Resource<R> {
  public readonly status: Signal<ResourceStatus> = computed(() => this.resource.status())
  public readonly value: Signal<R> = computed(() => this.mapper(this.resource.value()))
  public readonly error: Signal<Error | undefined> = computed(() => this.resource.error())
  public readonly isLoading: Signal<boolean> = computed(() => this.resource.isLoading())

  constructor(private readonly resource: Resource<T>, private readonly mapper: (value: T) => R) {
  }

  public hasValue(): this is Resource<Exclude<R, undefined>> {
    return this.resource.hasValue() && this.value() !== undefined;
  }
}
