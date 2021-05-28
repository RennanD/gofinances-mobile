import React from 'react';
import { TextInputProps } from 'react-native';

import { Control, Controller } from 'react-hook-form';

import { Container, Error } from './styles';

interface InputTextProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputText({
  name,
  control,
  error,
  ...rest
}: InputTextProps): JSX.Element {
  return (
    <>
      {!!error && <Error>{error}</Error>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Container
            onChangeText={onChange}
            value={value}
            error={!!error}
            {...rest}
          />
        )}
        name={name}
      />
    </>
  );
}
