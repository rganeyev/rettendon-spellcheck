import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WordsContainer from './WordsContainer.react';
import { Year } from './NextWordSelector';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/rettendon-spellcheck/" element={<WordsContainer year={Year.year1} />} />
            <Route path="rettendon-spellcheck/year1" element={<WordsContainer year={Year.year1} />} />
            {/* <Route path="/rettendon-spellcheck/year2" element={<WordsContainer />} />
            <Route path="/rettendon-spellcheck/year3" element={<WordsContainer />} /> */}
            <Route path="/rettendon-spellcheck/year4" element={<WordsContainer year={Year.year4} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}