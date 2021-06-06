/* eslint-disable import/no-duplicates */
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';

import { useFocusEffect } from '@react-navigation/native';

import {
  ChartContainer,
  Container,
  Content,
  MonthSelect,
  MonthButton,
  MonthIcon,
  Month,
  LoadingContainer,
} from './styles';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';
import { DataLitsProps } from '../Dashboard';

import { categories } from '../../utils/categories';

import { useAuth } from '../../hooks/auth';

interface CategoryResumeProps {
  name: string;
  amount: number;
  amountFormatted: string;
  color: string;
  percent: number;
  percentFormatted: string;
}

export function Resume(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoriesResume, setCategoriesResume] =
    useState<CategoryResumeProps[]>();

  const theme = useTheme();
  const { user } = useAuth();

  const dataKey = `@gofinances:transactions_user:${user.name}`;

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadTransactions() {
    setLoading(true);
    const response = await AsyncStorage.getItem(dataKey);
    const storegedTransactions: DataLitsProps[] = response
      ? JSON.parse(response)
      : [];
    const expensives = storegedTransactions.filter(
      expensive =>
        expensive.type === 'outcome' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
    );

    const totalExpensives = expensives.reduce(
      (accumulator: number, expensive: DataLitsProps) => {
        return accumulator + Number(expensive.amount);
      },
      0,
    );

    const totalByCategory: CategoryResumeProps[] = [];

    categories.forEach(category => {
      let categotySum = 0;

      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categotySum += Number(expensive.amount);
        }
      });

      if (categotySum > 0) {
        const amount = categotySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = (categotySum / totalExpensives) * 100;

        totalByCategory.push({
          name: category.name,
          amount: categotySum,
          amountFormatted: amount,
          color: category.color,
          percent,
          percentFormatted: `${percent.toFixed(0)}%`,
        });
      }
    });

    setCategoriesResume(totalByCategory);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [selectedDate]),
  );

  return (
    <Container>
      <Header title="Resumo" />

      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <Content>
          <MonthSelect>
            <MonthButton onPress={() => handleDateChange('prev')}>
              <MonthIcon name="chevron-left" />
            </MonthButton>

            <Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </Month>

            <MonthButton onPress={() => handleDateChange('next')}>
              <MonthIcon name="chevron-right" />
            </MonthButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={categoriesResume}
              colorScale={categoriesResume?.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={60}
              x="percentFormatted"
              y="amount"
            />
          </ChartContainer>

          {categoriesResume?.map(category => (
            <HistoryCard
              key={category.name}
              title={category.name}
              amount={category.amountFormatted}
              color={category.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
