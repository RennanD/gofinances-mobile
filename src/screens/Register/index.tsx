import React, { useState } from 'react';

import { Modal } from 'react-native';

import { Button } from '../../components/Form/Button';
import { InputText } from '../../components/Form/InputText';
import { SelectInput } from '../../components/Form/SelectInput';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect, CategoryProps } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from './styles';

export function Register(): JSX.Element {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [category, setCategory] = useState<CategoryProps>({
    key: 'any',
    name: 'Selecione a categoria',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleSeletcTransactionType(type: 'income' | 'outcome') {
    setSelectedTransactionType(type);
  }

  function handleCloseCategoryModal() {
    setIsModalVisible(false);
  }

  function handleOpenCategoryModal() {
    setIsModalVisible(true);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputText placeholder="Nome" />
          <InputText placeholder="Preço" />

          <TransactionType>
            <TransactionTypeButton
              onPress={() => handleSeletcTransactionType('income')}
              type="income"
              title="Entrada"
              isSelected={selectedTransactionType === 'income'}
            />
            <TransactionTypeButton
              onPress={() => handleSeletcTransactionType('outcome')}
              isSelected={selectedTransactionType === 'outcome'}
              type="outcome"
              title="Saída"
            />
          </TransactionType>

          <SelectInput
            hasPlaceholder={category.key === 'any'}
            title={category.name}
            onPress={handleOpenCategoryModal}
          />
        </Fields>

        <Button>Cadastrar</Button>
      </Form>

      <Modal visible={isModalVisible}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCateory={handleCloseCategoryModal}
        />
      </Modal>
    </Container>
  );
}
