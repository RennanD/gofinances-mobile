import React from 'react';
import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';

import { Container } from './styles';

export function Resume(): JSX.Element {
  return (
    <Container>
      <Header title="Resumo" />

      <HistoryCard title="Compras" amount="R$ 150,50" color="red" />
    </Container>
  );
}
