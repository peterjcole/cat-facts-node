const factPersister = require('../../db/factPersister')
const testFact = {name: "pusheen", fact: "meow!"}
jest.mock('../../db/dbConnection')

describe('factPersister', () => {
  test.skip('Should get facts', () => {})
  test.skip('Should post a fact', () => {})
  test('Should get a random fact', async () => {
    
    fact = await factPersister.getRandomFact()
    expect(fact).toEqual(testFact)
  })
})
