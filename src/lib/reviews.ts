export interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

// Deterministic mock reviews, keyed by category so every product gets
// plausible-sounding feedback without a real reviews backend.
const REVIEW_POOL: Record<string, Omit<Review, "date">[]> = {
  Audio: [
    {
      author: "Tomiwa A.",
      rating: 5,
      title: "Sound quality is unreal",
      body: "Wasn't expecting this much clarity at this price. Bass is punchy without drowning out vocals.",
    },
    {
      author: "Priya S.",
      rating: 4,
      title: "Great for daily commute",
      body: "Comfortable for long wear and the noise cancellation handles train noise well. Case is a bit bulky.",
    },
    {
      author: "Daniel O.",
      rating: 5,
      title: "Worth every naira",
      body: "Battery life is exactly as advertised. Paired instantly with two devices.",
    },
  ],
  Wearables: [
    {
      author: "Grace E.",
      rating: 5,
      title: "Finally a watch that keeps up",
      body: "Battery easily lasts a week even with sleep tracking on. Heart-rate readings match my chest strap.",
    },
    {
      author: "Marcus B.",
      rating: 4,
      title: "Solid everyday tracker",
      body: "Screen is bright and easy to read outdoors. Wish the app had more customization.",
    },
  ],
  Home: [
    {
      author: "Ifeoma N.",
      rating: 5,
      title: "Upgraded my whole setup",
      body: "Feels sturdy, looks great on the desk, and does exactly what it promises.",
    },
    {
      author: "Chidi K.",
      rating: 4,
      title: "Very happy with this",
      body: "Took a few days to arrive but it was worth the wait. Would buy again.",
    },
  ],
  Office: [
    {
      author: "Sarah W.",
      rating: 5,
      title: "Exceeded expectations",
      body: "Build quality feels premium. Noticeably better than what I was using before.",
    },
    {
      author: "Emeka U.",
      rating: 5,
      title: "My desk setup thanks you",
      body: "Switched everyone on my team onto this after trying mine for a week.",
    },
    {
      author: "Laura M.",
      rating: 4,
      title: "Great value",
      body: "Does what it says, no complaints so far after a month of daily use.",
    },
  ],
  Accessories: [
    {
      author: "Kunle A.",
      rating: 5,
      title: "Compliments every time I wear/use it",
      body: "Quality feels much higher than the price suggests. Very happy with this purchase.",
    },
    {
      author: "Hannah T.",
      rating: 4,
      title: "Good quality, fast shipping",
      body: "Exactly as pictured. Held up well so far.",
    },
  ],
  Gaming: [
    {
      author: "Ryan D.",
      rating: 5,
      title: "No more stick drift",
      body: "Switched after my last controller started drifting within months. Feels premium and the battery genuinely lasts.",
    },
    {
      author: "Ngozi P.",
      rating: 4,
      title: "Big upgrade to my setup",
      body: "Comfortable for multi-hour sessions. Setup was plug-and-play, no drivers needed.",
    },
  ],
  Electronics: [
    {
      author: "Femi O.",
      rating: 5,
      title: "Image quality is outstanding",
      body: "Autofocus locks on instantly even in low light. Coming from a phone camera this is a massive step up.",
    },
    {
      author: "Claire N.",
      rating: 5,
      title: "Exactly what a hobbyist needs",
      body: "Menus are intuitive and it feels solid in the hand. Battery lasts a full day of shooting.",
    },
  ],
};

export function getReviews(category: string): Review[] {
  const pool = REVIEW_POOL[category] ?? REVIEW_POOL.Office;
  const dates = ["2 weeks ago", "1 month ago", "2 months ago"];
  return pool.map((r, i) => ({ ...r, date: dates[i % dates.length] }));
}
