import React, { useCallback, useEffect, useMemo, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

const dataKey = '@gofinances:transactions';

export function Dashboard(): JSX.Element {
  const [transactions, setTransactions] = useState<DataLitsProps[]>([]);
  const [highlightData, setHiglightData] = useState<HighlightData>(
    {} as HighlightData,
  );

  const lastEntryTransaction = useMemo(() => {
    const [lastEntry] = transactions.filter(
      transaction => transaction.type === 'income',
    );

    return Intl.DateTimeFormat('pt-Br', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(new Date(lastEntry.date));
  }, [transactions]);

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);

    const storegedTransactions = response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expensives = 0;

    const formatedTransactions: DataLitsProps[] = storegedTransactions.map(
      (item: DataLitsProps) => {
        if (item.type === 'income') {
          entriesSum += Number(item.amount);
        } else {
          expensives += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-Br', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          ...item,
          amount,
          date,
        };
      },
    );

    setHiglightData({
      entries: {
        amount: Number(entriesSum).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      expensives: {
        amount: Number(expensives).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      total: {
        amount: Number(entriesSum - expensives).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
    });

    setTransactions(formatedTransactions);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

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
          <LogoutButton>
            <LogoutIcon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction={`Última entrada dia ${lastEntryTransaction}`}
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransaction="Última saída dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction="Última entrada dia 13 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item: transaction }) => (
            <TransactionCard data={transaction} />
          )}
        />
      </Transactions>
    </Container>
  );
}
