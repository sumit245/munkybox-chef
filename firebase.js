import * as firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyC5SvnIRgc4PMkp8-x7ITAAXwwwLu0bCpc',
  authDomain: 'feasti-chef.firebaseapp.com',
  projectId: 'feasti-chef',
  appId: '1:482930462579:ios:3fd21be31def6817ceff06',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
