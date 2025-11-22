import { mapToMergeResourceStatus } from './map-to-merge-resource-status.function';
import { ResourceStatus } from '@angular/core';
import { NonEmptyArray } from '../../common/non-empty-array.type';

interface UseCase {
  input: NonEmptyArray<ResourceStatus>;
  expected: ResourceStatus;
}

describe('mapToMergeResourceStatus', () => {
  const multipleSameStatusesUseCases: UseCase[] = [
    {input: ['reloading', 'reloading'], expected: 'reloading'},
    {input: ['loading', 'loading'], expected: 'loading'},
    {input: ['error', 'error'], expected: 'error'},
    {input: ['idle', 'idle'], expected: 'idle'},
    {input: ['local', 'local'], expected: 'local'},
    {input: ['resolved', 'resolved'], expected: 'resolved'},
  ];

  multipleSameStatusesUseCases.forEach((useCase) => {
    it(`should return same status like given statuses : ${useCase.input}`, () => {
      const result = mapToMergeResourceStatus(useCase.input);
      expect(result).toEqual(useCase.expected);
    });
  });

  const highestPriorityStatusUseCases: UseCase[] = [
    {input: ['reloading', 'loading', 'error', 'idle', 'local', 'resolved'], expected: 'reloading'},
    {input: ['loading', 'error', 'idle', 'local', 'resolved'], expected: 'loading'},
    {input: ['error', 'idle', 'local', 'resolved'], expected: 'error'},
    {input: ['idle', 'local', 'resolved'], expected: 'idle'},
    {input: ['local', 'resolved'], expected: 'local'},
    {input: ['resolved'], expected: 'resolved'},
  ];

  highestPriorityStatusUseCases.forEach((useCase) => {
    it(`should return highest priority status: ${useCase.expected}`, () => {
      const result = mapToMergeResourceStatus(useCase.input);
      expect(result).toEqual(useCase.expected);
    });
  });
});
