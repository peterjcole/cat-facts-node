const request = require('supertest')
const app = require('../../app')

describe('facts', () => {
  test('It should respond to GET', () => {
    return request(app).get('/api/facts').expect(200);
  })

  test('It should respond to POST', () => {
    testFact = {name: 'Peter', fact: 'This is a test', approved: false}
    return request(app).post('/api/facts').query(testFact).expect(200).then(() => {
    });
  })
})

