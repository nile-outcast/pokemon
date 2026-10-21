import styled from 'styled-components';

type ThemeProps = {
  staticTheme?: boolean;
};

type Props = ThemeProps & {
  label?: string;
  stat?: number;
  isEmptyData: boolean;
  abbreviateLabel?: boolean;
};

const shortenText = (text: string): string => {
  const words = text.split(' ');
  if (words.length > 1) words[0] = words[0].slice(0, 2);
  return words.join(' ');
};

export const Stat = ({
  label,
  stat,
  isEmptyData,
  abbreviateLabel,
  staticTheme,
}: Props): JSX.Element => (
  <StatBox>
    <StatText data-empty={isEmptyData} staticTheme={staticTheme}>
      {stat}
    </StatText>
    <StatName data-empty={isEmptyData} staticTheme={staticTheme}>
      {abbreviateLabel ? shortenText(label || '') : label}
    </StatName>
  </StatBox>
);

const StatBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const StatName = styled.p<ThemeProps>`
  margin: 0;
  width: 100%;
  color: ${({ theme, staticTheme }) =>
    staticTheme ? theme.colors.gray3 : theme.dynamicTheme.statNameColor};
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  height: 14px;
  border-radius: 7px;
`;

const StatText = styled.div<ThemeProps>`
  text-align: center;
  color: ${({ theme, staticTheme }) =>
    staticTheme ? theme.colors.black : theme.dynamicTheme.color};
  font-weight: 400;
  font-size: 15px;
  line-height: 30px;

  width: 36px;
  height: 36px;
  border: 3px solid
    ${({ theme, staticTheme }) => (staticTheme ? theme.colors.black : theme.dynamicTheme.color)};
  border-radius: 50%;
  margin-bottom: 7px;

  &[data-empty='true'] {
    border: none;
  }
`;
