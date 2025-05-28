import { getHeroById } from "../../../services/api";

export default async function HeroPage({ params }: { params: { id: string } }) {
  const hero = await getHeroById(parseInt(params.id));

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{hero.name}</h1>
      <img src={hero.images.lg} alt={hero.name} className="w-full h-96 object-cover rounded-xl mb-4" />

      <section>
        <h2 className="text-xl font-semibold">Biografía</h2>
        <ul className="list-disc pl-6">
          {Object.entries(hero.biography).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-xl font-semibold">Estadísticas de Poder</h2>
        <ul className="list-disc pl-6">
          {Object.entries(hero.powerstats).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}