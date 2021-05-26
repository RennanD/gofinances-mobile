import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { InputText } from '../../components/Form/InputText';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';

export function Register(): JSX.Element {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');

  function handleSeletcTransactionType(type: 'income' | 'outcome') {
    setSelectedTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputText placeholder="Nome" />
          <InputText placeholder="Preço" />
          <TransactionType>
            <TransactionTypeButton
              onPress={() => handleSeletcTransactionType('income')}
              type="income"
              title="Entrada"
              isSelected={selectedTransactionType === 'income'}
            />
            <TransactionTypeButton
              onPress={() => handleSeletcTransactionType('outcome')}
              isSelected={selectedTransactionType === 'outcome'}
              type="outcome"
              title="Saída"
            />
          </TransactionType>
        </Fields>

        <Button>Cadastrar</Button>
      </Form>
    </Container>
  );
}
