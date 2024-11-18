import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
    setEquation(equation + num);
  };

  const handleOperator = (op: string) => {
    setDisplay('0');
    setEquation(equation + ' ' + op + ' ');
  };

  const calculate = () => {
    try {
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
    } catch (error) {
      setDisplay('Erreur');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const Button = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-16 h-16 m-1 rounded-full bg-blue-500 text-white text-xl font-bold hover:bg-blue-600"
    >
      {children}
    </motion.button>
  );

  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md p-6">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-gray-600 text-sm h-6">{equation}</div>
        <div className="text-3xl font-bold">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button onClick={clear}>C</Button>
        <Button onClick={() => handleOperator('/')}>/</Button>
        <Button onClick={() => handleOperator('*')}>×</Button>
        <Button onClick={() => handleOperator('-')}>-</Button>

        {[7, 8, 9].map(num => (
          <Button key={num} onClick={() => handleNumber(num.toString())}>{num}</Button>
        ))}
        <Button onClick={() => handleOperator('+')}>+</Button>

        {[4, 5, 6].map(num => (
          <Button key={num} onClick={() => handleNumber(num.toString())}>{num}</Button>
        ))}
        <Button onClick={calculate}>=</Button>

        {[1, 2, 3, 0].map(num => (
          <Button key={num} onClick={() => handleNumber(num.toString())}>{num}</Button>
        ))}
      </div>
    </div>
  );
}