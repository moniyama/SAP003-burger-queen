import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAb8hKqkUq6PlJu82Uh2oCCWwJh1a3s8UM",
    authDomain: "burger-queen-d39df.firebaseapp.com",
    databaseURL: "https://burger-queen-d39df.firebaseio.com",
    projectId: "burger-queen-d39df",
    storageBucket: "burger-queen-d39df.appspot.com",
    messagingSenderId: "629727315796",
    appId: "1:629727315796:web:b5780ec2e8e2810d06aac1",
    measurementId: "G-HXYQR33SVT"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();