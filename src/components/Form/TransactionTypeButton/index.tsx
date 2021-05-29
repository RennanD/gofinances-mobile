import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title, Button } from './styles';

interface TransactionTypeButtonProps extends RectButtonProps {
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
    <Container isSelected={isSelected} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
