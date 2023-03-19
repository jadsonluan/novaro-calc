import React from 'react';
import BuildHeader from './components/BuildHeader';
import styled from 'styled-components';

const SimulatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

function Simulator() {
  return (
    <SimulatorContainer>
      <BuildHeader />
      <div>BuildEquipments</div>
      <div>BuildStats</div>
      <div>BuildBuffs</div>
    </SimulatorContainer>
  )
}

export default Simulator;