import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Transaction from './pages/Transaction';
import Category from './pages/Category';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/income-expense" element={<Transaction />} />
        <Route path="/category" element={<Category />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
