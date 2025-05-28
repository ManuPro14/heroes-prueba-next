'use client';
import { HeroDetails } from "../types";

export const HeroModal = ({ hero, onClose }: { hero: HeroDetails, onClose: () => void }) => {
  return (
    <div className="fixed inset-0  bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 text-gray-800">
      <div className="bg-white w-auto max-w-full p-4 rounded-xl shadow-xl overflow-y-auto relative mx-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 text-2xl font-bold hover:scale-110 transition cursor-pointer"
          aria-label="Cerrar"
        >
          &times;
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">{hero.name}</h2>

        <img
          src={hero.images.lg}
          alt={hero.name}
          className="w-full max-h-64 object-contain rounded-lg mb-4"
        />

        <section className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Biografía</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base break-words">
            {Object.entries(hero.biography).map(([k, v]) => (
              <li key={k}><strong>{k}:</strong> {v}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Poderes</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base break-words">
            {Object.entries(hero.powerstats).map(([k, v]) => (
              <li key={k}><strong>{k}:</strong> {v}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};