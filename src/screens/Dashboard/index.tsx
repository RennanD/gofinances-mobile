/* eslint-disable prefer-spread */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components';

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
  LoadingContainer,
} from './styles';

import { useAuth } from '../../hooks/auth';

export interface DataLitsProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard(): JSX.Element {
  const [transactions, setTransactions] = useState<DataLitsProps[]>([]);
  const [highlightData, setHiglightData] = useState<HighlightData>(
    {} as HighlightData,
  );
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  const dataKey = `@gofinances:transactions_user:${user.name}`;

  async function loadTransactions() {
    const getTransactionDate = (
      collection: DataLitsProps[],
      type: 'income' | 'outcome',
    ) => {
      const filteredCollection = collection.filter(
        transaction => transaction.type === type,
      );

      if (!filteredCollection.length) {
        return '0';
      }

      const lastransaction = new Date(
        Math.max.apply(
          Math,
          filteredCollection.map(transaction =>
            new Date(transaction.date).getTime(),
          ),
        ),
      );

      return `${lastransaction.getDate()} de ${lastransaction.toLocaleDateString(
        'pt-BR',
        { month: 'long' },
      )}`;
    };

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

    setTransactions(formatedTransactions);

    const lastEntryTransaction = getTransactionDate(
      storegedTransactions,
      'income',
    );

    const lastOutTransaction = getTransactionDate(
      storegedTransactions,
      'outcome',
    );

    const totalInterval = `01 a ${lastOutTransaction}`;

    setHiglightData({
      entries: {
        amount: Number(entriesSum).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastEntryTransaction,
      },
      expensives: {
        amount: Number(expensives).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastOutTransaction,
      },
      total: {
        amount: Number(entriesSum - expensives).toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: user.photo }} />

            <User>
              <UserGretting>Ol??,</UserGretting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={signOut}>
            <LogoutIcon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction={
            highlightData.entries.lastTransaction === '0'
              ? 'Ainda n??o existem entradas'
              : `??ltima entrada dia ${highlightData.entries.lastTransaction}`
          }
        />
        <HighlightCard
          type="outcome"
          title="Sa??das"
          amount={highlightData.expensives.amount}
          lastTransaction={
            highlightData.expensives.lastTransaction === '0'
              ? 'Ainda n??o existem sa??das'
              : `??ltima sa??da dia ${highlightData.expensives.lastTransaction}`
          }
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={
            highlightData.total.lastTransaction === '0'
              ? 'Ainda n??o h?? movimenta????es'
              : highlightData.total.lastTransaction
          }
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
