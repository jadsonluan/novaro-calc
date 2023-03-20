import React from 'react';
import BuildHeader from './components/BuildHeader';
import styled from 'styled-components';
import BuildEquipments from './components/BuildEquips';

const SimulatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  row-gap: 1rem;
  padding: 0.8rem;

  @media only screen and (min-width: 768px) {
    height: calc(100vh - 90px);
  }
`;

const BuildContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    column-gap: 1rem;
  }
`;

function Simulator() {
  return (
    <SimulatorContainer>
      <BuildHeader />
      <BuildContainer>
        <BuildEquipments />
        <div>BuildStats</div>
        <div>BuildBuffs</div>
      </BuildContainer>
    </SimulatorContainer>
  )
}

export default Simulator;