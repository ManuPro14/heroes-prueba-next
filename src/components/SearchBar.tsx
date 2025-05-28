'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Hero } from '../types';
import { Search } from 'lucide-react';

interface Props {
  allHeroes: Hero[];
  onSearch: (term: string) => void;
  onSelect: (hero: Hero) => void;
}

function SearchBar({ allHeroes, onSearch, onSelect }: Props) {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Hero[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (term.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = allHeroes.filter(hero =>
        hero.name.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  }, [term, allHeroes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch(term);
    setSuggestions([]);
  };

  return (
    <div className="mb-6 relative flex justify-center" ref={containerRef}>
      <div className="flex items-center w-full max-w-md relative">
        <input
          type="text"
          placeholder="Buscar héroes..."
          className="border p-2 pl-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="absolute right-2  text-white p-2 rounded-full hover:scale-110 transition"
          onClick={handleSearch}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full max-w-md bg-white dark:bg-gray-700 border rounded-md shadow-lg z-20">
          {suggestions.map(hero => (
            <li
              key={hero.id}
              onClick={() => {
                onSelect(hero);
                setTerm(hero.name);
                setSuggestions([]);
              }}
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              {hero.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;