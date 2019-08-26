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

factPersister.getRandomFact = async () => {
  const querySnapshot = await factsCollection.where('__name__', '>=', generateAutoId()).orderBy('__name__').limit(1).get()
  if (!querySnapshot.empty()) return querySnapshot.docs[0]
  const secondSnapshot = await factsCollection.where('__name__', '>=', '').orderBy('__name__').limit(1).get().docs[1]
  return secondSnapshot.get().docs[0]
}

const generateAutoId = () => {
  const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId
}

module.exports = factPersister