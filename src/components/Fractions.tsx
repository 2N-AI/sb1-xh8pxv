import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FractionProblem {
  numerator: number;
  denominator: number;
  options: string[];
  correct: string;
}

const generateFractionProblem = (): FractionProblem => {
  const denominator = Math.floor(Math.random() * 4) + 2; // 2 à 5
  const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
  
  const correct = `${numerator}/${denominator}`;
  const options = [
    correct,
    `${numerator + 1}/${denominator}`,
    `${numerator}/${denominator + 1}`,
    `${numerator - 1 || 1}/${denominator}`
  ].sort(() => Math.random() - 0.5);

  return { numerator, denominator, options, correct };
};

export default function Fractions() {
  const [problem, setProblem] = useState(generateFractionProblem());
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answer: string) => {
    const correct = answer === problem.correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setScore(score + 1);
    
    setTimeout(() => {
      setShowFeedback(false);
      setProblem(generateFractionProblem());
    }, 1500);
  };

  const data = {
    labels: ['Partie colorée', 'Reste'],
    datasets: [
      {
        data: [problem.numerator, problem.denominator - problem.numerator],
        backgroundColor: ['#3B82F6', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Les Fractions</h2>

      <div className="flex flex-col items-center mb-8">
        <div className="w-48 h-48 mb-4">
          <Pie data={data} options={{ plugins: { legend: { display: false } } }} />
        </div>
        <p className="text-lg mb-4">
          Quelle fraction est représentée par la partie colorée?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {problem.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(option)}
            className="bg-blue-100 p-4 rounded-lg text-xl font-bold text-blue-800 hover:bg-blue-200"
          >
            {option}
          </motion.button>
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