const request = require('supertest')
const app = require('../app')

describe('index', () => {
  test('It should respond to GET', () => {
    return request(app).get('/').expect(200);
  })
})