import firebase from 'firebase/app';
import 'firebase/auth';


var config = {
  apiKey: "AIzaSyAdP4m9HxQtdsq5noqoERuIlVLKBRRbgiM",
  authDomain: "server-picker.firebaseapp.com",
  databaseURL: "https://server-picker.firebaseio.com",
  projectId: "server-picker",
  storageBucket: "server-picker.appspot.com",
  messagingSenderId: "1086779948482"
};

firebase.initializeApp(config);

export default firebase;
