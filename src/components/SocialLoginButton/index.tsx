import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import { SvgProps } from 'react-native-svg';

import { Container, ImageContainer, Title } from './styles';

interface SocialLoginButtonProps extends RectButtonProps {
  title: string;
  icon: React.FC<SvgProps>;
}

export function SocialLoginButton({
  title,
  icon: Icon,
  ...rest
}: SocialLoginButtonProps): JSX.Element {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Icon />
      </ImageContainer>
      <Title>{title}</Title>
    </Container>
  );
}
