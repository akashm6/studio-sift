import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import StatisticsPage from './pages/StatisticsPage';
import SearchPage from './pages/SearchPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
