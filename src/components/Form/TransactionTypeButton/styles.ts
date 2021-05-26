import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionTypeProps {
  type: 'income' | 'outcome';
  isSelected: boolean;
}

export const Container = styled(TouchableOpacity)<TransactionTypeProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;

  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px 35px;

  ${({ isSelected, type }) =>
    isSelected &&
    type === 'income' &&
    css`
      border: 0;
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isSelected, type }) =>
    isSelected &&
    type === 'outcome' &&
    css`
      border: 0;
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<TransactionTypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${RFValue(24)}px;
`;
