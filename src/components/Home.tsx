import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Nombres et Place",
    path: "/numbers",
    description: "Apprends à compter et comprendre les nombres jusqu'à 1000",
    color: "bg-blue-500",
    level: "1ère à 3e année"
  },
  {
    title: "Opérations",
    path: "/operations",
    description: "Addition, soustraction, multiplication et division",
    color: "bg-green-500",
    level: "1ère à 5e année"
  },
  {
    title: "Géométrie",
    path: "/geometry",
    description: "Formes 2D et 3D, symétrie et patterns",
    color: "bg-purple-500",
    level: "1ère à 5e année"
  },
  {
    title: "Mesures",
    path: "/measurement",
    description: "Longueur, aire, temps et argent",
    color: "bg-yellow-500",
    level: "2e à 5e année"
  },
  {
    title: "Fractions",
    path: "/fractions",
    description: "Comprendre et utiliser les fractions",
    color: "bg-red-500",
    level: "3e à 5e année"
  }
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-blue-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Bienvenue dans MathFun!
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Link to={category.path}>
              <div className={`${category.color} rounded-lg p-6 h-full text-white hover:shadow-xl transition-shadow`}>
                <h2 className="text-xl font-bold mb-2">{category.title}</h2>
                <p className="mb-4">{category.description}</p>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {category.level}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}