# E-commerce Platform

A modern, responsive e-commerce application built with Node,Express,Mongoose, React, Vite, and Tailwind CSS.

## Features

- **Modern UI/UX**: Fully responsive design built with Tailwind CSS.
- **Product Management**: Browse all products, filter by categories, and view detailed product pages.
- **Shopping Cart & Wishlist**: Seamlessly add products to your cart and wishlist.
- **Checkout Process**: Intuitive checkout flow.
- **User Authentication**: Secure Login and Sign Up functionality.
- **Admin Dashboard**: Dedicated area for managing products and users (Admin Route protected).
- **State Management**: Robust state handling using React Context (Auth, Cart, Wishlist, Products).
- **Notifications**: Real-time toast notifications for user interactions via `react-toastify`.

## Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **API Requests**: [Axios](https://axios-http.com/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

## Project Structure

- `src/components`: Reusable UI components and page layouts (Cart, Checkout, Header, Footer).
- `src/components/admin`: Admin dashboard components for managing the platform.
- `src/Hooks`: Custom React hooks and Context providers (`useAuthContext`, `useCartContext`, `useWishListContext`).
- `src/api`: Axios configuration and API helpers.
- `src/assets`: Images and static assets.
- `src/data`: Mock data or initial states.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   cd Ecommerce-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the local URL provided by Vite (usually `http://localhost:5173`).

### Build for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally previews the production build.
