import React, { useEffect, useState } from "react";
import { fetchProjections } from "../api/projections";
import { type Projection } from "../types/projection";
import ProjectionCard from "../components/ProjectionCard";

export const ProjectionList: React.FC = () => {
  const [projections, setProjections] = useState<Projection[]>([]);
  const [filtered, setFiltered] = useState<Projection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProjections = async () => {
      try {
        const data = await fetchProjections();
        setProjections(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        setError("Greška prilikom učitavanja projekcija.");
      } finally {
        setLoading(false);
      }
    };

    loadProjections();
  }, []);

  useEffect(() => {
    const filteredList = projections.filter((proj) =>
      proj.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  }, [search, projections]);

  if (loading) return <div className="p-8 text-center text-lg">Ucitavanje projekcija...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Projekcije</h1>

      <input
        type="text"
        placeholder="Pretraga po nazivu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((proj) => (
          <ProjectionCard key={proj.id} projection={proj} />
        ))}
      </div>
    </div>
  );
};

export default ProjectionList;