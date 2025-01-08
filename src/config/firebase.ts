import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const FIREBASE_VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestForToken = () => {
  // Check for notification permission
  if (Notification.permission === "granted") {
    // If already granted, request the token
    return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          return currentToken;
        } else {
          alert(
            "No registration token available. Request permission to generate one."
          );
          return null;
        }
      })
      .catch((err) => {
        alert("An error occurred while retrieving token - " + err);
        return null;
      });
  } else if (Notification.permission === "default") {
    // If permission has not been asked, request it
    return Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              return currentToken;
            } else {
              alert(
                "No registration token available. Request permission to generate one."
              );
              return null;
            }
          })
          .catch((err) => {
            alert("An error occurred while retrieving token - " + err);
            return null;
          });
      } else {
        alert("Notification permission denied.");
        return null;
      }
    });
  } else {
    // If permission is denied, alert the user
    alert(
      "You have denied notifications. Enable them in your browser settings."
    );
    return Promise.resolve(null);
  }
};

export const setupOnMessageHandler = (dispatchNotification: any[]) => {
  onMessage(messaging, ({ notification }) => {
    new Notification(notification?.title ?? "Unknown", {
      body: notification?.body,
      icon: notification?.icon,
    });

    if (dispatchNotification && dispatchNotification.length > 0) {
      dispatchNotification.forEach(async (dispatch) => {
        await dispatch();
      });
    }
  });
};

// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// export const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// };

// export const FIREBASE_VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

// const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       registration.active.postMessage({
//         type: "SET_CONFIG",
//         config: firebaseConfig, // Pass the config to the service worker
//       });
//     })
//     .catch((err) => {
//       console.error("Service Worker registration failed:", err);
//     });
// }

// export const requestForToken = () => {
//   // Check for notification permission
//   if (Notification.permission === "granted") {
//     return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
//       .then((currentToken) => {
//         if (currentToken) {
//           return currentToken;
//         } else {
//           alert("No registration token available.");
//           return null;
//         }
//       })
//       .catch((err) => {
//         alert("An error occurred while retrieving token - " + err);
//         return null;
//       });
//   } else if (Notification.permission === "default") {
//     return Notification.requestPermission().then((permission) => {
//       if (permission === "granted") {
//         return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
//           .then((currentToken) => {
//             if (currentToken) {
//               return currentToken;
//             } else {
//               alert("No registration token available.");
//               return null;
//             }
//           })
//           .catch((err) => {
//             alert("An error occurred while retrieving token - " + err);
//             return null;
//           });
//       } else {
//         alert("Notification permission denied.");
//         return null;
//       }
//     });
//   } else {
//     alert("You have denied notifications.");
//     return Promise.resolve(null);
//   }
// };

// export const setupOnMessageHandler = (dispatchNotification: any[]) => {
//   onMessage(messaging, ({ notification }) => {
//     new Notification(notification?.title ?? "Unknown", {
//       body: notification?.body,
//       icon: notification?.icon,
//     });

//     if (dispatchNotification && dispatchNotification.length > 0) {
//       dispatchNotification.forEach(async (dispatch) => {
//         await dispatch();
//       });
//     }
//   });
// };
