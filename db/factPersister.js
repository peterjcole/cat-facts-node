const db = require('./dbConnection');
const factsCollection = db.collection('facts')

/* GET users listing. */
const factPersister = {}

factPersister.getFacts = async () => {
  let facts = []
  await factsCollection.get().then(snapshot => {
    snapshot.docs.forEach(fact => {
      facts.push(fact.data())
    })
  })
  return facts
}

factPersister.postFact = async fact => {
  await factsCollection.add(fact)
  return fact
}

module.exports = factPersister