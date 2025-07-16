import { useState } from "react";
import type { Projection } from "../types/projection";
import { useCart } from "../context/CartContext";

const ProjectionCard = ({ projection }: { projection: Projection }) => {
  const { addToCart, getQuantity } = useCart();
  const quantityInCart = getQuantity(projection.id);
  const [showInput, setShowInput] = useState(quantityInCart > 0);
  const [quantity, setQuantity] = useState(quantityInCart || 1);

  const handleReserve = () => {
    addToCart(projection, quantity);
    setShowInput(true);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
    addToCart(projection, value);
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-xl p-4 transition hover:shadow-lg h-full">
      <h2 className="text-xl font-semibold text-gray-800">{projection.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{projection.genre} • {projection.duration} min</p>
      <p className="text-gray-600 text-sm mb-4">{projection.description.slice(0, 100)}...</p>
      <p className="text-sm text-gray-700">🎬 {projection.director}</p>
      <p className="text-sm text-gray-700 mb-2 truncate whitespace-nowrap overflow-hidden text-ellipsis">
        🧑‍🎤 {projection.actors.join(", ")}
      </p>
      <p className="text-blue-600 font-bold mb-3">RSD {projection.ticketPrice}</p>

      <div className="mt-auto flex items-center gap-2 transition-all duration-300">
        {showInput ? (
          <>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-2 py-1 border rounded text-center"
            />
            <span className="text-sm text-gray-500">rezervisano</span>
          </>
        ) : (
          <button
            onClick={handleReserve}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Rezervisi
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectionCard;