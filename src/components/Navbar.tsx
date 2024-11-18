import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">MathFun</Link>
          <div className="flex space-x-4">
            <NavLink to="/numbers">Nombres</NavLink>
            <NavLink to="/operations">Opérations</NavLink>
            <NavLink to="/geometry">Géométrie</NavLink>
            <NavLink to="/measurement">Mesures</NavLink>
            <NavLink to="/fractions">Fractions</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to}>
      <motion.div
        className="px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.div>
    </Link>
  );
}