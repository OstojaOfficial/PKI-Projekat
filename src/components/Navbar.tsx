import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-400">
          🎟️ Bioskop repertoar
        </Link>
        <div className="space-x-4">
          <Link to="/cart" className="hover:text-blue-400">Korpa</Link>
          <Link to="/profile" className="hover:text-blue-400">Profil</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;