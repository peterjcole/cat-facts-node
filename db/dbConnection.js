const admin = require('firebase-admin');
let serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cat-facts-c9430.firebaseio.com"
});
let db = admin.firestore();
module.exports = db;