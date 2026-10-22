import { FullPokemon } from 'src/apollo/types';
import { ColorType } from 'src/theme';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { BaseType } from '../BaseType';

type Props = {
  pokemon?: FullPokemon;
};

export const RightBoxHeader = ({ pokemon }: Props): JSX.Element => (
  <BoxHeader>
    {/* TODO: modal for full name */}
    <Name title={pokemon?.name} data-empty={!pokemon}>
      {getTextFormat(pokemon?.name, true) || ''}
    </Name>

    <Generation data-empty={!pokemon}>
      {pokemon ? `Generation ${pokemon?.pokemonspecy.generation_id}` : ''}
    </Generation>

    <ID data-empty={!pokemon}>{pokemon?.id || ''}</ID>

    <Types>
      {dataValidation(pokemon?.pokemontypes, 2).map((type, idx) => (
        <Type
          data-empty={!pokemon}
          key={type?.type.name || idx}
          bgcolor={type?.type.name ? ColorType[type?.type.name] : ''}>
          {getTextFormat(type?.type.name)}
        </Type>
      ))}
    </Types>
  </BoxHeader>
);

const Name = styled.h3`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 53%;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  height: 42px;
  border-radius: 21px;
  cursor: pointer;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 45%;
    font-size: 24px;
    line-height: 28px;
    height: 28px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
    top: 35px;
    left: 50px;
    right: 50px;
    width: auto;
    text-shadow: 0 0 5px ${({ theme }) => theme.colors.black}50;
  }

  &[data-empty='true'] {
    width: 40%;

    @media ${({ theme }) => theme.breakpoints.mobile} {
      width: 60%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Generation = styled.div`
  text-align: right;
  color: ${({ theme }) => theme.colors.white};
  font-family: Source Sans Pro;
  margin-right: 10px;
  margin-left: auto;

  font-size: 24px;
  line-height: 30px;
  height: 30px;
  border-radius: 15px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: 21px;
    line-height: 26px;
    height: 26px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    text-align: left;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    margin-left: 8px;
  }

  &[data-empty='true'] {
    width: 35%;
  }
`;

const ID = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background-color: #f2cb07;
  font-size: 16px;
  line-height: 45px;

  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Types = styled.div`
  display: none;

  & :nth-child(n + 2) {
    margin-left: 16px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    display: flex;
  }
`;

const Type = styled(BaseType)`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.black};
  height: 21px;
  width: 74px;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 25px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-bottom: 12px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    margin-bottom: 15px;
    justify-content: flex-start;
    align-items: center;

    & > :nth-child(2) {
      flex: 1;
      order: 2;
    }

    & > :last-child {
      order: 3;
    }
  }
`;
