import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  primaryDark: 'var(--dark)',
  primaryWhite: 'var(--white)',
};

const Navbar = styled.nav`
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.primaryWhite};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: relative;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
    height: 60px;
  }
`;

const Logo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: ${props => props.theme.primaryWhite};
  margin-right: 40px;

  @media only screen and (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: unset;
    column-gap: 0px;
  }
`;

const Button = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  column-gap: 0.1rem;
  font-weight: bold;
  text-decoration: none;
  color: ${props => props.theme.primaryWhite};
  background-color: hsl(205 47% 44% / 1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: hsl(212, 58%, 43%);
  }

  @media only screen and (min-width: 768px) {
    margin-left: 20px;
  }
`;

const SimulatorNavbar: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Logo className='logo' to="/">Nova Build Simulator</Logo>
        <ButtonContainer>
          <Button to="/atk"><span className="material-symbols-outlined">swords</span>ATK Calc</Button>
          <Button to="/matk"><span className="material-symbols-outlined">magic_button</span>MATK Calc</Button>
        </ButtonContainer>
      </Navbar>
    </ThemeProvider>
  );
};

export default SimulatorNavbar;