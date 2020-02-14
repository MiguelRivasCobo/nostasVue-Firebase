import firebase from 'firebase/app'
import 'firebase/firestore'
var firebaseConfig = {
  apiKey: "AIzaSyDvSd43j4fmz9P6syZ137tPTo0mHWUZ6mA",
  authDomain: "ejemplo-vue-firestore.firebaseapp.com",
  databaseURL: "https://ejemplo-vue-firestore.firebaseio.com",
  projectId: "ejemplo-vue-firestore",
  storageBucket: "ejemplo-vue-firestore.appspot.com",
  messagingSenderId: "725122135013",
  appId: "1:725122135013:web:79867c412a8e54cc43b50c"
};
// Get a Firestore instance
export const db = firebase
  .initializeApp( firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
//db.settings({ timestampsInSnapshots: true })

