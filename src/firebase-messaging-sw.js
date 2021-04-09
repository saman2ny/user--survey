importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
  firebase.initializeApp({
    apiKey: "AIzaSyAvj8kKYWC2qR0g8ErQu4CIo_RhUVaQz_0",
    authDomain: "samplefcm-472f0.firebaseapp.com",
    databaseURL: "https://samplefcm-472f0.firebaseio.com",
    projectId: "samplefcm-472f0",
    storageBucket: "samplefcm-472f0.appspot.com",
    messagingSenderId: "230085933019",
    appId: "1:230085933019:web:fb766738b698b1b06a99fe",
    measurementId: "G-S9K5PZ0J2E"
});
  const messaging = firebase.messaging();