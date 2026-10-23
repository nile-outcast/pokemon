import styled from 'styled-components';

export const Footer = (): JSX.Element => (
  <Container>
    <Text data-small>Make with ❤️</Text>
    <Text>github</Text>
  </Container>
);

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  padding-inline: 160px 188px;
  margin: 80px auto 28px;
  width: 100%;
  max-width: 1440px;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-inline: 38px 68px;
    margin-block: 40px 20px;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    flex-direction: column-reverse;
    align-self: center;
    padding: 0;
    margin-block: 28px 16px;
    width: max-content;
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.dynamicTheme.color};
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;

  &[data-small='true'] {
    @media ${({ theme }) => theme.breakpoints.tablet} {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
    }
  }
`;
