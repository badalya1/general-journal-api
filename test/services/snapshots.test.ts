import app from '../../src/app';

describe('\'snapshots\' service', () => {
  it('registered the service', () => {
    const service = app.service('snapshots');
    expect(service).toBeTruthy();
  });
});
