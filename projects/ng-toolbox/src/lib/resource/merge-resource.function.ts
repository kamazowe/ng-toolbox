import { computed, Resource, ResourceStatus, Signal } from '@angular/core';
import { NonEmptyArray } from '../common/non-empty-array.type';
import { mapToMergeResourceStatus } from './internal/map-to-merge-resource-status.function';
import { Optional } from '../common/optional.type';
import { MergeResourceStatusMapperType } from './internal/models';

export function mergeResource<T, R>(r1: Resource<T>, r2: Resource<R>): Resource<Optional<[T, R]>>;
export function mergeResource<T, R, Z>(r1: Resource<T>, r2: Resource<R>, r3: Resource<Z>): Resource<Optional<[T, R, Z]>>;
export function mergeResource<T, R, Z, X>(r1: Resource<T>, r2: Resource<R>, r3: Resource<Z>, r4: Resource<X>): Resource<Optional<[T, R, Z, X]>>;
export function mergeResource(...resources: Resource<unknown>[]): Resource<unknown> {
  return new MergeResourceImpl(resources, mapToMergeResourceStatus)
}

class MergeResourceImpl<T> implements Resource<Optional<T[]>> {
  public readonly status: Signal<ResourceStatus> = computed(() => this.mergeResourceStatusMapper(this.getAllResourceStatuses(this.resources) as NonEmptyArray<ResourceStatus>))
  public readonly value: Signal<Optional<T[]>> = computed(() => this.mapToValue(this.status(), this.resources))
  public readonly error: Signal<Error | undefined> = computed(() => this.mapToError(this.status(), this.resources))
  public readonly isLoading: Signal<boolean> = computed(() => this.mapToIsLoading(this.status()))

  constructor(private readonly resources: Resource<T>[], private readonly mergeResourceStatusMapper: MergeResourceStatusMapperType) {
  }

  public hasValue(): this is Resource<Exclude<T[], undefined>> {
    return this.value() !== undefined;
  }

  private mapToValue(mergedStatus: ResourceStatus, resources: Resource<T>[]): Optional<T[]> {
    const statusForUndefinedValue = ['error', 'loading', 'reloading'].includes(mergedStatus)

    if (statusForUndefinedValue) {
      return undefined
    }

    return resources.map(resource => resource.value())
  }

  private mapToError(mergedStatus: ResourceStatus, resources: Resource<T>[]): Error | undefined {
    const isError = mergedStatus === 'error';
    if (!isError) {
      return undefined;
    }
    const errors = resources
      .map(resource => resource.error())
      .filter((error): error is Error => error instanceof Error);

    if (errors.length === 0) {
      return undefined;
    }

    if (errors.length === 1) {
      return errors[0];
    }

    const aggregateError = new Error(`Multiple errors`, {cause: errors});

    return aggregateError;
  }

  private mapToIsLoading(mergedStatus: ResourceStatus): boolean {
    return mergedStatus === 'loading' || mergedStatus === 'reloading'
  }

  private getAllResourceStatuses(resources: Resource<unknown>[]): ResourceStatus[] {
    return resources.map(resource => resource.status())
  }
}
