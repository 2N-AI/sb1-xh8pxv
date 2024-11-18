import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';
type Difficulty = 'facile' | 'moyen' | 'difficile';

interface Problem {
  num1: number;
  num2: number;
  operation: Operation;
  difficulty: Difficulty;
}

const generateProblem = (operation: Operation, difficulty: Difficulty): Problem => {
  let num1: number, num2: number;

  switch (difficulty) {
    case 'facile':
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      break;
    case 'moyen':
      num1 = Math.floor(Math.random() * 50);
      num2 = Math.floor(Math.random() * 25);
      break;
    case 'difficile':
      num1 = Math.floor(Math.random() * 100);
      num2 = Math.floor(Math.random() * 50);
      break;
  }

  if (operation === 'division') {
    num2 = Math.max(1, num2);
    num1 = num1 * num2;
  }

  return { num1, num2, operation, difficulty };
};

export default function Operations() {
  const [operation, setOperation] = useState<Operation>('addition');
  const [difficulty, setDifficulty] = useState<Difficulty>('facile');
  const [problem, setProblem] = useState<Problem>(generateProblem('addition', 'facile'));
  const [answer, setAnswer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const getOperationSymbol = (op: Operation) => {
    switch (op) {
      case 'addition': return '+';
      case 'subtraction': return '-';
      case 'multiplication': return '×';
      case 'division': return '÷';
    }
  };

  const checkAnswer = () => {
    let correct = false;
    const userAnswer = parseFloat(answer);
    
    switch (problem.operation) {
      case 'addition':
        correct = userAnswer === problem.num1 + problem.num2;
        break;
      case 'subtraction':
        correct = userAnswer === problem.num1 - problem.num2;
        break;
      case 'multiplication':
        correct = userAnswer === problem.num1 * problem.num2;
        break;
      case 'division':
        correct = userAnswer === problem.num1 / problem.num2;
        break;
    }

    if (correct) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setProblem(generateProblem(operation, difficulty));
        setAnswer('');
      }, 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      {showSuccess && <Confetti />}

      <h2 className="text-2xl font-bold text-center mb-6">Pratique tes calculs!</h2>

      <div className="flex justify-center space-x-4 mb-8">
        {(['addition', 'subtraction', 'multiplication', 'division'] as Operation[]).map((op) => (
          <button
            key={op}
            onClick={() => {
              setOperation(op);
              setProblem(generateProblem(op, difficulty));
              setAnswer('');
            }}
            className={`px-4 py-2 rounded-lg ${
              operation === op ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {(['facile', 'moyen', 'difficile'] as Difficulty[]).map((diff) => (
          <button
            key={diff}
            onClick={() => {
              setDifficulty(diff);
              setProblem(generateProblem(operation, diff));
              setAnswer('');
            }}
            className={`px-4 py-2 rounded-lg ${
              difficulty === diff ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 text-3xl mb-8">
        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
          {problem.num1}
        </motion.span>
        <span>{getOperationSymbol(problem.operation)}</span>
        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, delay: 0.2 }}>
          {problem.num2}
        </motion.span>
        <span>=</span>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 text-center border-2 border-blue-300 rounded-lg"
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