import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NumbersGame from './components/NumbersGame';
import Operations from './components/Operations';
import Geometry from './components/Geometry';
import Measurement from './components/Measurement';
import Fractions from './components/Fractions';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/numbers" element={<NumbersGame />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/geometry" element={<Geometry />} />
            <Route path="/measurement" element={<Measurement />} />
            <Route path="/fractions" element={<Fractions />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}