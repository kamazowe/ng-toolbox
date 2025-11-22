import { remappedResource } from './remapped-resource.function';
import { createResourceMock, TestResourceMock } from './internal/fixtures';

describe('remappedResource', () => {
  let mockResource: TestResourceMock<number>;

  beforeEach(() => {
    mockResource = createResourceMock(42);
  });

  it('value: should map the value using the provided mapper function', () => {
    const mapper = (value: number) => value.toString();
    const result = remappedResource(mockResource, mapper);

    expect(result.value()).toBe('42');
  });

  it('status: should propagate the status from the original resource', () => {
    const mapper = (value: number) => value.toString();
    const result = remappedResource(mockResource, mapper);

    expect(result.status()).toBe('resolved');
  });

  it('error: should propagate the error from the original resource', () => {
    const mapper = (value: number) => value.toString();
    mockResource.error.set(new Error('Test error'));
    const result = remappedResource(mockResource, mapper);

    expect(result.error()?.message).toBe('Test error');
  });

  it('isLoading: should propagate the isLoading state from the original resource', () => {
    const mapper = (value: number) => value.toString();
    mockResource.isLoading.set(true);
    const result = remappedResource(mockResource, mapper);

    expect(result.isLoading()).toBe(true);
  });

  it('hasValue: should propagate the hasValue from the original resource', () => {
    const mapper = (value: number) => value.toString();
    const result = remappedResource(mockResource, mapper);

    expect(result.hasValue()).toBe(true);
  });

  it('hasValue: should use the remapped value', () => {
    const mapper = () => undefined;
    const result = remappedResource(mockResource, mapper);

    expect(result.hasValue()).toBe(false);
  });
});
