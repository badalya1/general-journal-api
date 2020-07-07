import app from '../../src/app';

describe('\'budgets\' service', () => {
  it('registered the service', () => {
    const service = app.service('budgets');
    expect(service).toBeTruthy();
  });
});
