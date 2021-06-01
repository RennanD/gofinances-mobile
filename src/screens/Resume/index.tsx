import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';

import { Container, Content } from './styles';

import { DataLitsProps } from '../Dashboard';
import { categories } from '../../utils/categories';

const dataKey = '@gofinances:transactions';

interface CategoryResumeProps {
  name: string;
  amount: string;
  color: string;
}

export function Resume(): JSX.Element {
  const [categoriesResume, setCategoriesResume] =
    useState<CategoryResumeProps[]>();

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const storegedTransactions: DataLitsProps[] = response
      ? JSON.parse(response)
      : [];
    const expensives = storegedTransactions.filter(
      expensive => expensive.type === 'outcome',
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

        totalByCategory.push({
          name: category.name,
          amount,
          color: category.color,
        });
      }
    });

    setCategoriesResume(totalByCategory);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Container>
      <Header title="Resumo" />

      <Content>
        {categoriesResume?.map(category => (
          <HistoryCard
            key={category.name}
            title={category.name}
            amount={category.amount}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
