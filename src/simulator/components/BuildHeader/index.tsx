import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-self: center;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 700px;
  background-color: #222;
  color: #fff;
  column-gap: 0.5rem;
`;

const NameInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 0.5rem;
  flex-grow: 1;
  font-size: 1rem;
  padding: 0.5rem 0rem 0.7rem 0.7rem;
`;

const NameInput = styled.input`
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 95%;
  background-color: hsl(0 0% 35% / 1);
  color: #fff;
  font-weight: 600;
`;

const DamageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
`;

const Damage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 210px;
  background-color: hsl(0 0% 35% / 1);
  border-bottom: 4px ${(props) => props.color} #222;
`;

function BuildHeader() {
  return (
    <Container>
      <NameInputContainer>
        <label htmlFor="build-name">Build Name</label>
        <NameInput type="text" id="build-name" />
      </NameInputContainer>
      <DamageContainer>
        <Damage color='solid'>
          <b>Min Damage</b>
          <span>2.001.222.310</span>
        </Damage>
        <Damage color='unset'>
          <b>Max Damage</b>
          <span>2.147.010.817</span>
        </Damage>
      </DamageContainer>
    </Container>
  )
}

export default BuildHeader;