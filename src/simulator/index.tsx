import React from 'react';
import BuildHeader from './components/BuildHeader';
import './index.css';

function Simulator() {
  return (
    <div className='simulator-container'>
      <BuildHeader />
      <div>BuildEquipments</div>
      <div>BuildStats</div>
      <div>BuildBuffs</div>
    </div>
  )
}

export default Simulator;