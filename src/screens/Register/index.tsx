import React, { useState } from 'react';

import { Modal } from 'react-native';

import { useForm } from 'react-hook-form';

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

  const { control, handleSubmit } = useForm();

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

  function handleSubmitForm(form) {
    console.log(form);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputText name="name" control={control} placeholder="Nome" />
          <InputText name="amount" control={control} placeholder="Preço" />

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

        <Button onPress={handleSubmit(handleSubmitForm)}>Cadastrar</Button>
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
