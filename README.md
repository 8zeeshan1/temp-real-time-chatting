# 🗨️ tChat24 – Real-Time Temporary Chat App

**tChat24** is a real-time, anonymous chat application built to deeply understand **WebSockets**, **event-driven communication**, and **React state management**.  
The project intentionally keeps the backend minimal and handles most logic on the client side to mirror real-world real-time application behavior.

🔗 **Live Demo:** https://tchat24.netlify.app/

---

## ✨ Features

- Real-time one-to-one messaging using **Socket.IO**
- Anonymous & temporary users (no authentication)
- Live active users list with instant connect/disconnect updates
- Client-side message persistence using `localStorage`
- Dynamic routing for conversations
- Responsive layout with independent scrolling sections

---

## 🛠️ Tech Stack

**Frontend**
- React (Functional Components)
- React Router
- Tailwind CSS
- Socket.IO Client

**Backend**
- Node.js
- Express
- Socket.IO

**Storage**
- In-memory data structures (server)
- LocalStorage (client)

---

## 🧠 Learning Focus

This project was built as a learning-first system to understand:

- WebSocket connection lifecycle and event handling
- Safe event listener management (`on` / `off`)
- Client-driven architecture with minimal backend usage
- Real-time UI updates without page refresh
- React hooks behavior in real-time applications

---

## ⚠️ Notes

- No authentication or database (by design)
- Messages reset on refresh
- Intended for learning, not production scale

---

## 👤 Author

**Mohd Zeeshan Quraishi**  
B.Tech CSE | Full-Stack & Real-Time Systems Learner
