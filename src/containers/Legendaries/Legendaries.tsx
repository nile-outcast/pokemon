import { useGetPokemonsShape } from 'src/apollo/queries/apollo-hooks';
import { Footer } from 'src/components';
import styled from 'styled-components';

import { Shape } from './components/Shape';

export const Legendaries = (): JSX.Element => {
  const { data } = useGetPokemonsShape();

  return (
    <Container>
      <Content>
        {data?.pokemonshape.map((shape) => (
          <Shape key={shape.id} shape={shape} />
        ))}
      </Content>

      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.dynamicTheme.pageBG};
  overflow-y: scroll;
`;

const Content = styled.div`
  flex: 1;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;
