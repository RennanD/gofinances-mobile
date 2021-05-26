import React from 'react';
import { FlatList } from 'react-native';

import {
  Container,
  Header,
  Title,
  CategoryItem,
  Icon,
  Name,
  Hr,
} from './styles';

import { categories } from '../../utils/categories';

interface CategoryProps {
  key: string;
  name: string;
}

interface CategorySelectProps {
  category: string;
  setCategory: (category: CategoryProps) => void;
  closeSelectCateory: () => void;
}

export function CategorySelect(): JSX.Element {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={catagory => catagory.key}
        style={{
          flex: 1,
          width: '100%',
        }}
        renderItem={({ item: catagory }) => (
          <CategoryItem>
            <Icon name={catagory.icon} />

            <Name>{catagory.name}</Name>
          </CategoryItem>
        )}
        ItemSeparatorComponent={() => <Hr />}
      />
    </Container>
  );
}
