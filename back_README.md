# 🎬 Movie App — Backend (Node / Express)

Backend de l’application **Movie App**, développé avec **Node.js**, **Express** et **MongoDB**.
Il fournit une API REST sécurisée par **JWT**.

---

## 🧱 Stack technique

- Node.js
- Express
- MongoDB (via Docker)
- Mongoose
- JWT (authentification)
- bcrypt
- Nodemon

---

## ⚙️ Prérequis

- Node.js ≥ 18
- npm
- Docker + Docker Compose

---

## 🐳 MongoDB avec Docker

### Lancer MongoDB

```bash
docker run -d   --name mongo-movie-app   -p 27017:27017   mongo:6
```

> MongoDB sera accessible sur :
```
mongodb://localhost:27017
```

⚠️ Si le container existe déjà :
```bash
docker start mongo-movie-app
```

---

## 📦 Installation

Depuis le dossier `back` :

```bash
npm install
```

---

## 🔧 Configuration

Créer un fichier `.env` à la racine du back :

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/movie_app
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=1h
```

---

## ▶️ Lancer le serveur

```bash
npm run dev
```

Le serveur démarre sur :

```
http://localhost:4000
```

---

## 🔐 Authentification

- Auth via JWT
- Token envoyé dans le header :
```
Authorization: Bearer <token>
```
- Expiration automatique du token
- Invalidation côté serveur (logout)
- Routes protégées via middleware `requireAuth`

---

## 📚 API — Principales routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET  /api/me`

### Movies
- `GET /api/movies`
- `GET /api/movies/:id`
- `GET /api/movies?search=`

### Favorites (protégé)
- `GET    /api/favorites`
- `POST   /api/favorites/:movieId`
- `DELETE /api/favorites/:movieId`

### Reviews
- `GET    /api/reviews`
- `GET    /api/reviews/:id`
- `POST   /api/reviews`
- `PATCH  /api/reviews/:id`
- `DELETE /api/reviews/:id`

### Users (public)
- `GET /api/users/:username`

---

## 📁 Structure simplifiée

```
src/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── server.js
```

---

## ✅ État du projet

✔️ API REST fonctionnelle  
✔️ Sécurité JWT conforme  
✔️ MongoDB via Docker  
✔️ Conforme aux attendus du rendu Fullstack
