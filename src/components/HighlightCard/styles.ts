import styled, { css } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface CardStyleProps {
  type: 'income' | 'outcome' | 'total';
}

export const Container = styled.View<CardStyleProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text<CardStyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<CardStyleProps>`
  font-size: ${RFValue(40)}px;
  ${props =>
    props.type === 'income' &&
    css`
      color: ${props.theme.colors.success};
    `};

  ${props =>
    props.type === 'outcome' &&
    css`
      color: ${props.theme.colors.attention};
    `};

  ${props =>
    props.type === 'total' &&
    css`
      color: ${props.theme.colors.shape};
    `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<CardStyleProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<CardStyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
`;
