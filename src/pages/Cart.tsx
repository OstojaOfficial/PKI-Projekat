import React from "react";
import { useCart } from "../context/cart/useCart";

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.projection.ticketPrice * item.quantity,
    0
  );

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
        {cart.map((item) => (
          <div
            key={item.projection.id + item.projectionTime}
            className="flex justify-between items-center bg-white shadow rounded-lg p-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.projection.title}</h2>
              <p className="text-sm text-gray-500">
                {item.projection.genre} • {item.projection.duration} min
              </p>
              <p className="text-sm text-gray-600">🎬 {item.projection.director}</p>
              <p className="text-sm mt-2">
                <span className="text-gray-500 mr-1">Vreme projekcije:</span>
                <span className="font-semibold bg-gray-100 rounded px-2 py-1">
                  {new Date(item.projectionTime).toLocaleString("sr-RS")}
                </span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <label htmlFor={`qty-${item.projection.id}`} className="text-sm text-gray-500">
                  Količina:
                </label>
                <input
                  id={`qty-${item.projection.id}`}
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 0);
                    if (value === 0) {
                      removeFromCart(item.projection.id);
                    } else {
                      addToCart(item.projection, value, item.projectionTime);
                    }
                  }}
                  className="w-16 px-2 py-1 border rounded text-center"
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-600 font-bold mb-2">
                RSD {(item.projection.ticketPrice * item.quantity)}
              </p>
              <button
                onClick={() => removeFromCart(item.projection.id)}
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