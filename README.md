# MERN E‑Commerce Web Application

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[Live Demo](https://e-commerce-one-sandy-54.vercel.app) • [Frontend Code](https://github.com/gajendra-tm/E-commerce_Frontend) • [Backend Code](https://github.com/gajendra-tm/E-commerce)

---

## 🔥 Project Overview

This is a full‑stack, e‑commerce web application built on the MERN stack and deployed on Vercel. It delivers a seamless shopping experience—complete with user authentication, dynamic product catalogs, advanced filtering & sorting, shopping cart and checkout flows, payment processing via Stripe, order management, and an admin panel for end‑to‑end store control.

Key highlights:  
- **Frontend:** React.js with Redux Toolkit and Tailwind CSS for rapid, responsive UI  
- **Backend:** Node.js, Express, MongoDB Atlas,
- **Authentication:** 	Passport.js, JWT,  
- **Payments & Notifications:** Stripe integration for PCI‑compliant payments; email notifications via Nodemailer; user alerts via React‑Toastify  
- **Admin Panel:** Real‑time order management, product CRUD, status updates, password reset emails  

---

## 🛠️ Tech Stack

| Layer          | Technology / Library      |
| -------------- | ------------------------- |
| **Frontend**   | React.js, Redux Toolkit, Tailwind CSS, React‑Toastify |
| **Backend**    | Node.js, Express.js       |
| **Authentication**    | 	Passport.js (JWT strategy), JSON Web Tokens (JWT)      |
| **Database**   | MongoDB Atlas             |
| **Payments**   | Stripe API                |
| **Email**      | Nodemailer                |
| **Deployment** | Vercel                    |

---

## 🚀 Features

### Customer‑Facing

1. **Authentication & Authorization**  
   - Secure login & signup with Passport.js and JWT
   - Protected routes for user profile, cart, checkout
   - Password reset via email link  

2. **Product Catalog**  
   - Paginated product listing  
   - Filters by category & brand  
   - Sort by price (low↔high) and rating  

3. **Product Details**  
   - Detailed view with images, description, reviews  

4. **Shopping Cart & Checkout**  
   - Add / remove items, quantity management  
   - Save multiple shipping addresses  
   - Select payment method: Stripe card payment or Cash on Delivery  
   - Real‑time price calculation  

5. **User Profile & Orders**  
   - View / edit saved addresses  
   - Order history with status tracking  

6. **Notifications**  
   - In‑app toast notifications (React‑Toastify)  
   - Order confirmation and password‑reset emails (Nodemailer)  

### Admin Panel

- **Admin Authorization**  
  - JWT‑based role checks (admin vs. customer) 
  - Passport.js middleware to guard admin endpoints 

- **Order Management**  
  - See all customer orders with full details  
  - Update order status (pending, in transit, delivered, canceled, payment received)  

- **Product Management**  
  - Add new products with images, pricing, inventory, category, brand  

- **User Management**  
  - Trigger password‑reset emails  

---
