import React, { FC, ImgHTMLAttributes, useCallback } from 'react';
import { gradients } from 'src/theme';
import styled from 'styled-components';

type Props = {
  bgcolor: keyof typeof gradients | '';
} & ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<Props> = (props) => {
  const onError = useCallback((err: React.SyntheticEvent<HTMLImageElement>) => {
    err.currentTarget.setAttribute('src', 'sprites/pictures/emptyImage.png');
  }, []);

  return <Img {...props} onError={onError} />;
};

export const Img = styled.img<{ bgcolor: keyof typeof gradients | '' }>`
  object-fit: contain;
  background: ${({ theme, bgcolor }) => (!bgcolor ? bgcolor : theme.gradients[bgcolor] ?? bgcolor)};
`;
