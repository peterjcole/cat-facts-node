const request = require('supertest')
const app = require('../app')

describe('facts', () => {
  test('It should respond to GET', () => {
    return request(app).get('/api/facts').expect(200);
  })

  test('It should contain Sanspoof', () => {
    return request(app).get('/api/facts').then(response => {
      console.log(response)
    })
  })
})

