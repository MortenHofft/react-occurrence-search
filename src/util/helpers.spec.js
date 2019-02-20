import expect from 'expect';
import { asArray } from './helpers';

describe('asArray helper', () => {
  it('transform to array', () => {
    expect(asArray([1,2,3])).toEqual([1,2,3]);
    expect(asArray([1,'2',3])).toEqual([1,'2',3]);
    expect(asArray(1)).toEqual([1]);
    expect(asArray(['2'])).toEqual(['2']);
    expect(asArray(undefined)).toEqual([]);
    expect(asArray(null)).toEqual([null]);
  });
});
