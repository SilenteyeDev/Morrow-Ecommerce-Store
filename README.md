# Morrow Supply Co.

A responsive storefront concept for a considered everyday goods brand. Built with React, Vite, and Tailwind CSS, with a warm editorial visual system based on the supplied reference screenshots.

## Highlights

- Responsive desktop and mobile layouts with editorial hero, collection, story, newsletter, and footer sections.
- Search, department filters, price sorting, favorites, and an interactive bag with quantity controls and subtotal.
- 18 sample products with star ratings, review counts, stock cues, price bands, top-rated sorting, and cart add-on suggestions.
- Cart and favorites persist in browser local storage.
- Accessible labels, keyboard dismissal for the cart, reduced-motion support, and page metadata.
- Vite production build, local preview, favicon, and Netlify/Vercel deployment configuration.

## Run locally

Requires Node.js 20 or later.

```sh
npm install
npm start
```

Open the local address printed by Vite. Create a production bundle with `npm run build`, then inspect it locally with `npm run preview`.

## Deploy

- **Netlify:** Import the repository. `netlify.toml` sets the build command and `dist` output folder.
- **Vercel:** Import the repository. `vercel.json` sets the build command and output folder.

## Demo scope

This is a portfolio storefront, not a live commerce backend. Checkout and newsletter submission are interface demos; payments, inventory, customer accounts, and email subscription services are not connected. Product photos and display fonts load from Unsplash and Google Fonts, so those visuals require internet access.
