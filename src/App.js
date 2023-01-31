// dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


// components
import Navigation from './components/Nav.js';
import Search from './components/Search.js';
import './App.css';

// pages
import HomePage from './pages/HomePage.js'
import Generate from './pages/Generate.js'

function App() {
  return (
      <div className="App">
        <Router>
          <header className="App-header">
            <h1>Welcome to my MTG Deck Generator</h1>
            <p>Please be kind.</p>
          </header>

          <Navigation />
          <br></br>
          <Search />
          <br></br>
        
          <main>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/generate">
              <Generate />
            </Route>
          </main>

          <footer>
              <cite>&copy; 2022 Brandon Hofbauer</cite>
            </footer>

      </Router>
    </div>
  );
}

export default App;
