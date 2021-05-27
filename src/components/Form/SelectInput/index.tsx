import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, CategoryName, Icon } from './styles';

interface SelectInputProps extends TouchableOpacityProps {
  title: string;
  hasPlaceholder: boolean;
}

export function SelectInput({
  title,
  hasPlaceholder,
  ...rest
}: SelectInputProps): JSX.Element {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <CategoryName hasPlaceholder={hasPlaceholder}>{title}</CategoryName>

      <Icon name="chevron-down" />
    </Container>
  );
}
