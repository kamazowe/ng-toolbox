import { ResourceStatus, signal, WritableSignal } from '@angular/core';

export interface TestResourceMock<T> {
  readonly value: WritableSignal<T>;
  readonly status: WritableSignal<ResourceStatus>;
  readonly error: WritableSignal<Error | undefined>;
  readonly isLoading: WritableSignal<boolean>;
  hasValue(): this is TestResourceMock<Exclude<T, undefined>>;
}

export function createResourceMock<T>(value: T, status: ResourceStatus = 'resolved', error?: Error, isLoading: boolean = false): TestResourceMock<T> {
  return {
    value: signal(value),
    status: signal(status),
    error: signal(error),
    isLoading: signal(isLoading),
    hasValue: function (): this is TestResourceMock<Exclude<T, undefined>> {
      return this.value() !== undefined;
    },
  };
}
