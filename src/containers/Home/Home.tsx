import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Footer } from 'src/components';
import { BaseButton, TitleH1 } from 'src/components/ui';
import styled from 'styled-components';

import { BannerComplete } from './components/BannerComplete';

export const Home = (): JSX.Element => {
  const history = useHistory();

  const handleClick = useCallback(() => history.push('/pokedex'), [history]);

  return (
    <Container>
      <BannerBox>
        <BannerComplete />
      </BannerBox>

      <Content>
        <Title>
          <strong>Find</strong> all your favorite <strong>Pokemon</strong>
        </Title>

        <Description>
          You can know the type of Pokemon, its strengths, disadvantages and abilities
        </Description>

        <Button type="button" onClick={handleClick}>
          See pokemons
        </Button>
      </Content>

      <Footer />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.dynamicTheme.homeBG};
  height: calc(100vh - 93px);
  overflow: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 8px 28px 0;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    min-height: calc(100vh - 64px);
    padding: 38px 0 0;
  }
`;

const BannerBox = styled.div`
  @media ${({ theme }) => theme.breakpoints.desktop} {
    position: absolute;
    top: 100px;
    right: -95px;
    width: 888px;
    height: 678px;
  }

  & > svg {
    width: 100%;
    height: 100%;

    & > rect {
      animation: jump 2s ease-in-out infinite;
      @keyframes jump {
        0% {
          transform: rotate(-10deg);
        }
        50% {
          transform: rotate(-6deg);
        }
        100% {
          transform: rotate(-10deg);
        }
      }
    }

    & > ellipse {
      animation: pulse 2s ease-in-out infinite;
      @keyframes pulse {
        0% {
          transform: translateX(5%);
        }
        50% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(5%);
        }
      }
    }
  }
`;

const Content = styled.div`
  flex: 1;
  text-align: center;
  margin: 0 30px 28px;
  z-index: 10;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-bottom: 62px;
  }

  @media ${({ theme }) => theme.breakpoints.desktop} {
    margin: 130px 0 62px 157px;
    max-width: 500px;
    text-align: left;
  }
`;

const Title = styled(TitleH1)`
  margin-bottom: 6px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: -60px;
  }

  @media ${({ theme }) => theme.breakpoints.desktop} {
    margin-bottom: 64px;
  }
`;

const Description = styled.p`
  margin: 0 0 42px;
  color: ${({ theme }) => theme.dynamicTheme.color};

  font-weight: 400;
  font-size: 24px;
  line-height: 28px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: 0 32px 32px;
  }

  @media ${({ theme }) => theme.breakpoints.desktop} {
    font-size: 32px;
    line-height: 37px;
    margin-bottom: 64px;
  }
`;

const Button = styled(BaseButton)`
  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 100%;
  }
`;
