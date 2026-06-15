# 🎵 Spotify Style API

A Spotify-inspired REST API built with **NestJS**, **Prisma ORM**, and **SQLite**.

This project was developed as part of the **Nova Era Tech Backend Challenges**, focusing on domain modeling, relational data structures, business rules, advanced REST APIs, pagination, and search functionality.

---

## 🚀 Technologies

* NestJS
* TypeScript
* Prisma ORM
* SQLite
* Class Validator
* Class Transformer

---

## 📂 Project Structure

```bash
src/
├── albums/
├── artists/
├── playlists/
├── prisma/
├── tracks/
├── common/
└── app.module.ts
```

---

## 🎯 Features

### Artists

* Create artist
* List artists
* Get artist by ID
* Update artist
* Delete artist

### Albums

* Create album
* List albums
* Get album by ID
* Update album
* Delete album

### Tracks

* Create track
* List tracks
* Get track by ID
* Update track
* Delete track
* Search tracks by name
* Search tracks by artist
* Ranking of most added tracks
* Genre-based recommendations

### Playlists

* Create playlist
* List playlists
* Get playlist by ID
* Update playlist
* Delete playlist
* Add track to playlist
* Remove track from playlist
* Calculate total playlist duration
* Count total tracks in playlist
* Prevent duplicate tracks in playlists

---

## 🗄️ Database Model

### Artist

```txt
Artist
 ├── Albums
 └── Tracks
```

### Album

```txt
Album
 └── Tracks
```

### Playlist

```txt
Playlist
 └── PlaylistTrack
      └── Track
```

---

## ⚙️ Installation

### Clone repository

```bash
git clone https://github.com/yourusername/desafio-11-api-spotify.git
```

### Install dependencies

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run migrations

```bash
npx prisma migrate dev --name init
```

### Start development server

```bash
npm run start:dev
```

---

## 📌 Main Endpoints

### Artists

```http
POST   /artists
GET    /artists
GET    /artists/:id
PATCH  /artists/:id
DELETE /artists/:id
```

### Albums

```http
POST   /albums
GET    /albums
GET    /albums/:id
PATCH  /albums/:id
DELETE /albums/:id
```

### Tracks

```http
POST   /tracks
GET    /tracks
GET    /tracks/:id
PATCH  /tracks/:id
DELETE /tracks/:id

GET    /tracks/search?q=weeknd
GET    /tracks/ranking/most-added
GET    /tracks/recommendations/by-genre?genre=pop
```

### Playlists

```http
POST   /playlists
GET    /playlists
GET    /playlists/:id
PATCH  /playlists/:id
DELETE /playlists/:id

POST   /playlists/:id/tracks
DELETE /playlists/:id/tracks/:trackId
```

---

## 🏆 Challenge Goals Completed

* CRUD operations
* Relational modeling
* Playlist management
* Search and filtering
* Pagination
* Domain validation
* Duplicate prevention
* Ranking endpoint
* Recommendation endpoint
* Advanced REST API architecture

---

## 👨‍💻 Author

**Vitor Dutra Melo**

Backend Developer focused on Node.js, NestJS, Prisma, PostgreSQL, MySQL, MongoDB, Docker, and scalable backend systems.

Part of the Nova Era Tech Backend Journey.
