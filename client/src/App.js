import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='main-content'>
        <Navbar />
        <div className='container'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
