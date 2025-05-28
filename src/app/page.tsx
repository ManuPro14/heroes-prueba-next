'use client';
import { useEffect, useState } from 'react';
import { getHeroes, getHeroById } from '../services/api';
import { Hero, HeroDetails } from '../types';
import { HeroCard } from '../components/HeroCard';
import { Pagination } from '../components/Pagination';
import { HeroModal } from '../components/HeroModal';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [allHeroes, setAllHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedHero, setSelectedHero] = useState<HeroDetails | null>(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getHeroes(page).then(data => {
      setHeroes(data.items);
      setLastPage(data.lastPage);
    });
  }, [page]);

  useEffect(() => {
    const fetchAllHeroes = async () => {
      try {
        const firstPage = await getHeroes(1, 50);
        const totalPages = firstPage.lastPage;
        let all = [...firstPage.items];

        for (let i = 2; i <= totalPages; i++) {
          const res = await getHeroes(i, 50);
          all = [...all, ...res.items];
        }

        setAllHeroes(all);
      } catch (error) {
        console.error("Error al obtener todos los héroes:", error);
      }
    };

    fetchAllHeroes();
  }, []);

  const handleHeroClick = async (id: number) => {
    try {
      const hero = await getHeroById(id);
      setSelectedHero(hero);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setSelectedHero(null);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredHeroes = heroes.filter(hero =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto p-4 w-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Superhéroes</h1>

      <SearchBar allHeroes={allHeroes} onSearch={handleSearch} onSelect={(hero) => handleHeroClick(hero.id)} />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredHeroes.map(hero => (
          <div key={hero.id} onClick={() => handleHeroClick(hero.id)}>
            <HeroCard hero={hero} />
          </div>
        ))}
      </div>

      <Pagination currentPage={page} lastPage={lastPage} onPageChange={setPage} />

      {selectedHero && (
        <HeroModal hero={selectedHero} onClose={() => setSelectedHero(null)} />
      )}
    </main>
  );
}