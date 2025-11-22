import { mergeResource } from './merge-resource.function';
import { createResourceMock, TestResourceMock } from './internal/fixtures';

describe('mergeResource', () => {
  let resource1: TestResourceMock<number | undefined>;
  let resource2: TestResourceMock<string | undefined>;

  beforeEach(() => {
    resource1 = createResourceMock(42);
    resource2 = createResourceMock('test');
  });

  it('value: should merge the values of two resources', () => {
    const result = mergeResource(resource1, resource2);

    expect(result.value()).toEqual([42, 'test']);
  });

  it('value: should contain arrays with undefined values as such came from the source resources', () => {
    resource1.status.set('resolved');
    resource2.status.set('local');
    resource1.value.set(undefined);
    resource2.value.set(undefined);
    const result = mergeResource(resource1, resource2);
    expect(result.value()).toEqual([undefined, undefined]);
  });

  it('value: should return undefined when the status of at least one resource is loading', () => {
    resource1.status.set('loading');
    resource2.value.set('local');
    resource1.value.set(undefined);
    resource2.value.set('1');
    const result = mergeResource(resource1, resource2);
    expect(result.value()).toBe(undefined);
  });

  it('status: should merge the statuses of two resources', () => {
    resource1.status.set('loading');
    const result = mergeResource(resource1, resource2);

    expect(result.status()).toBe('loading');
  });

  it('status: should merge the statuses of two resources', () => {
    resource1.status.set('loading');
    resource2.status.set('reloading');
    const result = mergeResource(resource1, resource2);

    expect(result.status()).toBe('reloading');
  });

  it('error: should propagate the first error encountered', () => {
    const error = new Error('Test error');
    resource2.error.set(error);
    resource2.status.set('error');
    const result = mergeResource(resource1, resource2);

    expect(result.error()).toBe(error);
  });

  it('isLoading: should be true if any resource is loading', () => {
    resource1.status.set('loading');
    const result = mergeResource(resource1, resource2);

    expect(result.isLoading()).toBe(true);
  });

  it('isLoading: should be true if any resource is reloading', () => {
    resource1.status.set('reloading');
    const result = mergeResource(resource1, resource2);

    expect(result.isLoading()).toBe(true);
  });

  it('isLoading: should be false if every resource is not loading', () => {
    resource1.status.set('idle');
    resource2.status.set('resolved');
    const result = mergeResource(resource1, resource2);

    expect(result.isLoading()).toBe(false);
  });

  it('hasValue: should return true if all resources have values', () => {
    const result = mergeResource(resource1, resource2);

    expect(result.hasValue()).toBe(true);
  });

  it('hasValue: should return true if some resource has value', () => {
    resource1.value.set(undefined);
    resource2.value.set('1');
    const result = mergeResource(resource1, resource2);

    expect(result.hasValue()).toBe(true);
  });

  it('hasValue: should return true if every resources have a value', () => {
    resource1.value.set(undefined);
    resource2.value.set(undefined);
    const result = mergeResource(resource1, resource2);

    expect(result.hasValue()).toBe(true);
  });
});
