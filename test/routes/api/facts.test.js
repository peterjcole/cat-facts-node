const request = require('supertest')
const app = require('../../../app')
const factPersister = require('../../../db/factPersister');
jest.mock('../../../db/factPersister');


describe('facts', () => {
  describe('/', () => {
    test('It should respond to GET', () => {
      factPersister.getFacts.mockResolvedValue({name: "pusheen", fact: "meow!"})
      return request(app).get('/api/facts').expect(200)
    })
  
    test('It should respond to GET with expected value', () => {
      const testFacts = [{name: "pusheen", fact: "meow!"}, {name: 'sanspoof', fact:'factual information'}];
      factPersister.getFacts.mockResolvedValue(testFacts)
      return request(app).get('/api/facts').expect(200).then(response => {
        expect(response.body).toEqual(testFacts)
      });
    })
  
    test('It should respond to POST', () => {
      const testFact = {name: 'Peter', fact: 'This is a test', approved: false}
      factPersister.postFact.mockResolvedValue(testFact)
      return request(app).post('/api/facts').query(testFact).expect(200)
    })
  
    test('POSTed fact should be returned', () => {
      factPersister.postFact.mockResolvedValue({name: 'Peter', fact: 'This is a test', approved: false})
      testFact = {name: 'Peter', fact: 'This is a test', approved: false}
      return request(app).post('/api/facts').query(testFact).expect(200).then(response => {
        expect(response.body).toEqual(testFact)
      });
    })
  })
  
})

