import React from 'react';

import { Container, CategoryName, Icon } from './styles';

interface SelectInputProps {
  title: string;
}

export function SelectInput({ title }: SelectInputProps): JSX.Element {
  return (
    <Container>
      <CategoryName>{title}</CategoryName>

      <Icon name="chevron-down" />
    </Container>
  );
}
