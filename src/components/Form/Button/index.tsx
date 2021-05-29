import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export function Button({
  children,
  onPress,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{children}</Title>
    </Container>
  );
}
