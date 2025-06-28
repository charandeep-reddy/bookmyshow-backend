# BookMyShow Backend (MVP)

A simple ticket booking backend using **Next.js API routes**, **TypeScript**, **Mongoose**, and **JWT**.

---

## Features
- User Registration & Login (JWT)
- Admin: Add movies, venues, shows (admin-only)
- Search movies by city
- Book tickets with seat selection (no double booking)
- View booking history

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up MongoDB:**
   - Add to `.env.local`:
     ```
     MONGODB_URI=mongodb://localhost:27017/bookmyshow
     JWT_SECRET=your-secret-key
     ```
3. **Run the server:**
   ```bash
   npm run dev
   ```

---

## API Endpoints & Sample Data

### 1. Register
- `POST /api/register`
- **Sample:**
  ```json
  { "name": "Admin", "email": "admin@demo.com", "password": "pass123", "isAdmin": true }
  ```

### 2. Login
- `POST /api/login`
- **Sample:**
  ```json
  { "email": "admin@demo.com", "password": "pass123" }
  ```
- **Returns:** `{ "token": "..." }`

### 3. Add Movie (Admin Only)
- `POST /api/admin/add-movie` (JWT required)
- **Sample:**
  ```json
  { "title": "Inception", "description": "Dreams within dreams", "releaseDate": "2010-07-16", "duration": 148, "genre": "Sci-Fi", "language": ["English"] }
  ```

### 4. Add Venue (Admin Only)
- `POST /api/admin/add-venue` (JWT required)
- **Sample:**
  ```json
  { "name": "PVR", "address": "Main St", "city": "Hyderabad", "state": "TS", "pincode": "500001" }
  ```

### 5. Add Show (Admin Only)
- `POST /api/admin/add-show` (JWT required)
- **Sample:**
  ```json
  { "movieTitle": "Inception", "venueName": "PVR", "showTime": "2024-06-01T19:00:00.000Z", "price": 250 }
  ```

### 6. Search Movies by City
- `GET /api/movies?city=Hyderabad`
- **Returns:**
  ```json
  { "movies": [ { "title": "Inception", ... } ] }
  ```

### 7. List Shows
- `GET /api/shows`
- **Returns:**
  ```json
  { "shows": [ { "movie": "...", "venue": "...", ... } ] }
  ```

### 8. Book Tickets
- `POST /api/book` (JWT required)
- **Sample:**
  ```json
  { "showId": "<SHOW_ID>", "seats": ["A1", "A2"] }
  ```

### 9. Booking History
- `GET /api/bookings` (JWT required)
- **Returns:**
  ```json
  { "bookings": [ { "show": "...", "seats": ["A1"], ... } ] }
  ```

### 10. Check Login Status
- `GET /api/me` (JWT required)
- **Returns:**
  ```json
  { "user": { "name": "Admin", "email": "admin@demo.com", ... } }
  ```

---

## Admin & Security
- Only users with `isAdmin: true` can access admin APIs.
- Pass JWT as `Authorization: Bearer <token>` in headers for protected routes.
- For demo, you can set `isAdmin` during registration.
