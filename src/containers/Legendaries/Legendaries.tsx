import { useGetPokemonsShape } from 'src/apollo/queries/apollo-hooks';
import styled from 'styled-components';

import { Shape } from './components/Shape';

export const Legendaries = (): JSX.Element => {
  const { data, loading } = useGetPokemonsShape();

  return (
    <Container>
      {loading && <div>{'loading'}</div>}
      {data?.pokemonshape.map(({ id }) => (
        <Shape key={id} id={id} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.dynamicTheme.pageBG};
  /* height: calc(100vh - 93px); */

  @media ${({ theme }) => theme.breakpoints.mobile} {
    /* min-height: calc(100vh - 64px); */

    /* & > :last-child {
      display: none;
    } */
  }
`;
