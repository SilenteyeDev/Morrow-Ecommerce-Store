import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './style.css';

const products = [
  { id: 1, name: 'Sunday sweatshirt', category: 'Clothing', price: 58, color: 'Butter / organic cotton', badge: 'Bestseller', rating: 4.9, reviews: 128, stock: 7, photo: 'photo-1576566588028-4147f3842f27' },
  { id: 2, name: 'Weekend court sneaker', category: 'Shoes', price: 94, color: 'Cream & forest', badge: 'Just in', rating: 4.8, reviews: 64, stock: 12, photo: 'photo-1495555961986-6d4c1ecb7be3' },
  { id: 3, name: 'Off-hours headphones', category: 'Tech', price: 129, color: 'Soft black', badge: 'Top rated', rating: 4.9, reviews: 213, stock: 5, photo: 'photo-1505740420928-5e560c06d30e' },
  { id: 4, name: 'The everyday sling', category: 'Accessories', price: 76, color: 'Espresso leather', badge: 'Bestseller', rating: 4.7, reviews: 96, stock: 9, photo: 'photo-1548036328-c9fa89d128fa' },
  { id: 5, name: 'Slow morning mug', category: 'Home', price: 32, color: 'Oat / handmade ceramic', badge: 'Small batch', rating: 4.8, reviews: 52, stock: 15, photo: 'photo-1514228742587-6b1558fcca3d' },
  { id: 6, name: 'Soft focus knit', category: 'Clothing', price: 84, color: 'Warm oat', badge: 'Bestseller', rating: 4.6, reviews: 73, stock: 6, photo: 'photo-1434389677669-e08b4cac3105' },
  { id: 7, name: 'Daily runner', category: 'Shoes', price: 88, color: 'Stone / moss', badge: 'Just in', rating: 4.5, reviews: 41, stock: 18, photo: 'photo-1495555961986-6d4c1ecb7be3' },
  { id: 8, name: 'Desk-side speaker', category: 'Tech', price: 112, color: 'Charcoal', badge: '', rating: 4.7, reviews: 88, stock: 11, photo: 'photo-1608043152269-423dbba4e7e1' },
  { id: 9, name: 'Everyday cotton tee', category: 'Clothing', price: 38, color: 'Undyed organic cotton', badge: 'Easy favorite', rating: 4.6, reviews: 102, stock: 24, photo: 'photo-1521572163474-6864f9cf17ab' },
  { id: 10, name: 'The easy overshirt', category: 'Clothing', price: 108, color: 'Moss / brushed twill', badge: 'Just in', rating: 4.7, reviews: 37, stock: 8, photo: 'photo-1598033129183-c4f50c736f10' },
  { id: 11, name: 'Pocket-sized pouch', category: 'Accessories', price: 42, color: 'Cognac / responsibly made', badge: '', rating: 4.5, reviews: 26, stock: 3, photo: 'photo-1584917865442-de89df76afd3' },
  { id: 12, name: 'Pocket power bank', category: 'Tech', price: 34, color: 'Matte graphite', badge: 'Under $40', rating: 4.4, reviews: 59, stock: 31, photo: 'photo-1609091839311-d5365f9ff1c5' },
  { id: 13, name: 'Little glow table lamp', category: 'Home', price: 96, color: 'Warm white / linen shade', badge: 'Bestseller', rating: 4.8, reviews: 79, stock: 4, photo: 'photo-1507473885765-e6ed057f782c' },
  { id: 14, name: 'Weekend ribbed beanie', category: 'Accessories', price: 36, color: 'Soft moss merino blend', badge: '', rating: 4.6, reviews: 33, stock: 19, photo: 'photo-1576871337622-98d48d1cf531' },
  { id: 15, name: 'Market day tote', category: 'Accessories', price: 62, color: 'Natural canvas / sturdy handles', badge: 'Everyday pick', rating: 4.8, reviews: 117, stock: 14, photo: 'photo-1590874103328-eac38a683ce7' },
  { id: 16, name: 'Sunday linen short', category: 'Clothing', price: 54, color: 'Washed stone linen', badge: 'Just in', rating: 4.5, reviews: 19, stock: 10, photo: 'photo-1591195853828-11db59a44f6b' },
  { id: 17, name: 'Trail-to-town sneaker', category: 'Shoes', price: 118, color: 'Clay / oat', badge: 'New color', rating: 4.7, reviews: 45, stock: 6, photo: 'photo-1542291026-7eec264c27ff' },
  { id: 18, name: 'Daily water bottle', category: 'Home', price: 28, color: 'Sage / double-wall steel', badge: 'Under $30', rating: 4.6, reviews: 145, stock: 28, photo: 'photo-1602143407151-7111542de6e8' },
];
const categories = ['Everything', 'Clothing', 'Shoes', 'Tech', 'Accessories', 'Home'];
const money = (amount) => `$${amount.toFixed(2)}`;
const imageUrl = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const readSaved = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('morrow-store') || '{}');
    return { cart: Array.isArray(saved.cart) ? saved.cart : [], favorites: Array.isArray(saved.favorites) ? saved.favorites : [] };
  } catch {
    return { cart: [], favorites: [] };
  }
};

