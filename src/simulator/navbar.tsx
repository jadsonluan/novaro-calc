import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'

const SimulatorNavbar: React.FC = () => {
  return (
    <nav>
      <NavLink className='logo' to="/">Nova Build Simulator</NavLink>
      <div className='button-container'>
        <NavLink className='button' to="/atk"><span className="material-symbols-outlined">swords</span>ATK Calc</NavLink>
        <NavLink className='button' to="/matk"><span className="material-symbols-outlined">magic_button</span>MATK Calc</NavLink>
      </div>
    </nav>
  );
};

export default SimulatorNavbar;
