import { ErrorPipePipe } from './error-pipe.pipe';

describe('ErrorPipePipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorPipePipe();
    expect(pipe).toBeTruthy();
  });
});
