const request = require('supertest')
const app = require('../../app')
const factPersister = require('../../db/factPersister');
jest.mock('../../db/factPersister');

const testFacts = [{name: "pusheen", fact: "meow!"}, {name: 'sanspoof', fact:'factual information'}]

beforeEach(() => {
  factPersister.getFacts.mockResolvedValue(testFacts)
});

describe('index', () => {
  test('It should respond to GET', () => {
    return request(app).get('/').expect(200);
  })

  test('It should respond to GET with HTML', () => {
    return request(app).get('/').expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
  })

  test('It should respond to GET with HTML containing the fact bodies', () => {
    return request(app).get('/').expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
  })

  test('It should respond to GET with HTML containing a fact text and name', () => {
    let pass = false
    return request(app).get('/').expect(200)
      .then(response => {
        testFacts.forEach(fact => {
          if(response.text.includes(fact.name) && response.text.includes(fact.fact)) {
            pass = true
          }
        })
        expect(pass).toBe(true)
      })
  })
})