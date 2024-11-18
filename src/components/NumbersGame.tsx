import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function NumbersGame() {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 10));
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const correctAnswer = number1 + number2;

  const checkAnswer = () => {
    if (parseInt(userAnswer) === correctAnswer) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setNumber1(Math.floor(Math.random() * 10));
        setNumber2(Math.floor(Math.random() * 10));
        setUserAnswer('');
      }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      {showSuccess && <Confetti />}
      
      <h2 className="text-2xl font-bold text-center mb-6">Addition</h2>
      
      <div className="flex justify-center items-center space-x-4 text-3xl mb-8">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          {number1}
        </motion.span>
        <span>+</span>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {number2}
        </motion.span>
        <span>=</span>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-20 text-center border-2 border-blue-300 rounded-lg"
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={checkAnswer}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Vérifier
      </motion.button>
    </div>
  );
}