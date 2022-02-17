import * as firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCHOIUHWmvTeewVBbzIaefnKbbdpgvPR5o",
    authDomain: "munkybox-chef.firebaseapp.com",
    databaseURL: "https://munkybox-chef-default-rtdb.firebaseio.com/",
    projectId: "munkybox-chef",
    appId: "1:1064595304748:android:4e7cd1fdb38eb1334d3c89"
};
firebase.initializeApp(firebaseConfig);
export default firebase;