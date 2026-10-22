import { FullPokemon, Stats } from 'src/apollo/types';
import { Experience } from 'src/components/ui';
import { dataValidation, getTextFormat } from 'src/utils';
import styled from 'styled-components';

import { Stat } from '../Stat';
import { RightBoxHeader } from './RightBoxHeader';

type Props = {
  pokemon?: FullPokemon;
};

const flatAbilities = (pokemon?: FullPokemon): string => {
  return (
    pokemon?.pokemonabilities
      .reduce((names: Array<string>, ability) => {
        names.push(getTextFormat(ability.ability.name));
        return names;
      }, [])
      .join(' - ') ?? ''
  );
};

export const RightBox = ({ pokemon }: Props): JSX.Element => (
  <Container>
    <RightBoxHeader pokemon={pokemon} />

    <Content>
      <AbilitiesBox>
        <AbilitiesText data-large>{'Abilities'}</AbilitiesText>
        <AbilitiesText data-empty={!pokemon}>{flatAbilities(pokemon)}</AbilitiesText>
      </AbilitiesBox>

      <ExperienceBox>
        <div>
          <Experience
            title="Healthy Points"
            baseStat={pokemon?.pokemonstats.at(0)?.base_stat}
            isEmptyData={!pokemon}
          />
        </div>

        <div>
          <Experience
            title="Experience"
            baseStat={pokemon?.base_experience}
            isEmptyData={!pokemon}
            chargeColor="green"
          />
        </div>
      </ExperienceBox>

      <StatsContainer>
        {dataValidation(pokemon?.pokemonstats, 6)
          .slice(1, 5)
          .map((stat, idx) => (
            <StatBox key={stat?.stat.id || idx}>
              <Stat
                staticTheme
                abbreviateLabel
                isEmptyData={!pokemon}
                label={stat && Stats[stat.stat.id]}
                stat={stat?.base_stat}
              />
            </StatBox>
          ))}
      </StatsContainer>
    </Content>
  </Container>
);

const Container = styled.div`
  flex: 1;
  overflow: hidden;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background: ${({ theme }) => theme.gradients.vertical.red};
  padding: 30px 20px 25px 15px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 28px 16px 20px 12px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 100%;
    border-radius: 16px;
    padding: 75px 12px 30px;
    position: absolute;
    top: 275px;
    bottom: 0;
  }
`;

const Content = styled.div`
  @media ${({ theme }) => theme.breakpoints.mobile} {
    height: calc(100% - 60px);
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  & > :nth-child(n) {
    flex: 1;
  }

  & > :nth-child(n + 2) {
    margin-left: 24px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    & > :nth-child(n + 2) {
      margin-left: 20px;
    }
  }
`;

const BaseBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 4px 4px 24px rgba(1, 17, 38, 0.2);
  border-radius: 8px;
`;

const StatBox = styled(BaseBox)`
  text-align: center;

  padding: 8px 0 5px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 6px 0 2px;
  }
`;

const AbilitiesBox = styled(BaseBox)`
  max-width: max-content;
  min-width: 70%;
  padding: 12px 28px 10px;
  margin-bottom: 21px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 8px 24px 5px;
    margin-bottom: 18px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    min-width: 100%;
    padding: 18px 20px;
    margin-bottom: 15px;
  }
`;

const AbilitiesText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};

  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  height: 19px;
  border-radius: 10px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    &[data-large='true'] {
      font-size: 31px;
      line-height: 36px;
      height: 36px;
      margin-bottom: 8px;
    }
  }
`;

const ExperienceBox = styled(BaseBox)`
  display: flex;
  & > :nth-child(n) {
    flex: 1;
  }

  padding: 20px 20px 16px;
  margin-bottom: 21px;

  & > :first-child > :last-child {
    margin-right: 28px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 16px 16px 14px;
    margin-bottom: 18px;

    & > :first-child > :last-child {
      margin-right: 24px;
    }
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column;
    padding: 14px 20px 27px;
    margin-bottom: 12px;

    & > :first-child {
      margin-bottom: 20px;
    }
  }
`;
