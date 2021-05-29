import React, { useState } from 'react';

import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
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

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor válido')
    .positive('O valor tem que ser um valor positivo')
    .required('Valor obrigatório'),
});

const dataKey = '@gofinances:transactions';

export function Register(): JSX.Element {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [category, setCategory] = useState<CategoryProps>({
    key: 'any',
    name: 'Selecione a categoria',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  function handleSeletcTransactionType(type: 'income' | 'outcome') {
    setSelectedTransactionType(type);
  }

  function handleCloseCategoryModal() {
    setIsModalVisible(false);
  }

  function handleOpenCategoryModal() {
    setIsModalVisible(true);
  }

  async function handleSubmitForm({ name, amount }: FormData) {
    if (!selectedTransactionType) {
      Alert.alert('Erro', 'Selecione o tipo da transação');
      return;
    }

    if (category.key === 'any') {
      Alert.alert('Erro', 'Selecione a categoria');
      return;
    }

    const data = {
      id: String(uuid.v4()),
      name,
      amount,
      type: selectedTransactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const transactions = await AsyncStorage.getItem(dataKey);

      const currentTransactions = transactions ? JSON.parse(transactions) : [];

      await AsyncStorage.setItem(
        dataKey,
        JSON.stringify([...currentTransactions, data]),
      );

      reset();
      setSelectedTransactionType('');
      setCategory({
        name: 'Categoria',
        key: 'any',
      });

      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível cadastrar a transação');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputText
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputText
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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
    </TouchableWithoutFeedback>
  );
}
