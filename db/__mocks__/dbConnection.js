const testFact = {
  data: () => {
    return {
      name: "pusheen", 
      fact: "meow!", 
      approved: true
    }
  },
  id: 123
}

const db = {
  collection: function() {
    return mockCollection
  }
}

const mockCollection = {
  where: function() {
    return mockSnapshot
  }
}

const mockSnapshot = {
  where: function() {
    return mockSnapshot
  },
  get: function()  {
    return mockSnapshot
  },
  orderBy: function() {
    return mockSnapshot
  },
  limit: function() {
    return mockSnapshot
  },
  empty: false,
  docs: [testFact]
}

const admin = {firestore: () => {return db}}

module.exports = admin