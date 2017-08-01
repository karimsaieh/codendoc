import { LargeNumbersPipe } from './large-numbers.pipe';

describe('LargeNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new LargeNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
