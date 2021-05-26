import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardData {
  type: 'income' | 'outcome';
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardData;
}

export function TransactionCard({ data }: TransactionCardProps): JSX.Element {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
