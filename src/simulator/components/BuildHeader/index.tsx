import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  primaryDark: 'var(--dark)',
  primaryGray: 'var(--gray)',
  primaryWhite: 'var(--white)',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-self: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.primaryWhite};
  width: 100%;

  @media only screen and (min-width: 768px) {
    max-width: 492px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  column-gap: 1rem;
`;

const NameInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const NameInput = styled.input`
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 480px;
  background-color: ${props => props.theme.primaryGray};
  color: ${props => props.theme.primaryWhite};
  font-weight: 600;

  ::placeholder {
    color: ${props => props.theme.primaryWhite};
    opacity: 0.5;
  }
`;

const Damage = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.5rem;
  max-width: 400px;
  background-color: ${props => props.theme.primaryGray};
`;

function BuildHeader() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Row>
          <NameInputContainer>
            <NameInput type="text" id="build-name" placeholder='Build Name' />
          </NameInputContainer>
        </Row>
        <Row>
          <Damage color='solid'>
            <b>Min</b>
            <span>2.001.222.310</span>
          </Damage>
          {width > 767 && (
            <Damage color='solid'>
              <b>Avg</b>
              <span>2.074.116.563</span>
            </Damage>
          )}
          <Damage color='unset'>
            <b>Max</b>
            <span>2.147.010.817</span>
          </Damage>
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export default BuildHeader;
