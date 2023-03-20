// dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import './App.css';

// pages
import HomePage from './pages/HomePage.js'

function App() {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
      <div className="App">
        <Router>
          <header className="App-header">
            <h1>Welcome to my MTG Deck Generator</h1>
            <p>Made a mistake? <button onClick={refreshPage}>Click Here.</button></p>
          </header>

          <br></br>
          {/*
          <Navigation />
          <br></br>
          */}
          
           {/*
          <Search />
          <br></br>
          */}
        
          <main>
            <Route path="/" exact>
              <HomePage />
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
