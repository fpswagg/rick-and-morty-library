import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CharactersPage from './pages/CharactersPage.tsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<CharactersPage />} />
          <Route path='*' element={<h1 style={{color:"darkred",textShadow:'0px 0px 1px rgba(200,0,0,0.5)',textAlign:'center',userSelect:'none',}}>Error 404</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}