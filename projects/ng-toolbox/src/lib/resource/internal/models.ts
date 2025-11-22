import { Resource, ResourceStatus } from '@angular/core';
import { NonEmptyArray } from '../../common/non-empty-array.type';

export type ResourceFactory<T, V> = (source: Resource<T>) => Resource<V>;

export type MergeResourceStatusMapperType = (resourceStatuses: NonEmptyArray<ResourceStatus>) => ResourceStatus
