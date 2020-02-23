import { CountDonePipe } from './count-done.pipe';

describe('CountDonePipe', () => {
  it('create an instance', () => {
    const pipe = new CountDonePipe();
    expect(pipe).toBeTruthy();
  });
});
