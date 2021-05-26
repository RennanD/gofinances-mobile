import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps): JSX.Element {
  return (
    <Container {...rest}>
      <Title>{children}</Title>
    </Container>
  );
}
