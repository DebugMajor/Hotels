
# 🌍 WanderLust – Airbnb Style Listing Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Passport](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=black)
![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

A **full-stack Airbnb-style travel listing platform** where users can explore, create, and review vacation stays around the world.

This project demonstrates a **production-ready Node.js backend** with authentication, cloud image hosting, geolocation maps, and deployment.

---

# 🔗 Live Demo

Visit the deployed application:

👉 **https://hotels-project-yok8.onrender.com**

---

# ✨ Features

## 🔐 Authentication
- User **Signup & Login**
- Secure authentication using **Passport.js**
- **Session-based authentication**
- Protected routes

---

## 🏨 Listings Management
- Create new listings
- Edit existing listings
- Delete listings
- Browse all listings

---

## 🖼 Image Upload
- Upload listing images
- Cloud storage using **Cloudinary**
- Optimized image delivery

---

## ⭐ Reviews System
- Add reviews to listings
- Delete reviews
- Display reviewer information

---

## 📍 Maps Integration
- Map display using **Mapbox API**
- Interactive map markers for listing locations
- Geolocation-based coordinates

---

## 🔍 Search Functionality
- Search listings by:
  - Title
  - Location
  - Country

---

## ☁️ Deployment
- Hosted on **Render**
- Database hosted on **MongoDB Atlas**

---

# 🛠 Tech Stack

## Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

---

## Authentication
- **Passport.js**
- **Passport Local Strategy**
- **Express Sessions**

---

## Frontend
- **EJS**
- **Bootstrap**
- **JavaScript**

---

## APIs & Cloud Services
- **Mapbox** – Maps and geolocation
- **Cloudinary** – Image hosting and optimization

---

## Deployment
- **Render**
- **MongoDB Atlas**

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/DebugMajor/Hotels.git
cd Hotels
````

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
ATLAS_DB_URL=your_mongodb_connection_string

MAP_TOKEN=your_mapbox_token

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret

SECRET=your_session_secret
```

---

## 4️⃣ Start the Server

```bash
node app.js
```

---

## 5️⃣ Open in Browser

```
http://localhost:3000
```

---

# 📁 Project Structure

```
Hotels
│
├── models
├── routes
├── controllers
├── views
│   ├── listings
│   ├── users
│   ├── layouts
│   └── includes
│
├── public
├── utils
├── middleware
├── cloudConfig.js
└── app.js
```

---

# 📌 Future Improvements

* Advanced filtering (price, category)
* Booking system
* Wishlist functionality
* User profile pages
* Pagination
* Map-based search

---

# 👨‍💻 Author

**Shashwat Dhondyal**
