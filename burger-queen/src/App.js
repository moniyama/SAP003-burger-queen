import React from 'react';
import Header from './components/Header'
import NavTab from './components/Nav-Tab';
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

export default function App() {
  return (
    <div className="App">
      <Header />
      <NavTab />
      <Footer />
    </div>
  )
}