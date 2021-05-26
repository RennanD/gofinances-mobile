import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type InputTextProps = TextInputProps;

export function InputText({ ...rest }: InputTextProps): JSX.Element {
  return <Container {...rest} />;
}
