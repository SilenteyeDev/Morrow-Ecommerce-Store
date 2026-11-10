# Morrow Supply Co.

**Considered essentials. Everyday living.**

A responsive ecommerce storefront concept for a modern everyday goods brand. Morrow Supply Co. combines a warm editorial aesthetic with an interactive shopping experience, built using React, Vite, and Tailwind CSS.

The design focuses on clean layouts, thoughtful typography, product discovery, and a smooth shopping interface across desktop and mobile devices.

---

## Preview

*A modern storefront featuring an editorial hero, curated product collections, brand storytelling, and an interactive shopping bag.*

---

## Features

### Storefront Experience
- Responsive desktop and mobile layouts.
- Editorial hero section and curated product collections.
- Brand story, newsletter section, and custom footer.
- Warm visual identity inspired by contemporary lifestyle brands.

### Product Discovery
- 18 sample products.
- Product search functionality.
- Department-based filtering.
- Price sorting and top-rated sorting.
- Product ratings, review counts, stock indicators, and price ranges.
- Product recommendations and cart add-on suggestions.

### Shopping Experience
- Interactive shopping bag with quantity controls.
- Automatic subtotal calculation.
- Add-to-cart functionality.
- Product favorites and wishlist interactions.
- Cart and favorites persist using browser local storage.

### Accessibility & Performance
- Accessible labels and interface controls.
- Keyboard dismissal for the shopping cart.
- Reduced-motion support.
- Page metadata and custom favicon.
- Optimized production builds through Vite.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based UI |
| Vite | Development server and build tooling |
| Tailwind CSS | Styling and responsive layouts |
| JavaScript | Application logic |
| Local Storage | Persistent cart and favorites |
| Unsplash | Product imagery |
| Google Fonts | Typography |

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SilenteyeDev/Morrow-Ecommerce-Store.git
```

### 2. Navigate into the project

```bash
cd Morrow-Ecommerce-Store
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm start
```

Open the local URL printed in your terminal to view the storefront.

---

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are placed in the `dist/` directory.

---

## Deployment

The project includes deployment configuration for both Netlify and Vercel.

### Netlify
1. Import the GitHub repository into Netlify.
2. Netlify will use the configuration in `netlify.toml`.
3. Build output: `dist/`.

### Vercel
1. Import the GitHub repository into Vercel.
2. Vercel will use the configuration in `vercel.json`.
3. Deploy the project.

---

## Project Scope & Limitations

Morrow Supply Co. is a **front-end portfolio project**, not a fully operational ecommerce platform.

The following features are currently interface demonstrations:

- Checkout and payment processing.
- Newsletter subscription.
- Inventory management.
- Customer accounts and authentication.
- Backend order processing.

No payment gateway, inventory database, customer management system, or email subscription service is connected.

Product imagery and display fonts are loaded from Unsplash and Google Fonts, respectively, and therefore require an internet connection.

---

## Future Improvements

- Backend integration and product database.
- User authentication and customer accounts.
- Real payment gateway integration.
- Order management and checkout flow.
- Live inventory and stock management.
- Functional newsletter subscription.
- Admin dashboard for managing products and orders.

---

## Repository

**GitHub:** [SilenteyeDev/Morrow-Ecommerce-Store](https://github.com/SilenteyeDev/Morrow-Ecommerce-Store)

---

*Built as a frontend ecommerce concept to explore modern storefront design, responsive interfaces, and interactive shopping experiences.*