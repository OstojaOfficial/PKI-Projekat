import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.projection.ticketPrice * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg">
        Tvoja korpa je prazna.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Moja korpa</h1>

      <div className="space-y-4">
        {cart.map(({ projection, quantity }) => (
          <div
            key={projection.id}
            className="flex justify-between items-center bg-white shadow rounded-lg p-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{projection.title}</h2>
              <p className="text-sm text-gray-500">{projection.genre} • {projection.duration} min</p>
              <p className="text-sm text-gray-600">🎬 {projection.director}</p>
              <p className="text-sm text-gray-500 mt-1">🎟️ Količina: {quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-600 font-bold mb-2">
                RSD {(projection.ticketPrice * quantity)}
              </p>
              <button
                onClick={() => removeFromCart(projection.id)}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Ukloni
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <span className="text-xl font-bold">Ukupno:</span>
        <span className="text-xl font-bold text-blue-600">RSD {totalPrice}</span>
      </div>

      <div className="mt-4 text-right">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
          Potvrdi kupovinu
        </button>
      </div>
    </div>
  );
};

export default Cart;