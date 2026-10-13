export type Category = "Audio" | "Wearables" | "Home" | "Office" | "Accessories" | "Gaming" | "Electronics";

export interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  price: number; // NGN, major units
  compareAtPrice?: number; // NGN, shown struck-through when on sale
  emoji: string;
  images: string[]; // paths under /public
  category: Category;
  badge?: "New" | "Bestseller" | "Sale";
  rating: number; // out of 5
  reviews: number;
  sku: string;
  stock: number;
}

// Accent gradient (Tailwind classes) shown behind each product's icon tile,
// keyed by category so the grid reads as organized rather than random.
export const CATEGORY_ACCENT: Record<Category, string> = {
  Audio: "from-violet-500 to-fuchsia-500",
  Wearables: "from-sky-500 to-cyan-400",
  Home: "from-amber-500 to-orange-500",
  Office: "from-emerald-500 to-teal-400",
  Accessories: "from-rose-500 to-pink-500",
  Gaming: "from-indigo-500 to-purple-500",
  Electronics: "from-slate-600 to-slate-800",
};

export const PRODUCTS: Product[] = [
  {
    slug: "wireless-headphones",
    name: "Wireless Headphones",
    description: "Over-ear, active noise cancellation, 30hr battery.",
    longDescription:
      "Studio-tuned over-ear headphones built for long sessions — deep, distortion-free bass, plush memory-foam ear cups, and adaptive noise cancellation that adjusts to your surroundings in real time. Fold them flat and take them anywhere.",
    highlights: [
      "Adaptive active noise cancellation",
      "30-hour battery, 10-min quick charge = 5hrs",
      "Multipoint Bluetooth 5.3 pairing",
      "Plush memory-foam ear cushions",
    ],
    price: 45000,
    emoji: "🎧",
    images: ["/products/wireless-headphones-1.jpg", "/products/wireless-headphones-2.jpg"],
    category: "Audio",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 312,
    sku: "MM-AUD-001",
    stock: 24,
  },
  {
    slug: "smart-watch",
    name: "Smart Watch",
    description: "Fitness tracking, heart-rate monitor, 7-day battery.",
    longDescription:
      "Track every workout, monitor your heart rate around the clock, and stay on top of notifications without reaching for your phone. Swim-proof, sunlight-readable, and light enough to forget you're wearing it.",
    highlights: [
      "24/7 heart-rate & SpO2 monitoring",
      "7-day battery life on a single charge",
      "5ATM water resistance — swim ready",
      "50+ workout modes with GPS",
    ],
    price: 68500,
    emoji: "⌚",
    images: ["/products/smart-watch-1.jpg", "/products/smart-watch-2.jpg"],
    category: "Wearables",
    badge: "New",
    rating: 4.6,
    reviews: 148,
    sku: "MM-WBL-002",
    stock: 17,
  },
  {
    slug: "desk-lamp",
    name: "LED Desk Lamp",
    description: "Adjustable brightness, USB-C powered, foldable arm.",
    longDescription:
      "A flicker-free LED desk lamp that folds flat for travel and holds any angle you set it to. Five brightness levels and three color temperatures make it as comfortable for late-night reading as it is for video calls.",
    highlights: [
      "5 brightness levels, 3 color temperatures",
      "USB-C powered, works off a power bank",
      "Foldable, adjustable arm — holds any angle",
      "Flicker-free, eye-comfort certified",
    ],
    price: 12000,
    emoji: "💡",
    images: ["/products/desk-lamp-1.jpg"],
    category: "Home",
    rating: 4.5,
    reviews: 89,
    sku: "MM-HOM-003",
    stock: 41,
  },
  {
    slug: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    description: "Hot-swappable switches, per-key RGB, aluminum frame.",
    longDescription:
      "A compact 75% mechanical keyboard with a CNC-machined aluminum frame and hot-swappable switch sockets, so you can change the feel without ever picking up a soldering iron. Per-key RGB, PBT keycaps, and a braided USB-C cable included.",
    highlights: [
      "Hot-swappable switches, no soldering",
      "Per-key RGB with 16.7M colors",
      "CNC aluminum frame, PBT keycaps",
      "Compact 75% layout, USB-C detachable cable",
    ],
    price: 39500,
    compareAtPrice: 49500,
    emoji: "⌨️",
    images: ["/products/mechanical-keyboard-1.jpg", "/products/mechanical-keyboard-2.jpg"],
    category: "Office",
    badge: "Sale",
    rating: 4.9,
    reviews: 421,
    sku: "MM-OFF-004",
    stock: 33,
  },
  {
    slug: "earbuds-pro",
    name: "Earbuds Pro",
    description: "True wireless, wireless charging case, sweat resistant.",
    longDescription:
      "Secure-fit true wireless earbuds with punchy sound and reliable connection, in a pocket-sized case that tops up over wireless charging. IPX4 sweat resistance means they keep up through workouts and rainy commutes alike.",
    highlights: [
      "True wireless with wireless charging case",
      "IPX4 sweat & splash resistant",
      "Up to 28hrs total playback with case",
      "Touch controls, in-ear detection",
    ],
    price: 32000,
    emoji: "🎵",
    images: ["/products/earbuds-pro-1.jpg"],
    category: "Audio",
    rating: 4.4,
    reviews: 203,
    sku: "MM-AUD-005",
    stock: 52,
  },
  {
    slug: "leather-backpack",
    name: "Leather Backpack",
    description: "Padded 15\" laptop sleeve, water-resistant, 22L capacity.",
    longDescription:
      "A commuter backpack built to carry a full workday: a padded 15-inch laptop sleeve, a water-resistant shell, and 22L of thoughtfully organized space for everything else. Ergonomic straps keep it comfortable on the longest days.",
    highlights: [
      "Padded 15\" laptop & tablet sleeve",
      "Water-resistant shell fabric",
      "22L capacity, organized interior pockets",
      "Ergonomic, breathable shoulder straps",
    ],
    price: 28500,
    emoji: "🎒",
    images: ["/products/leather-backpack-1.jpg", "/products/leather-backpack-2.jpg"],
    category: "Accessories",
    rating: 4.7,
    reviews: 96,
    sku: "MM-ACC-006",
    stock: 19,
  },
  {
    slug: "espresso-machine",
    name: "Espresso Machine",
    description: "15-bar pump, built-in grinder, milk frother wand.",
    longDescription:
      "Café-quality espresso at home: a 15-bar pump pulls a rich, consistent shot every time, the built-in conical burr grinder keeps grounds fresh, and the steam wand froths milk for lattes and cappuccinos in seconds.",
    highlights: [
      "15-bar Italian pump for true espresso crema",
      "Built-in conical burr grinder",
      "Manual steam wand for milk froth",
      "Removable water tank & drip tray",
    ],
    price: 95000,
    compareAtPrice: 112000,
    emoji: "☕",
    images: ["/products/espresso-machine-1.jpg", "/products/espresso-machine-2.jpg"],
    category: "Home",
    badge: "Sale",
    rating: 4.7,
    reviews: 167,
    sku: "MM-HOM-007",
    stock: 12,
  },
  {
    slug: "ergo-mouse",
    name: "Ergonomic Mouse",
    description: "Vertical grip, silent clicks, 4000 DPI optical sensor.",
    longDescription:
      "A vertical-grip mouse designed to keep your wrist in a natural handshake position through long work sessions. Silent clicks, a precise 4000 DPI optical sensor, and weeks of battery life from two AA batteries.",
    highlights: [
      "Vertical grip reduces wrist strain",
      "Silent clicks, 4000 DPI optical sensor",
      "Up to 6 months battery life",
      "Works on glass & most surfaces",
    ],
    price: 15500,
    emoji: "🖱️",
    images: ["/products/ergo-mouse-1.jpg", "/products/ergo-mouse-2.jpg"],
    category: "Office",
    rating: 4.3,
    reviews: 74,
    sku: "MM-OFF-008",
    stock: 38,
  },
  {
    slug: "sunglasses",
    name: "Polarized Sunglasses",
    description: "UV400 protection, shatterproof lens, spring hinges.",
    longDescription:
      "Polarized lenses cut glare without dulling color, UV400 coating blocks harmful rays, and spring-loaded hinges flex instead of snap. A lightweight, shatterproof frame that's as comfortable at the beach as it is behind the wheel.",
    highlights: [
      "Polarized, UV400-rated lenses",
      "Shatterproof, lightweight frame",
      "Spring hinges for a flexible fit",
      "Includes microfiber pouch",
    ],
    price: 18500,
    emoji: "🕶️",
    images: ["/products/sunglasses-1.jpg", "/products/sunglasses-2.jpg"],
    category: "Accessories",
    badge: "New",
    rating: 4.6,
    reviews: 52,
    sku: "MM-ACC-009",
    stock: 27,
  },
  {
    slug: "bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    description: "360° sound, IPX7 waterproof, 20hr playtime.",
    longDescription:
      "Fill a room — or survive a pool party — with 360° sound from a speaker rated IPX7 waterproof. Pair two together for stereo, or clip it to a bag and take the party outside; 20 hours of playtime means it outlasts most days out.",
    highlights: [
      "360° sound, punchy bass radiators",
      "IPX7 waterproof — fully submersible",
      "20-hour playtime, USB-C fast charge",
      "Pair two units for stereo sound",
    ],
    price: 26500,
    emoji: "🔊",
    images: ["/products/bluetooth-speaker-1.jpg"],
    category: "Audio",
    badge: "Bestseller",
    rating: 4.7,
    reviews: 258,
    sku: "MM-AUD-010",
    stock: 30,
  },
  {
    slug: "fitness-band",
    name: "Fitness Band",
    description: "Slim tracker, sleep scoring, 12-day battery.",
    longDescription:
      "A slim, barely-there band that tracks steps, sleep stages, and heart rate for up to 12 days on a charge. The AMOLED display stays readable in direct sunlight, and a companion app turns the raw numbers into a daily score you actually understand.",
    highlights: [
      "12-day battery life on a single charge",
      "Sleep stage scoring & heart-rate alerts",
      "Bright AMOLED display, sunlight readable",
      "5ATM water resistant",
    ],
    price: 21000,
    emoji: "📿",
    images: ["/products/fitness-band-1.jpg"],
    category: "Wearables",
    rating: 4.4,
    reviews: 131,
    sku: "MM-WBL-011",
    stock: 46,
  },
  {
    slug: "running-shoes",
    name: "Running Shoes",
    description: "Responsive foam midsole, breathable knit upper.",
    longDescription:
      "A responsive foam midsole returns energy with every stride, while the breathable knit upper keeps feet cool over long distances. Whether it's a morning 5k or standing all day, these are built to disappear on your feet.",
    highlights: [
      "Responsive foam midsole for energy return",
      "Breathable knit upper, reinforced heel",
      "Rubber outsole with multi-surface traction",
      "Reflective details for low-light visibility",
    ],
    price: 34000,
    compareAtPrice: 41000,
    emoji: "👟",
    images: ["/products/running-shoes-1.jpg", "/products/running-shoes-2.jpg"],
    category: "Accessories",
    badge: "Sale",
    rating: 4.6,
    reviews: 189,
    sku: "MM-ACC-012",
    stock: 28,
  },
  {
    slug: "water-bottle",
    name: "Insulated Water Bottle",
    description: "24hr cold, 12hr hot, leak-proof stainless steel.",
    longDescription:
      "Double-walled, vacuum-insulated stainless steel that keeps drinks ice cold for 24 hours or hot for 12. The powder-coated finish resists condensation and slips, and the leak-proof lid means it's safe to toss straight into a bag.",
    highlights: [
      "Keeps drinks cold 24hrs, hot 12hrs",
      "Double-walled vacuum insulation",
      "Leak-proof lid, condensation-free finish",
      "600ml capacity, fits most cup holders",
    ],
    price: 9500,
    emoji: "🧴",
    images: ["/products/water-bottle-1.jpg"],
    category: "Accessories",
    rating: 4.5,
    reviews: 64,
    sku: "MM-ACC-013",
    stock: 63,
  },
  {
    slug: "camera",
    name: "Mirrorless Camera",
    description: "24MP APS-C sensor, 4K video, interchangeable lens.",
    longDescription:
      "A 24MP APS-C mirrorless body that shoots crisp stills and smooth 4K video, with a lens mount that grows with you as you build a kit. In-body stabilization and fast autofocus make it as comfortable for street photography as it is for vlogging.",
    highlights: [
      "24MP APS-C sensor, 4K/30fps video",
      "In-body image stabilization",
      "Fast hybrid autofocus with eye tracking",
      "Interchangeable lens mount",
    ],
    price: 285000,
    compareAtPrice: 320000,
    emoji: "📷",
    images: ["/products/camera-1.jpg", "/products/camera-2.jpg"],
    category: "Electronics",
    badge: "Sale",
    rating: 4.9,
    reviews: 97,
    sku: "MM-ELC-014",
    stock: 8,
  },
  {
    slug: "leather-wallet",
    name: "Leather Wallet",
    description: "Full-grain leather, RFID-blocking, 8-card slots.",
    longDescription:
      "A slim full-grain leather wallet that gets better with age. RFID-blocking lining keeps card data safe, eight card slots and a bill pocket keep everything organized, and the whole thing is barely thicker than the cards it holds.",
    highlights: [
      "Full-grain leather, ages beautifully",
      "RFID-blocking card lining",
      "8 card slots + bill compartment",
      "Slim profile, fits front pocket",
    ],
    price: 14500,
    emoji: "👛",
    images: ["/products/leather-wallet-1.jpg"],
    category: "Accessories",
    badge: "New",
    rating: 4.7,
    reviews: 108,
    sku: "MM-ACC-015",
    stock: 35,
  },
  {
    slug: "gaming-controller",
    name: "Wireless Gaming Controller",
    description: "Hall-effect sticks, low latency, 20hr battery.",
    longDescription:
      "Hall-effect thumbsticks eliminate drift before it starts, while a 2.4GHz low-latency connection keeps input lag out of your way. Remappable back paddles and 20 hours of battery mean it's ready whenever you are.",
    highlights: [
      "Hall-effect sticks — drift-resistant",
      "2.4GHz low-latency wireless, USB-C wired mode",
      "Remappable back paddles",
      "20-hour battery life",
    ],
    price: 24500,
    emoji: "🎮",
    images: ["/products/gaming-controller-1.jpg"],
    category: "Gaming",
    badge: "New",
    rating: 4.8,
    reviews: 176,
    sku: "MM-GAM-016",
    stock: 22,
  },
  {
    slug: "gaming-chair",
    name: "Gaming Chair",
    description: "Ergonomic lumbar support, 4D armrests, recline to 165°.",
    longDescription:
      "Built for marathon sessions: adjustable lumbar and neck support, 4D armrests that move exactly where your elbows land, and a backrest that reclines to 165° for a break between rounds. Steel frame rated for years of daily use.",
    highlights: [
      "Adjustable lumbar & neck support",
      "4D armrests, recline to 165°",
      "Steel frame, premium PU upholstery",
      "Class-4 gas lift, smooth-rolling casters",
    ],
    price: 128000,
    emoji: "🪑",
    images: ["/products/gaming-chair-1.jpg"],
    category: "Gaming",
    rating: 4.5,
    reviews: 63,
    sku: "MM-GAM-017",
    stock: 9,
  },
  {
    slug: "podcast-microphone",
    name: "Studio Microphone",
    description: "Cardioid dynamic mic, built-in shock mount, XLR.",
    longDescription:
      "A cardioid dynamic microphone that rejects room noise and picks up your voice with broadcast-quality warmth. The built-in shock mount kills desk bumps and keyboard rumble, and the all-metal body is heavy enough to feel like the real studio gear it's modeled on.",
    highlights: [
      "Cardioid dynamic capsule, rejects room noise",
      "Built-in shock mount, no separate cradle needed",
      "XLR connection, works with any audio interface",
      "All-metal body and boom-arm compatible thread",
    ],
    price: 42000,
    emoji: "🎙️",
    images: ["/products/podcast-microphone-1.jpg", "/products/podcast-microphone-2.jpg"],
    category: "Audio",
    badge: "New",
    rating: 4.8,
    reviews: 61,
    sku: "MM-AUD-018",
    stock: 20,
  },
  {
    slug: "vr-headset",
    name: "VR Headset",
    description: "Standalone, no PC needed, 90Hz display, 6DOF tracking.",
    longDescription:
      "A fully standalone VR headset — no PC, no wires, no external sensors. Inside-out 6DOF tracking follows you around the room, and a crisp 90Hz display keeps fast motion smooth instead of nauseating. Charge it, put it on, and you're in.",
    highlights: [
      "Standalone — no PC or console required",
      "90Hz display, low-persistence for smooth motion",
      "Inside-out 6DOF tracking, no external sensors",
      "Adjustable strap, glasses-compatible fit",
    ],
    price: 265000,
    compareAtPrice: 299000,
    emoji: "🥽",
    images: ["/products/vr-headset-1.jpg"],
    category: "Gaming",
    badge: "Sale",
    rating: 4.7,
    reviews: 88,
    sku: "MM-GAM-019",
    stock: 11,
  },
  {
    slug: "gaming-headset",
    name: "Gaming Headset",
    description: "7.1 surround, noise-cancelling mic, memory foam pads.",
    longDescription:
      "Virtual 7.1 surround sound places footsteps and gunfire exactly where they happen, a noise-cancelling boom mic keeps your team from hearing your keyboard, and memory-foam ear pads stay comfortable through the longest sessions.",
    highlights: [
      "Virtual 7.1 surround sound",
      "Noise-cancelling, flip-to-mute boom mic",
      "Memory-foam ear pads, aluminum headband",
      "Works on PC, console, and mobile",
    ],
    price: 31500,
    emoji: "🎧",
    images: ["/products/gaming-headset-1.jpg", "/products/gaming-headset-2.jpg"],
    category: "Gaming",
    badge: "Bestseller",
    rating: 4.6,
    reviews: 214,
    sku: "MM-GAM-020",
    stock: 26,
  },
  {
    slug: "leather-belt",
    name: "Leather Belt",
    description: "Full-grain leather, solid brass buckle, hand-stitched.",
    longDescription:
      "A full-grain leather belt that breaks in rather than wears out, finished with a solid brass buckle and hand-stitched edges. One of those things worth buying once instead of replacing every year.",
    highlights: [
      "Full-grain leather, ages beautifully",
      "Solid brass buckle, hand-stitched edges",
      "1.35\" width fits standard belt loops",
      "Trimmable for a custom fit",
    ],
    price: 13500,
    emoji: "👔",
    images: ["/products/leather-belt-1.jpg"],
    category: "Accessories",
    rating: 4.6,
    reviews: 44,
    sku: "MM-ACC-021",
    stock: 40,
  },
  {
    slug: "leather-tote-bag",
    name: "Leather Tote Bag",
    description: "Structured leather, magnetic close, fits a 13\" laptop.",
    longDescription:
      "A structured leather tote that goes from commute to meeting without missing a beat — a padded sleeve fits a 13-inch laptop, a magnetic close keeps everything in without fumbling for a zip, and the shape holds even half-empty.",
    highlights: [
      "Structured leather, holds its shape",
      "Padded sleeve fits up to a 13\" laptop",
      "Magnetic close, interior zip pocket",
      "Reinforced handles for daily carry",
    ],
    price: 36500,
    emoji: "👜",
    images: ["/products/leather-tote-bag-1.jpg"],
    category: "Accessories",
    badge: "New",
    rating: 4.8,
    reviews: 37,
    sku: "MM-ACC-022",
    stock: 16,
  },
  {
    slug: "desk-plant",
    name: "Desk Plant",
    description: "Low-maintenance succulent, ceramic pot, self-watering.",
    longDescription:
      "A low-maintenance succulent in a matte ceramic pot, potted with a self-watering reservoir so it survives the weeks you forget it exists. Enough green to make a desk feel less like a desk, without needing a green thumb.",
    highlights: [
      "Low-maintenance succulent, thrives on neglect",
      "Self-watering reservoir in the base",
      "Matte ceramic pot with drainage tray",
      "Compact — fits any desk corner",
    ],
    price: 8500,
    emoji: "🌵",
    images: ["/products/desk-plant-1.jpg"],
    category: "Home",
    rating: 4.5,
    reviews: 29,
    sku: "MM-HOM-023",
    stock: 55,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategories(products: Product[] = PRODUCTS): Category[] {
  const seen = new Set<Category>();
  const ordered: Category[] = [];
  for (const p of products) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      ordered.push(p.category);
    }
  }
  return ordered;
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(
    0,
    limit
  );
}

export function searchProducts(products: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) =>
    [p.name, p.description, p.category].some((field) => field.toLowerCase().includes(q))
  );
}
