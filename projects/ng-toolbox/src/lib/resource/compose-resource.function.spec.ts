import { composeResource } from './compose-resource.function';
import { computed, Resource } from '@angular/core';
import { createResourceMock } from './internal/fixtures';
import { ResourceFactory } from './internal/models';

describe('composeResource', () => {
  let addOneMockFactory: ResourceFactory<number, number>;
  let doubleMockFactory: ResourceFactory<number, number>;
  let toStringMockFactory: ResourceFactory<number, string>;

  beforeEach(() => {
    addOneMockFactory = (source: Resource<number>) => {
      return {
        ...source,
        value: computed(() => source.value() + 1),
        hasValue:(): this is Resource<number> => true
      }
    }

    doubleMockFactory = (source: Resource<number>) => {
      return {
        ...source,
        value: computed(() => source.value() * 2),
        hasValue:(): this is Resource<number> => true
      }
    }

    toStringMockFactory = (source: Resource<number>) => {
      return {
        ...source,
        value: computed(() => source.value().toString()),
        hasValue:(): this is Resource<string> => true
      }
    }
  });

  it('should returns 2 when applies addOne factory', () => {
    const result = composeResource(createResourceMock(1), addOneMockFactory);

    expect(result.value()).toEqual(2);
  });

  it('should returns 4 when applies addOne then double factories', () => {
    const result = composeResource(createResourceMock(1), addOneMockFactory, doubleMockFactory);

    expect(result.value()).toEqual(4);
  });

  it('should returns 3 when applies double then addOne factories', () => {
    const result = composeResource(createResourceMock(1), doubleMockFactory,addOneMockFactory);

    expect(result.value()).toEqual(3);
  });

  it('should return string value after ops', () => {
    const result = composeResource(createResourceMock(1), addOneMockFactory, doubleMockFactory,toStringMockFactory);

    expect(result.value()).toEqual('4');
  });
});