function App() {
  const saved = useMemo(readSaved, []);
  const [category, setCategory] = useState('Everything');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('Featured');
  const [priceFilter, setPriceFilter] = useState('Any price');
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [cart, setCart] = useState(saved.cart);
  const [favorites, setFavorites] = useState(saved.favorites);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  useEffect(() => {
    localStorage.setItem('morrow-store', JSON.stringify({ cart, favorites }));
  }, [cart, favorites]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2300);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') { setCartOpen(false); setMenuOpen(false); setSelectedProduct(null); setCheckoutOpen(false); } };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const visibleProducts = useMemo(() => {
    const matching = products.filter((product) =>
      (category === 'Everything' || product.category === category) &&
      (!favoritesOnly || favorites.includes(product.id)) &&
      (priceFilter === 'Any price' || (priceFilter === 'Under $50' && product.price < 50) || (priceFilter === '$50–$100' && product.price >= 50 && product.price <= 100) || (priceFilter === '$100+' && product.price > 100)) &&
      (!topRatedOnly || (product.rating || 4.6) >= 4.7) &&
      `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === 'Price: low to high') matching.sort((a, b) => a.price - b.price);
    if (sort === 'Price: high to low') matching.sort((a, b) => b.price - a.price);
    if (sort === 'Top rated') matching.sort((a, b) => (b.rating || 4.6) - (a.rating || 4.6));
    if (sort === 'Most reviewed') matching.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    return matching;
  }, [category, favoritesOnly, favorites, priceFilter, topRatedOnly, query, sort]);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const subtotal = cart.reduce((total, item) => total + (products.find((product) => product.id === item.id)?.price || 0) * item.qty, 0);

  function addToCart(id, variant = 'One size') {
    setCart((items) => items.some((item) => item.id === id && (item.variant || 'One size') === variant)
      ? items.map((item) => item.id === id && (item.variant || 'One size') === variant ? { ...item, qty: item.qty + 1 } : item)
      : [...items, { id, qty: 1, variant }]);
    setCartOpen(true);
    setToast('Added to your bag');
  }

  function toggleFavorite(id) {
    const exists = favorites.includes(id);
    setFavorites((items) => exists ? items.filter((item) => item !== id) : [...items, id]);
    setToast(exists ? 'Removed from your saved finds' : 'Saved for later ♡');
  }

  function changeQuantity(id, variant, delta) {
    setCart((items) => items.map((item) => item.id === id && (item.variant || 'One size') === variant ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  }

  return <>
    <div className="announcement">THE GOOD THINGS, DELIVERED <span>✳</span> FREE SHIPPING ON ORDERS OVER $75</div>
    <header className="header">
      <a className="logo" href="#top" aria-label="Morrow home">morrow<span>.</span></a>
      <nav className={`main-nav ${menuOpen ? 'menu-open' : ''}`} aria-label="Main navigation">
        <a href="#shop" onClick={() => setMenuOpen(false)}>Shop all</a><a href="#departments" onClick={() => setMenuOpen(false)}>Departments</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
      </nav>
      <div className="header-actions"><label className="header-search"><span aria-hidden="true">⌕</span><input aria-label="Search all products" placeholder="Search good things…" value={query} onChange={(event) => setQuery(event.target.value)}/></label><button className="bag-button" aria-label={`Open bag, ${cartCount} items`} onClick={() => setCartOpen(true)}><span className="bag-icon">♧</span><span className="bag-word">Bag</span><span className="bag-count">{cartCount}</span></button><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>☰</button></div>
    </header>

    <main id="top">
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><span>✧</span> A LITTLE MORE EVERYDAY</p><h1>Good things<br/>find their way<br/><em>home.</em></h1><p className="hero-description">Considered clothes, clever little upgrades, and the pieces that just feel like you.</p><a className="button button-dark" href="#shop">Meet your next favorite <span>→</span></a><p className="hero-footnote">A collection for wherever the day takes you.</p></div><div className="hero-photo"><img src={imageUrl('photo-1539109136881-3be0616acf4b', 1200)} alt="A woman in a warm terracotta coat on a sunlit city walk"/><div className="hero-photo-copy"><span className="eyebrow">THE MORROW EDIT</span><h2>Good days<br/>start here.</h2><a href="#story">Our point of view&nbsp; ↗</a></div><span className="photo-caption">01 / MADE FOR THE MOMENT</span></div></section>
      <section className="shop-promises" aria-label="Shopping benefits"><div><span>↗</span><p><strong>Free shipping over $75</strong><small>A little thank-you on us</small></p></div><div><span>✧</span><p><strong>Thoughtful quality</strong><small>Made to be kept around</small></p></div><div><span>↺</span><p><strong>Easy 30-day returns</strong><small>Take your time deciding</small></p></div></section>

      <section className="departments section-wrap" id="departments"><div className="section-heading"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Find your kind of thing.</h2></div><p>Little rituals, big plans, and all the in-between.</p></div><div className="category-list">{categories.map((item, index) => <button key={item} className={`category-button ${category === item ? 'active' : ''}`} onClick={() => { setCategory(item); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }); }}><span>0{index + 1}</span>{item}<b>↗</b></button>)}</div></section>

      <section className="shop-section" id="shop"><div className="section-wrap"><div className="shop-heading"><div><p className="eyebrow">MADE FOR THE EVERYDAY</p><h2>A few good finds.</h2><p className="result-count">{visibleProducts.length} good finds</p></div><div className="shop-tools"><button className={`wishlist-filter ${favoritesOnly ? 'active' : ''}`} aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly((value) => !value)}>♡ Saved ({favorites.length})</button><label className="search-field"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Try 'sneakers'" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search products"/></label><label className="sort-field"><span aria-hidden="true">☷</span><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option><option>Top rated</option><option>Most reviewed</option></select></label></div></div><div className="market-filters"><label>Price range<select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}><option>Any price</option><option>Under $50</option><option>$50–$100</option><option>$100+</option></select></label><button className={topRatedOnly ? "active" : ""} aria-pressed={topRatedOnly} onClick={() => setTopRatedOnly((value) => !value)}>★ Top rated</button></div><div className="product-grid">{visibleProducts.length ? visibleProducts.map((product) => <ProductCard key={product.id} product={product} saved={favorites.includes(product.id)} onFavorite={toggleFavorite} onAdd={addToCart} onView={setSelectedProduct}/>) : <p className="no-results">{favoritesOnly && !favorites.length ? 'Save a few finds and they’ll show up here.' : 'No good finds here yet. Try another search.'}</p>}</div></div></section>

      <section className="story" id="story"><p className="eyebrow">THE GOOD EDIT&nbsp; ✧</p><div className="story-main"><p className="eyebrow">LESS, BUT BETTER. ALWAYS.</p><h2>The best things<br/>aren't just <em>things.</em></h2><p>They're the soft sweatshirt you reach for first. The little lamp that makes Tuesday feel like a plan. We look for thoughtful design, useful details, and pieces you'll want to keep around.</p><a href="#shop">Find your everyday favorite&nbsp; →</a></div><div className="promise"><p className="eyebrow">OUR PROMISE</p><p>Good design.<br/>Good materials.<br/>Good for the long run.</p></div></section>

      <section className="shipping" id="shipping"><span className="shipping-mark">↗</span><div><p className="eyebrow">A SMALL THANK YOU</p><h2>The good stuff ships free over $75.</h2></div><a href="#shop">Keep exploring&nbsp; ↗</a></section>
      <section className="newsletter"><div><p className="eyebrow">A NOTE FROM MORROW</p><h2>A little good in your inbox.</h2><p>New finds, thoughtful ideas, and the occasional thank-you.</p></div>{newsletterDone ? <p className="newsletter-success" role="status">You’re on the list. Talk soon ♡</p> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setNewsletterDone(true); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required/><button type="submit">Sign me up&nbsp; →</button><small>By subscribing, you agree to receive occasional emails from Morrow.</small></form>}</section>
    </main>

    <footer className="footer"><div><a className="logo" href="#top">morrow<span>.</span></a><p>Everyday things, a little more considered.</p></div><div><p className="eyebrow">EXPLORE</p><a href="#shop">Shop all</a><a href="#departments">Departments</a><a href="#story">Our story</a></div><div><p className="eyebrow">THE DETAILS</p><a href="#shipping">Shipping & returns</a><a href="mailto:hello@morrowsupply.co">Frequently asked questions</a></div><div className="copyright"><span>© 2026 Morrow Supply Co.</span><span>Made for the everyday, and everything in between.</span></div></footer>

    <div className={`scrim ${cartOpen ? 'visible' : ''}`} onClick={() => setCartOpen(false)} aria-hidden="true"/><aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping bag" aria-modal={cartOpen} role="dialog"><div className="cart-head"><div><p className="eyebrow">YOUR GOOD FINDS</p><h2>Your bag <small>({cartCount})</small></h2></div><button className="close-cart" aria-label="Close shopping bag" onClick={() => setCartOpen(false)}>×</button></div>{cart.length ? <><div className="cart-items">{cart.map(({ id, qty, variant = 'One size' }) => { const product = products.find((item) => item.id === id); if (!product) return null; return <div className="cart-item" key={id}><img src={imageUrl(product.photo, 200)} alt=""/><div className="cart-item-info"><strong>{product.name}</strong><small className="cart-variant">{variant}</small><span>{money(product.price)}</span><div className="quantity"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => changeQuantity(id, variant, -1)}>−</button><span>{qty}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => changeQuantity(id, variant, 1)}>+</button><button className="remove-item" onClick={() => { setCart((items) => items.filter((item) => !(item.id === id && (item.variant || 'One size') === variant))); setToast('Removed from your bag'); }}>Remove</button></div></div></div>; })}</div><div className="cart-recommendations"><p>You might also like</p>{products.filter((product) => !cart.some((item) => item.id === product.id)).slice(0, 2).map((product) => <div className="cart-recommendation" key={product.id}><img src={imageUrl(product.photo, 120)} alt=""/><div>{product.name}<small>{money(product.price)}</small></div><button onClick={() => addToCart(product.id)}>Add</button></div>)}</div><div className="cart-footer"><p><span>Subtotal</span><strong>{money(subtotal)}</strong></p><span className="shipping-note">{subtotal >= 75 ? 'Your order ships free. Lovely.' : `Add ${money(75 - subtotal)} for free shipping.`}</span><button className="button button-dark checkout" onClick={() => { setCartOpen(false); setCheckoutOpen(true); setOrderPlaced(false); }}>Continue to checkout&nbsp; →</button><p className="checkout-note">Taxes and shipping calculated at checkout.</p></div></> : <div className="empty-cart"><span className="empty-icon">⌕</span><h3>Something good is missing.</h3><p>Your bag is taking a little breather. Find it a favorite?</p><button className="button button-dark explore" onClick={() => setCartOpen(false)}>Explore the collection&nbsp; →</button></div>}</aside>
    <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart}/>
    {checkoutOpen && <CheckoutPreview subtotal={subtotal} orderPlaced={orderPlaced} setOrderPlaced={setOrderPlaced} onClose={() => setCheckoutOpen(false)} onFinish={() => { setCheckoutOpen(false); setCart([]); }}/>}
    {toast && <div className="store-toast show" role="status" aria-live="polite">{toast}</div>}
  </>;
}

function ProductDetailsModal({ product, onClose, onAdd }) {
  const [option, setOption] = useState('');
  useEffect(() => { setOption(product?.category === 'Clothing' ? 'M' : product?.category === 'Shoes' ? '8' : 'One size'); }, [product]);
  if (!product) return null;
  const options = product.category === 'Clothing' ? ['XS', 'S', 'M', 'L', 'XL'] : product.category === 'Shoes' ? ['6', '7', '8', '9', '10', '11'] : ['One size'];
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><button className="modal-close" onClick={onClose} aria-label="Close product details">×</button><img src={imageUrl(product.photo, 900)} alt={product.name}/><div className="product-modal-copy"><p className="eyebrow">{product.category.toUpperCase()} / MORROW GOODS</p><h2 id="product-modal-title">{product.name}</h2><div className="product-rating"><span>★</span> {product.rating || 4.6} <small>({product.reviews || 0} sample reviews)</small></div><p className="product-modal-price">{money(product.price)}</p><p className="product-modal-description">A thoughtful everyday essential, chosen for its useful details, easy comfort, and lasting materials. Color: {product.color}.</p><label className="option-label">{product.category === 'Clothing' || product.category === 'Shoes' ? 'Choose a size' : 'Options'}<select value={option} onChange={(event) => setOption(event.target.value)}>{options.map((value) => <option key={value}>{value}</option>)}</select></label><p className="product-availability">{(product.stock || 12) <= 5 ? 'Only ' + (product.stock || 12) + ' left in this demo' : 'In stock · ships in 1–2 days'}</p><button className="button button-dark modal-add" onClick={() => { onAdd(product.id, option); onClose(); }}>Add to bag · {money(product.price)}</button><p className="demo-note">Ratings and availability are example catalog data.</p></div></section></div>;
}

function CheckoutPreview({ subtotal, orderPlaced, setOrderPlaced, onClose, onFinish }) {
  return <div className="modal-backdrop checkout-backdrop"><section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><button className="modal-close" onClick={onClose} aria-label="Close checkout">×</button>{orderPlaced ? <div className="order-confirmation"><span>✓</span><h2 id="checkout-title">Order preview complete.</h2><p>This demo doesn’t process payment or place a real order.</p><button className="button button-dark" onClick={onFinish}>Back to the shop</button></div> : <><p className="eyebrow">A FEW DETAILS</p><h2 id="checkout-title">Checkout preview</h2><p className="checkout-total">Order subtotal <strong>{money(subtotal)}</strong></p><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setOrderPlaced(true); }}><label>Full name<input name="name" autoComplete="name" required/></label><label>Email address<input name="email" type="email" autoComplete="email" required/></label><label>Shipping address<input name="address" autoComplete="street-address" required/></label><p className="demo-note">Preview only. Payment details are not collected.</p><button className="button button-dark" type="submit">Review demo order&nbsp; →</button></form></>}</section></div>;
}

function ProductCard({ product, saved, onFavorite, onAdd, onView }) {
  return <article className="product-card"><div className="product-image"><img src={imageUrl(product.photo)} alt={product.name} loading="lazy"/><span className={`product-badge ${product.badge ? '' : 'empty'}`}>{product.badge}</span><button className={`favorite ${saved ? 'saved' : ''}`} onClick={() => onFavorite(product.id)} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} favorites`}>{saved ? '♥' : '♡'}</button><button className="quick-add" onClick={() => onAdd(product.id)}>Add to bag&nbsp; +</button></div><div className="product-meta"><button className="product-name" onClick={() => onView(product)}>{product.name}</button><span>{money(product.price)}</span></div><div className="product-rating"><span>★</span> {(product.rating || 4.6).toFixed(1)} <small>({product.reviews || 0} reviews)</small></div><p className="product-color">{product.color}</p><p className={`product-availability ${(product.stock || 12) <= 5 ? "low-stock" : ""}`}>{(product.stock || 12) <= 5 ? `Only ${product.stock || 12} left` : "Ships in 1–2 days"}</p></article>;
}

createRoot(document.getElementById('app')).render(<React.StrictMode><App /></React.StrictMode>);
