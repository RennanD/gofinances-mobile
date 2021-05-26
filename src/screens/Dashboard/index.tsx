import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  LogoutIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export function Dashboard(): JSX.Element {
  const data = [
    {
      title: 'Desenvolvimento de APP',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '12/03/2021',
    },
    {
      title: 'Prestação do apê',
      amount: 'R$ 600,00',
      category: {
        name: 'Casa',
        icon: 'home',
      },
      date: '12/03/2021',
    },
    {
      title: 'Salário',
      amount: 'R$ 15.000,00',
      category: {
        name: 'Salário',
        icon: 'dollar-sign',
      },
      date: '12/03/2021',
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/rennand.png' }} />

            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Rennan</UserName>
            </User>
          </UserInfo>
          <LogoutIcon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.title}
          renderItem={({ item: transaction }) => (
            <TransactionCard data={transaction} />
          )}
        />
      </Transactions>
    </Container>
  );
}
