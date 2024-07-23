import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Navigation } from '@components';
import Routes from './Routes';
import theme from './theme/theme';
import './App.css';

export default (() => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app-container">
          <Navigation isOpen={isNavOpen} toggleOpen={handleNavToggle} />
          <main className={`main-content ${isNavOpen ? 'open' : ''}`}>
            <Routes />
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}) as React.FC;
