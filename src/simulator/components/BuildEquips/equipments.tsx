import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { SimulatorCharacterSelect, Option } from "../../../components/Select";
import { Character } from "../../../data/character";
import WeaponType, { WEAPONS } from "../../../data/weapon";
import HyperNovice from '../../../images/HyperNovice.gif'

const theme = {
  primaryDark: 'var(--dark)',
  lightDark: 'var(--light-dark)',
  primaryGray: 'var(--gray)',
  lightGray: 'var(--light-gray)',
  primaryWhite: 'var(--white)',
};

const weaponOptions: Option[] = WEAPONS.map((weapon) => ({
  label: weapon,
  value: weapon,
}));

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem; 
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 30%;
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.primaryDark};
`;

function Equipments() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div>
          <SimulatorCharacterSelect
            label="Headgear"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Lower"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Weapon"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Garment"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Accessory R"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
        </div>
        <ImgContainer>
          <img src={HyperNovice} alt='Character' />
        </ImgContainer>
        <div>
          <SimulatorCharacterSelect
            label="Headgear"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Lower"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Weapon"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Garment"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
          <SimulatorCharacterSelect
            label="Accessory R"
            options={weaponOptions}
            getValue={(character: Character) => character.weapon.type as string}
            updateValue={(value: string) => (prevState: Character) => {
              const { weapon } = prevState;
              return {
                ...prevState,
                weapon: { ...weapon, type: value as WeaponType },
              };
            }}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Equipments;
