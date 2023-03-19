import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  primaryDark: 'var(--dark)',
  primaryWhite: 'var(--white)',
};

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
  flex-wrap: wrap;
  width: 100vw;
  margin-top: auto;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.primaryWhite};
  padding-bottom: 1.2rem;
  text-align: center;
  font-size: 1rem;
  height: 30px;
  z-index: 100;
`;

function SimulatorFooter() {
  return (
    <ThemeProvider theme={theme}>
      <Footer>
        <i className="bi bi-discord"></i>
        <p>Gabriel M.#6838</p>
      </Footer>
    </ThemeProvider>
  )
}

export default SimulatorFooter;