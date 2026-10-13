import Image from "next/image";
import type { CSSProperties } from "react";
import { getProduct } from "@/lib/products";

const headphones = getProduct("wireless-headphones")!;
const shoes = getProduct("running-shoes")!;
const camera = getProduct("camera")!;
const watch = getProduct("smart-watch")!;

export function HeroCollage() {
  return (
    <div className="relative mx-auto h-[300px] w-[280px] sm:h-[380px] sm:w-[360px] lg:mx-0">
      <div className="animate-glow-pulse absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-rose-500/30 blur-3xl" />

      {/* Camera — back, large */}
      <div
        className="animate-float absolute left-1/2 top-2 h-44 w-36 -translate-x-1/2 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 sm:h-56 sm:w-44"
        style={{ "--float-rot": "-4deg", transform: "rotate(-4deg)", animationDelay: "0s" } as CSSProperties}
      >
        <Image src={camera.images[0]} alt={camera.name} fill sizes="200px" className="object-cover" />
      </div>

      {/* Headphones — front left */}
      <div
        className="animate-float absolute bottom-4 left-0 h-32 w-32 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 sm:h-40 sm:w-40"
        style={{ "--float-rot": "7deg", transform: "rotate(7deg)", animationDelay: "1.2s" } as CSSProperties}
      >
        <Image src={headphones.images[0]} alt={headphones.name} fill sizes="160px" className="object-cover" />
      </div>

      {/* Shoes — front right */}
      <div
        className="animate-float absolute bottom-0 right-0 h-28 w-28 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 sm:h-36 sm:w-36"
        style={{ "--float-rot": "-8deg", transform: "rotate(-8deg)", animationDelay: "0.6s" } as CSSProperties}
      >
        <Image src={shoes.images[0]} alt={shoes.name} fill sizes="140px" className="object-cover" />
      </div>

      {/* Watch — small accent, top right */}
      <div
        className="animate-float absolute right-1 top-0 h-16 w-16 overflow-hidden rounded-xl shadow-xl ring-1 ring-white/10 sm:h-20 sm:w-20"
        style={{ "--float-rot": "5deg", transform: "rotate(5deg)", animationDelay: "1.8s" } as CSSProperties}
      >
        <Image src={watch.images[0]} alt={watch.name} fill sizes="80px" className="object-cover" />
      </div>

      {/* Floating rating chip */}
      <div className="animate-float absolute -left-4 top-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-stone-950/80 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur sm:top-28"
        style={{ animationDelay: "0.9s" }}
      >
        <span className="text-amber-400">★★★★★</span>
        4.8/5
      </div>
    </div>
  );
}
