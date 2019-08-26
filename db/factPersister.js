
const admin = require('./dbConnection');
const Fact = require('../model/Fact')

const factsCollection = admin.firestore().collection('facts')

/* GET users listing. */
const factPersister = {}

factPersister.getFacts = async () => {
  let facts = []
  await factsCollection.where('approved', '==', true).get().then(snapshot => {
    snapshot.docs.forEach(fact => {
      const currentFact = buildFact(fact.data(), fact.id)
      if (currentFact != null) facts.push(currentFact)
    })
  })
  return facts
}

factPersister.postFact = async query => {
  const fact = {
    name: query.name,
    fact: query.fact,
    approved: false
  }
  addedRef = await factsCollection.add(fact)
  addedFact = await addedRef.get()

  return buildFact(addedFact.data(), addedFact.id)
}

factPersister.getToday = async () => {
  const lastMidnight = new Date()
  lastMidnight.setHours(0, 0, 0, 0)
  const lastMidnightTimestamp = admin.firestore.Timestamp.fromDate(lastMidnight)
  const nextMidnight = new Date()
  nextMidnight.setHours(24,0,0,0)
  const nextMidnightTimestamp = admin.firestore.Timestamp.fromDate(nextMidnight)

  const snapshot = await factsCollection.where('approved', '==', true).where('date', '>=', lastMidnightTimestamp).where('date', '<=', nextMidnightTimestamp).get()
  if (!snapshot.empty) {
    const doc = snapshot.docs[0]
    const fact = buildFact(doc.data(), doc.id)
    if (fact != null) return {fact}
  } 
  return {}
}

factPersister.getRandomFact = async () => {
  const querySnapshot = await factsCollection.where('approved', '==', true).where('__name__', '>=', generateAutoId()).orderBy('__name__').limit(1).get()
  console.log(querySnapshot)
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    console.log(doc)
    const fact = buildFact(doc.data(), doc.id)
    if (fact != null) return fact
  }
  const secondSnapshot = await factsCollection.where('approved', '==', true).where('__name__', '>=', " ").orderBy('__name__').limit(1).get()
  if (!secondSnapshot.empty) {
    const doc = secondSnapshot.docs[0]
    const secondFact = buildFact(doc.data(), doc.id)
    if (secondFact != null) return secondFact
  }
  return {}
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

const buildFact = (data, id) => {
  let date = null
  if (typeof data.date != 'undefined' && typeof data.date.toDate == 'function') {
    date = data.date.toDate()
  }
  return new Fact(data.name, data.fact, date, id)
}


module.exports = factPersister