import React, { FC, ImgHTMLAttributes, useCallback } from 'react';
import { ColorNameType } from 'src/theme';
import styled from 'styled-components';

type Props = {
  bgcolor?: ColorNameType;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<Props> = (props) => {
  const onError = useCallback((err: React.SyntheticEvent<HTMLImageElement>) => {
    err.currentTarget.setAttribute('src', 'pictures/emptyImage.png');
  }, []);

  return <Img {...props} onError={onError} />;
};

export const Img = styled.img<{ bgcolor?: ColorNameType }>`
  object-fit: contain;
  background: ${({ theme, bgcolor }) =>
    !bgcolor
      ? bgcolor
      : !theme.gradients.horizontal[bgcolor]
      ? bgcolor
      : theme.gradients.horizontal[bgcolor]};
`;
