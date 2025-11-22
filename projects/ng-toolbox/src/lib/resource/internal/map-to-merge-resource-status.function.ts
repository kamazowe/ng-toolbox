import { ResourceStatus } from '@angular/core';
import { NonEmptyArray } from '../../common/non-empty-array.type';

export const mapToMergeResourceStatus = (resourceStatuses: NonEmptyArray<ResourceStatus>): ResourceStatus => {
  const priorityStatuses: ResourceStatus[] = ['reloading', 'loading', 'error', 'idle', 'local', 'resolved']
  return priorityStatuses.find(statusToCheck => resourceStatuses.includes(statusToCheck)) as ResourceStatus
}
