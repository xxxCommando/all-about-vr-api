// src/test/api.test.ts

import { App } from '../app';

describe('Test app config', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('should have a production config', () => {
    process.env.NODE_ENV = 'production';
    const app = new App();
    expect(process.env.NODE_ENV === 'production');
    expect(app).toBeInstanceOf(App);
  });
});
