import { remappedMultipleResources } from './remapped-multiple-resources.function';
import { createResourceMock, TestResourceMock } from './internal/fixtures';
import { Optional } from '../common/optional.type';

describe('remappedMultipleResources', () => {
  let mockResource1: TestResourceMock<number>;
  let mockResource2: TestResourceMock<string>;
  let mapper: (values: Optional<[number, string]>) => Optional<string>;

  beforeEach(() => {
    mockResource1 = createResourceMock(42,'idle');
    mockResource2 = createResourceMock('Hello','idle');
    mapper = (values: [number, string] | undefined) => {

      if(!values){
        return undefined;
      }

      return `${values[0]} - ${values[1]}`
    };
  });

  it('value: should map the values using the provided mapper function', () => {
    const result = remappedMultipleResources([mockResource1, mockResource2], mapper);

    expect(result.status()).toBe('idle');
    expect(result.value()).toBe('42 - Hello');
    expect(result.hasValue()).toBe(true);
    expect(result.error()).toBe(undefined);
    expect(result.isLoading()).toBe(false);
  });

  it('error: should propagate the error from the merged resource', () => {
    mockResource1.status.set('error');
    mockResource1.error.set(new Error('Test error'));
    const result = remappedMultipleResources([mockResource1, mockResource2], mapper);

    expect(result.status()).toBe('error');
    expect(result.value()).toBe(undefined);
    expect(result.hasValue()).toBe(false);
    expect(result.error()?.message).toBe('Test error');
    expect(result.isLoading()).toBe(false);
  });

  it('isLoading: should propagate the isLoading state from the merged resource', () => {
    mockResource2.status.set('loading');
    const result = remappedMultipleResources([mockResource1, mockResource2], mapper);

    expect(result.status()).toBe('loading');
    expect(result.value()).toBe(undefined);
    expect(result.hasValue()).toBe(false);
    expect(result.error()).toBe(undefined);
    expect(result.isLoading()).toBe(true);
  });

  it('isLoading: should propagate the isLoading state from the merged resource', () => {
    mockResource2.status.set('reloading');
    const result = remappedMultipleResources([mockResource1, mockResource2], mapper);

    expect(result.status()).toBe('reloading');
    expect(result.value()).toBe(undefined);
    expect(result.hasValue()).toBe(false);
    expect(result.error()).toBe(undefined);
    expect(result.isLoading()).toBe(true);
  });

  it('isLoading: should propagate the isLoading state from the merged resource', () => {
    mockResource1.status.set('resolved');
    mockResource2.status.set('reloading');

    const result = remappedMultipleResources([mockResource1, mockResource2], mapper);

    mockResource2.status.set('resolved');
    mockResource2.value.set('Hello2');

    expect(result.status()).toBe('resolved');
    expect(result.value()).toEqual('42 - Hello2');
    expect(result.hasValue()).toBe(true);
    expect(result.error()).toBe(undefined);
    expect(result.isLoading()).toBe(false);
  });
});
