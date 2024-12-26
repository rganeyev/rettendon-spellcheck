import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WordsContainer from './WordsContainer.react';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/rettendon-spellcheck/" element={<WordsContainer />} />
            <Route path="rettendon-spellcheck/year1" element={<WordsContainer />} />
            <Route path="/rettendon-spellcheck/year2" element={<WordsContainer />} />
            <Route path="/rettendon-spellcheck/year3" element={<WordsContainer />} />
            <Route path="/rettendon-spellcheck/year4" element={<WordsContainer />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}