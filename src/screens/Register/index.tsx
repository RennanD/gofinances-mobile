import React from 'react';
import { InputText } from '../../components/Form/InputText';

import { Container, Header, Title, Form } from './styles';

export function Register(): JSX.Element {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <InputText placeholder="Nome" />
        <InputText placeholder="Preço" />
      </Form>
    </Container>
  );
}
