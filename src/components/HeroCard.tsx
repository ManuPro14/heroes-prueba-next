'use client';
import { Hero } from "../types";

export const HeroCard = ({ hero }: { hero: Hero }) => (
  <div className="border bg-gray-300 text-gray-800 rounded-xl shadow-md p-4 hover:bg-gray-400 hover:transform-3d transition cursor-pointer">
    <img src={hero.images.sm} alt={hero.name} className="w-full h-auto object-fill rounded-xl" />
    <h2 className="text-lg font-bold mt-2 text-center">{hero.name}</h2>
  </div>
);