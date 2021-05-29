import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardData,
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  LogoutButton,
  LogoutIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export interface DataLitsProps extends TransactionCardData {
  id: string;
}

export function Dashboard(): JSX.Element {
  const data: DataLitsProps[] = [
    {
      id: '1',
      type: 'income',
      title: 'Desenvolvimento de APP',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '12/03/2021',
    },
    {
      id: '2',
      type: 'outcome',
      title: 'Prestação do apê',
      amount: 'R$ 600,00',
      category: {
        name: 'Casa',
        icon: 'home',
      },
      date: '15/03/2021',
    },
    {
      id: '3',
      type: 'income',
      title: 'Salário',
      amount: 'R$ 15.000,00',
      category: {
        name: 'Salário',
        icon: 'dollar-sign',
      },
      date: '20/07/2021',
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
          <LogoutButton onPress={() => {}}>
            <LogoutIcon name="power" />
          </LogoutButton>
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
          keyExtractor={item => item.id}
          renderItem={({ item: transaction }) => (
            <TransactionCard data={transaction} />
          )}
        />
      </Transactions>
    </Container>
  );
}
