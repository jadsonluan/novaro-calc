import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import EquipmentIcon from '../../../images/equipment.png'
import CardIcon from '../../../images/min_card.png'
import EnchantIcon from '../../../images/temporal_gemstone.png'
import Equipments from './equipments';

const theme = {
  primaryDark: 'var(--dark)',
  lightDark: 'var(--light-dark)',
  primaryGray: 'var(--gray)',
  lightGray: 'var(--light-gray)',
  primaryWhite: 'var(--white)',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: flex-start;
  align-self: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.primaryWhite};
  width: 100%;
  max-width: 492px;

  @media only screen and (min-width: 768px) {
    width: 100%;
    max-width: 40vw;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }

  h3 {
    margin: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  box-sizing: border-box;
`;

const TabButton = styled.button<{active: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem 0rem 0rem 0rem;
  background-color: ${props => props.active ? props.theme.primaryGray : props.theme.lightDark};
  color: ${props => props.active ? props.theme.primaryWhite : props.theme.lightGray};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.primaryGray};
    color: ${props => props.theme.primaryWhite};
  }

  &:last-child {
    border-radius: 0rem 0.5rem 0rem 0rem;
  }
`;

const EquipmentsContainer = styled.div`
  width: 100%;
  row-gap: 0.5rem;
  background-color: ${props => props.theme.primaryGray};
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  margin-bottom: 0.5rem;
`;

const EnchantsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  row-gap: 0.5rem;
  background-color: ${props => props.theme.primaryGray};
  border-radius: 0.5rem;
`;

function BuildEquipments() {
  const [width, setWidth] = useState(window.innerWidth);
  const [selectedTab, setSelectedTab] = useState<"Equips" | "Shadow">("Equips");

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>
          <img src={EquipmentIcon} alt="Equipment" />
          <h3>Equipments</h3>
        </Title>
        <Tabs>
          <TabButton
            active={selectedTab === "Equips"}
            onClick={() => setSelectedTab("Equips")}
          >
            Equipments
          </TabButton>
          <TabButton
            active={selectedTab === "Shadow"}
            onClick={() => setSelectedTab("Shadow")}
          >
            Shadow Gears
          </TabButton>
        </Tabs>
        <EquipmentsContainer>
          <Equipments />
        </EquipmentsContainer>
        <Title>
          <img src={CardIcon} alt="Equipment" />
          <h3>Cards</h3>
        </Title>
        <EquipmentsContainer>
          blut haise
        </EquipmentsContainer>
        <Title>
          <img src={EnchantIcon} alt="Equipment" />
          <h3>Enchants</h3>
        </Title>
        <EnchantsContainer>
          coisas
        </EnchantsContainer>
      </Container>
    </ThemeProvider>
  )
}

export default BuildEquipments;
