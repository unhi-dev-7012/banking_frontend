importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

fetch("/firebase-config.json")
  .then((response) => {
    // console.log(response.json());
    return response.json();
  })
  .then((jsContent) => {
    firebase.initializeApp(jsContent.firebaseConfig);
    firebase.messaging();
  })
  .catch((error) => {
    console.error("Error initializing Firebase in service worker:", error);
  });
