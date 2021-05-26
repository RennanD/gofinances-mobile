import React from 'react';
import { Button } from '../../components/Form/Button';
import { InputText } from '../../components/Form/InputText';

import { Container, Header, Title, Form, Fields } from './styles';

export function Register(): JSX.Element {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputText placeholder="Nome" />
          <InputText placeholder="Preço" />
        </Fields>

        <Button>Cadastrar</Button>
      </Form>
    </Container>
  );
}
