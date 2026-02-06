# Beton Kegna Backend API

Backend API for Beton Kegna real estate platform built with Node.js, Express, MongoDB, and TypeScript.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Deployment:** Render

## 🛠️ Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/betonkegna
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:slug` - Get property by slug
- `POST /api/properties` - Create new property (Admin)
- `PUT /api/properties/:id` - Update property (Admin)
- `DELETE /api/properties/:id` - Delete property (Admin)

### Hero
- `GET /api/hero/slides` - Get hero slides
- `POST /api/hero/slides` - Create hero slide (Admin)
- `PUT /api/hero/slides/:id` - Update hero slide (Admin)
- `DELETE /api/hero/slides/:id` - Delete hero slide (Admin)
- `GET /api/hero/stats` - Get hero stats
- `POST /api/hero/stats` - Create hero stat (Admin)
- `PUT /api/hero/stats/:id` - Update hero stat (Admin)
- `DELETE /api/hero/stats/:id` - Delete hero stat (Admin)

### About
- `GET /api/about/image` - Get about image
- `PUT /api/about/image` - Update about image (Admin)

### Contact
- `POST /api/contact` - Send contact message

### Auth
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

## 👤 Author

Fanuel Kemeto - Founder, Beton Kegna
