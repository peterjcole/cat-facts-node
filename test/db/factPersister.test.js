const factPersister = require('../../db/factPersister')
const Fact = require('../../model/Fact')
const testFact = new Fact("pusheen", "meow!", null, 123)
jest.mock('../../db/dbConnection')

describe('factPersister', () => {
  test.skip('Should get facts', () => {})
  test.skip('Should post a fact', () => {})
  test.skip('Unapproved facts are not returned', () => {})
  test('Should get a random fact', async () => {
    fact = await factPersister.getRandomFact()
    expect(fact).toEqual(testFact)
  })
})
