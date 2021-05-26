import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'income' | 'outcome';
  isSelected: boolean;
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

export function TransactionTypeButton({
  title,
  type,
  isSelected = false,
  ...rest
}: TransactionTypeButtonProps): JSX.Element {
  return (
    <Container isSelected={isSelected} type={type} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
