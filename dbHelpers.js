const db = require('./dbConnection');
/* GET users listing. */
const dbHelpers = {}

dbHelpers.getFacts = async () => {
  let factsCollection = db.collection('facts')
  let facts = []
  await factsCollection.get().then(snapshot => {
    snapshot.docs.forEach(fact => {
      console.log(fact.data())
      facts.push(fact.data())
    })
  })
  return facts
}

module.exports = dbHelpers