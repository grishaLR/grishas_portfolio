import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBrain,
  FaArrowRight,
  FaArrowLeft,
  FaCog,
  FaClock,
  FaFutbol,
} from 'react-icons/fa';
import './styles.css';

interface NavigationProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default (({ isOpen, toggleOpen }: NavigationProps) => {
  return (
    <nav className={`navigation ${isOpen ? 'open' : 'closed'}`} aria-label="Main Navigation">
      <ul className="navigation-top">
        <li className="navigation-item">
          <Link to="/" className="navigation-link">
            <button aria-label="Home">
              <FaHome />
              {isOpen && <span>Home</span>}
            </button>
          </Link>
        </li>
        <li className="navigation-item">
          <Link to="/fpl-stats" className="navigation-link">
            <button aria-label="Fantasy Premier League Stats">
              <FaFutbol />
              {isOpen && <span>FPL Stats</span>}
            </button>
          </Link>
        </li>
        <li className="navigation-item">
          <Link to="/migraine-app" className="navigation-link">
            <button aria-label="Migraine App">
              <FaBrain />
              {isOpen && <span>Migraine App</span>}
            </button>
          </Link>
        </li>
        <li className="navigation-item">
          <Link to="/timer" className="navigation-link">
            <button aria-label="Timer">
              <FaClock />
              {isOpen && <span>Timer</span>}
            </button>
          </Link>
        </li>

        <li className="navigation-item">
          <Link to="/settings" className="navigation-link">
            <button aria-label="Settings">
              <FaCog />
              {isOpen && <span>Settings </span>}
            </button>
          </Link>
        </li>
      </ul>
      <ul className="navigation-bottom">
        <li className="navigation-item">
          <button
            onClick={() => toggleOpen()}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse Navigation' : 'Expand Navigation'}
          >
            {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
            {isOpen && <span>{isOpen ? 'Close' : 'Open'}</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
}) as React.FC<NavigationProps>;
