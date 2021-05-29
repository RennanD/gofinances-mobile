import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, CategoryName, Icon } from './styles';

interface SelectInputProps extends RectButtonProps {
  title: string;
  hasPlaceholder: boolean;
}

export function SelectInput({
  title,
  hasPlaceholder,
  ...rest
}: SelectInputProps): JSX.Element {
  return (
    <Container {...rest}>
      <CategoryName hasPlaceholder={hasPlaceholder}>{title}</CategoryName>

      <Icon name="chevron-down" />
    </Container>
  );
}
