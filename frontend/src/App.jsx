import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import ResultsPage from './pages/Results/Results'
import React from 'react';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<ResultsPage />} />
    </Routes>
  )
}

export default App
