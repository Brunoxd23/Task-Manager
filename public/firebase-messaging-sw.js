/* eslint-env serviceworker */
// Firebase Cloud Messaging - Service Worker
// IMPORTANTE: Substitua os valores abaixo com seu Firebase Config
// Os valores de config do Firebase são PÚBLICOS por design - a segurança é feita pelas Firebase Security Rules

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
)

// Substitua com seu Firebase config (mesmo valor de src/firebase.js)
firebase.initializeApp({
  apiKey: "AIzaSyDpenXlkGnSUPl-EVJNyG6eAKELGv0dvJI",
  authDomain: "task-manager-69c68.firebaseapp.com",
  projectId: "task-manager-69c68",
  storageBucket: "task-manager-69c68.firebasestorage.app",
  messagingSenderId: "978323620844",
  appId: "1:978323620844:web:fbd5706335728ffbd1f6c9",
})

const messaging = firebase.messaging()

// Recebe notificações quando o app está em background ou fechado
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? "Task Manager"
  const body = payload.notification?.body ?? "Você tem tarefas pendentes!"

  self.registration.showNotification(title, {
    body,
    icon: "/favicon.svg",
    badge: "/favicon.svg",
    tag: payload.data?.taskId ?? "task-reminder",
    data: payload.data,
  })
})

// Ao clicar na notificação, abre o app
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus()
        }
        return clients.openWindow("/minhas-tarefas")
      })
  )
})
