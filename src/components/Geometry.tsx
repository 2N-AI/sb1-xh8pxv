import { useState } from 'react';
import { motion } from 'framer-motion';

const shapes = [
  {
    name: 'Carré',
    sides: 4,
    angles: 90,
    component: (
      <motion.div 
        className="w-32 h-32 bg-blue-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    )
  },
  {
    name: 'Triangle',
    sides: 3,
    angles: 60,
    component: (
      <motion.div 
        className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[104px] border-transparent border-b-green-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    )
  },
  {
    name: 'Cercle',
    sides: 'Infini',
    angles: 360,
    component: (
      <motion.div 
        className="w-32 h-32 rounded-full bg-purple-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )
  }
];

export default function Geometry() {
  const [selectedShape, setSelectedShape] = useState(shapes[0]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Découvre les Formes Géométriques</h2>
      
      <div className="flex justify-center space-x-4 mb-8">
        {shapes.map((shape) => (
          <button
            key={shape.name}
            onClick={() => setSelectedShape(shape)}
            className={`px-4 py-2 rounded-lg ${
              selectedShape.name === shape.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {shape.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex justify-center items-center h-40">
          {selectedShape.component}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{selectedShape.name}</h3>
          <p>Nombre de côtés: {selectedShape.sides}</p>
          <p>Angles: {selectedShape.angles}°</p>
        </div>
      </div>
    </div>
  );
}