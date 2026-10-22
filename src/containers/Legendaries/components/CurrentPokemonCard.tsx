import { useGetPokemonById } from 'src/apollo/queries/apollo-hooks';
import { TitleH1 } from 'src/components/ui';
import { getTextFormat } from 'src/utils';
import styled from 'styled-components';

export const CurrentPokemonCard = ({ id }: { id: number }): JSX.Element => {
  const { data } = useGetPokemonById({ id });

  return <NameTitle data-empty={!data}>{getTextFormat(data?.pokemon.at(0)?.name)}</NameTitle>;
};

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
    width: 30%;
  }
`;
