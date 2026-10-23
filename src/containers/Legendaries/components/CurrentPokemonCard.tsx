import { useGetPokemonById } from 'src/apollo/queries/apollo-hooks';
import { Image as Img, TitleH1 } from 'src/components/ui';
import styled from 'styled-components';

type Props = {
  id?: number;
};

export const CurrentPokemonCard = ({ id }: Props): JSX.Element => {
  const { data } = useGetPokemonById({ id });

  const pokemon = data?.pokemon.at(0);

  return (
    <Content>
      <ImageBox data-empty={!pokemon}>
        <Image src={pokemon?.pokemonsprites.at(0)?.sprites} data-empty={!data} />
      </ImageBox>
      <Info>
        <NameTitle data-empty={!pokemon} ellipsis capitalize>
          {pokemon?.name}
        </NameTitle>
      </Info>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-block: 44px;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    gap: 16px;
    margin-block: 52px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column;
    gap: 24px;
    margin-block: 32px;
  }
`;

const ImageBox = styled.div`
  flex-shrink: 0;
  width: 373px;
  height: 418px;

  &[data-empty='true'] {
    border-radius: 32px;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 283px;
    height: 316px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 252px;
    height: 283px;
  }
`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;

  &[data-empty='true'] {
    display: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex-basis: 450px;
  overflow: hidden;
`;

const NameTitle = styled(TitleH1)`
  font-size: 62px;
  line-height: 72px;
  height: 72px;

  @media ${({ theme }) => theme.breakpoints.desktop} {
    font-size: 72px;
    line-height: 84px;
    height: 84px;
  }

  &[data-empty='true'] {
    width: 70%;
  }
`;
