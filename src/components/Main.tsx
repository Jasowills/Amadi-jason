// @ts-nocheck
import React, { useState } from 'react';
import Navbar from './Navbar';
import About from './About';
import Resume from './Resume';
import Contact from './Contacts';
import Projects from './Projects';


const Main = () => {
  const [currentPage, setCurrentPage] = useState('About');

  const handleNavClick = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className='main-content'>
      <Navbar onNavClick={handleNavClick} currentPage={currentPage} />
      <div className="pages">
        <About active={currentPage === 'About'} />
        <Resume active={currentPage === 'Resume'} />
        <Projects active={currentPage === 'Projects'} />
        <Contact active={currentPage === 'Contact'} />
      </div>
    </div>
  );
};

export default Main;
