// src/test/services/api.service.test.ts

import request, { SuperTest, Test } from 'supertest';

import app from '../../app';

describe('Test api.service.ts', () => {
  let testApp: SuperTest<Test>;
  beforeEach(() => {
    testApp = request(app);
    return true;
  });
  test('endPointsList', async () => {
    const { status } = await testApp.get('/');
    expect(status).toEqual(200);
  });
});
