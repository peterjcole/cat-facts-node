const testFact = {name: "pusheen", fact: "meow!"}

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
  empty: function() {
    return false
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
  docs: [testFact]
}

const mockDocs = {

}

module.exports = db