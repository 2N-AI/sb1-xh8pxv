import { useState } from 'react';
import { motion } from 'framer-motion';

type MeasurementType = 'length' | 'time' | 'money';

interface Exercise {
  question: string;
  image?: string;
  options: string[];
  correct: string;
  type: MeasurementType;
}

const exercises: Exercise[] = [
  {
    type: 'length',
    question: "Quelle unité utiliserais-tu pour mesurer la hauteur d'un livre?",
    options: ['Centimètres', 'Kilomètres', 'Litres'],
    correct: 'Centimètres'
  },
  {
    type: 'time',
    question: "Combien y a-t-il de minutes dans une heure?",
    options: ['30', '45', '60'],
    correct: '60'
  },
  {
    type: 'money',
    question: "Combien de pièces de 25¢ font 1 dollar?",
    options: ['2', '4', '5'],
    correct: '4'
  }
];

export default function Measurement() {
  const [currentType, setCurrentType] = useState<MeasurementType>('length');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentExercises = exercises.filter(ex => ex.type === currentType);

  const handleAnswer = (answer: string, correct: string) => {
    const correct = answer === correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setScore(score + 1);
    
    setTimeout(() => {
      setShowFeedback(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Mesures</h2>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setCurrentType('length')}
          className={`px-4 py-2 rounded-lg ${
            currentType === 'length' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Longueur
        </button>
        <button
          onClick={() => setCurrentType('time')}
          className={`px-4 py-2 rounded-lg ${
            currentType === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Temps
        </button>
        <button
          onClick={() => setCurrentType('money')}
          className={`px-4 py-2 rounded-lg ${
            currentType === 'money' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Argent
        </button>
      </div>

      <div className="space-y-8">
        {currentExercises.map((exercise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <h3 className="text-xl mb-4">{exercise.question}</h3>
            <div className="grid grid-cols-1 gap-3">
              {exercise.options.map((option, optionIndex) => (
                <motion.button
                  key={optionIndex}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option, exercise.correct)}
                  className="bg-white p-3 rounded-lg shadow hover:bg-blue-50"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 p-4 rounded-lg text-center ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {isCorrect ? 'Bravo! C\'est correct!' : 'Essaie encore!'}
        </motion.div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xl">Score: {score}</p>
      </div>
    </div>
  );
}