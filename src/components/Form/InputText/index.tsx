import React from 'react';
import { TextInputProps } from 'react-native';

import { Control, Controller } from 'react-hook-form';

import { Container } from './styles';

interface InputTextProps extends TextInputProps {
  control: Control;
  name: string;
}

export function InputText({
  name,
  control,
  ...rest
}: InputTextProps): JSX.Element {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <Container onChangeText={onChange} value={value} {...rest} />
      )}
      name={name}
    />
  );
}
